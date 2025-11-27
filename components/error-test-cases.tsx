"use client"

import { AlertCircle, Copy, CheckCircle, Shield } from "lucide-react"
import { useState } from "react"

interface ErrorTestCasesProps {
  errorTests: any[]
}

export default function ErrorTestCases({ errorTests }: ErrorTestCasesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2))
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const groupedTests = errorTests.reduce(
    (acc, test) => {
      const key = `${test.endpoint}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(test)
      return acc
    },
    {} as Record<string, any[]>,
  )

  if (!errorTests || errorTests.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No error test cases generated</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Error Test Cases</h2>
        <p className="text-muted-foreground">Comprehensive error and negative test cases for your API endpoints</p>
      </div>

      {Object.entries(groupedTests).map(([endpoint, tests], groupIdx) => {
        const [method, path] = endpoint.split(" ")
        return (
          <div key={groupIdx} className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <span className={`px-3 py-1 rounded text-xs font-semibold ${getMethodColor(method)}`}>{method}</span>
              <span className="font-mono text-sm text-foreground">{path}</span>
              <span className="text-xs text-muted-foreground ml-auto">{tests.length} test cases</span>
            </div>

            <div className="grid gap-3">
              {tests.map((test: any, testIdx: number) => {
                const testId = `${groupIdx}-${testIdx}`
                return (
                  <div
                    key={testIdx}
                    className="p-4 border border-border rounded-lg bg-card hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded ${getTestTypeIcon(test.type)}`}>
                          {test.type.includes("Security") || test.type.includes("SQL") || test.type.includes("XSS") ? (
                            <Shield className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{test.type}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(test, testId)}
                        className="ml-4 p-2 hover:bg-muted rounded transition-colors"
                      >
                        {copiedId === testId ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className="bg-background/50 rounded p-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Example Request
                        </p>
                        <pre className="text-xs text-foreground font-mono overflow-x-auto whitespace-pre-wrap break-words">
                          {JSON.stringify(test.request, null, 2)}
                        </pre>
                      </div>

                      <div className="bg-background/50 rounded p-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Expected Response
                        </p>
                        <pre className="text-xs text-foreground font-mono overflow-x-auto whitespace-pre-wrap break-words">
                          {JSON.stringify(test.expectedResponse, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function getMethodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: "bg-blue-500/20 text-blue-300",
    POST: "bg-green-500/20 text-green-300",
    PUT: "bg-yellow-500/20 text-yellow-300",
    DELETE: "bg-red-500/20 text-red-300",
    PATCH: "bg-purple-500/20 text-purple-300",
    HEAD: "bg-gray-500/20 text-gray-300",
    OPTIONS: "bg-cyan-500/20 text-cyan-300",
  }
  return colors[method] || "bg-muted text-muted-foreground"
}

function getTestTypeIcon(type: string): string {
  if (type.includes("Security") || type.includes("SQL") || type.includes("XSS") || type.includes("CSRF")) {
    return "bg-red-500/20 text-red-400"
  }
  if (type.includes("Rate")) {
    return "bg-purple-500/20 text-purple-400"
  }
  if (type.includes("Timeout") || type.includes("Payload")) {
    return "bg-orange-500/20 text-orange-400"
  }
  if (type.includes("Not Found") || type.includes("Unauthorized") || type.includes("Forbidden")) {
    return "bg-yellow-500/20 text-yellow-400"
  }
  return "bg-blue-500/20 text-blue-400"
}
//riddhima contribution