import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { parseYAML, extractEndpoints } from "@/lib/yaml-parser"
import { generateErrorTestCases } from "@/lib/error-case-generator"
import { extractTextFromPDF } from "@/lib/pdf-parser"
import { generateAIInsights } from "@/lib/ai-insights-generator"

function extractEndpointsFromText(text: string): any[] {
  const endpoints: any[] = []
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"]
  const lines = text.split("\n")

  lines.forEach((line) => {
    methods.forEach((method) => {
      if (line.includes(method)) {
        const methodIndex = line.indexOf(method)
        const pathPart = line.substring(methodIndex + method.length).trim()
        const pathMatch = pathPart.match(/^(\/[\w\-/{}]*)/)

        if (pathMatch && pathMatch[1]) {
          const path = pathMatch[1].split(/[\s,]/)[0]
          const description = pathPart.substring(path.length).trim()

          endpoints.push({
            path,
            method: method.toUpperCase(),
            summary: description || `${method} ${path}`,
            description: description,
            parameters: [],
            requestBody: null,
            responses: [],
          })
        }
      }
    })
  })

  return Array.from(new Map(endpoints.map((ep) => [ep.path + ep.method, ep])).values())
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const content = formData.get("content") as string
    const filename = file?.name || "blueprint"

    if (!content && !filename.endsWith(".pdf")) {
      return NextResponse.json({ error: "No file content provided" }, { status: 400 })
    }

    let blueprintData: any
    let processedContent = content

    if (filename.endsWith(".pdf")) {
      processedContent = await extractTextFromPDF(file)
      if (!processedContent || processedContent.trim().length === 0) {
        return NextResponse.json(
          { error: "Could not extract text from PDF. Please ensure it contains readable text." },
          { status: 400 },
        )
      }
    }

    if (filename.endsWith(".txt")) {
      processedContent = content

      try {
        blueprintData = JSON.parse(processedContent)
      } catch {
        try {
          blueprintData = parseYAML(processedContent)
        } catch {
          blueprintData = {
            title: "API Documentation from Text",
            version: "1.0.0",
            description: processedContent.substring(0, 500),
            documentation: processedContent,
            endpoints: extractEndpointsFromText(processedContent),
          }
        }
      }
    } else if (filename.endsWith(".yaml") || filename.endsWith(".yml")) {
      blueprintData = parseYAML(processedContent)
    } else {
      try {
        blueprintData = JSON.parse(processedContent)
      } catch {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 })
      }
    }

    console.log("[v0] Parsed blueprint:", JSON.stringify(blueprintData, null, 2).substring(0, 500))

    const endpoints = extractEndpoints(blueprintData)
    console.log("[v0] Extracted endpoints count:", endpoints.length)

    if (endpoints.length === 0) {
      console.log("[v0] Blueprint data structure:", JSON.stringify(blueprintData, null, 2))
      return NextResponse.json(
        {
          error:
            "No endpoints found in blueprint. Ensure your file includes: paths (OpenAPI), resourceGroups (API Blueprint), endpoints array, or endpoint documentation.",
        },
        { status: 400 },
      )
    }

    const errorTests = generateErrorTestCases(endpoints)
    console.log("[v0] Generated error tests:", errorTests.length)

    const aiInsights = generateAIInsights(endpoints, blueprintData)
    console.log("[v0] Generated insights (no credit card required)")

    const supabase = await createClient()

    const { data, error: dbError } = await supabase
      .from("api_blueprints")
      .insert({
        file_url: `file://${filename}`,
        original_filename: filename,
        parsed_json: blueprintData,
        ai_insights: aiInsights,
        error_tests: errorTests,
      })
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    return NextResponse.json({
      id: data?.id || null,
      filename: filename,
      title: blueprintData.info?.title || blueprintData.title || "API Blueprint",
      version: blueprintData.info?.version || blueprintData.version || "1.0.0",
      endpoints: endpoints,
      errorTests: errorTests,
      aiInsights: aiInsights,
      rawJson: blueprintData,
      createdAt: data?.created_at || new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Parse error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to parse blueprint" },
      { status: 500 },
    )
  }
}
