"use client"

import { Download, RotateCcw } from "lucide-react"
import { useState } from "react"
import type { ApiEndpoint } from "@/app/page"
import EndpointBrowser from "./endpoint-browser"
import AIInsights from "./ai-insights"
import ErrorTestCases from "./error-test-cases"

interface BlueprintViewerProps {
  blueprint: any
  onNewBlueprint: () => void
}

export default function BlueprintViewer({ blueprint, onNewBlueprint }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = useState<"endpoints" | "insights" | "errors" | "json">("endpoints")
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(blueprint.endpoints[0] || null)

  const handleDownload = (type: "json" | "csv") => {
    let content = ""
    let filename = `${blueprint.filename || "blueprint"}`

    if (type === "json") {
      content = JSON.stringify(blueprint.rawJson, null, 2)
      filename += ".json"
    } else {
      // CSV format
      const rows = ["Method,Path,Description,Parameters,Status Codes"]
      blueprint.endpoints.forEach((ep: ApiEndpoint) => {
        const params = ep.parameters?.map((p) => p.name).join("; ") || ""
        const statuses = ep.responses?.map((r) => r.status).join("; ") || ""
        rows.push(
          `"${ep.method}","${ep.path}","${(ep.description || "").replace(/"/g, '""')}","${params}","${statuses}"`,
        )
      })
      content = rows.join("\n")
      filename += ".csv"
    }

    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{blueprint.title}</h1>
            <p className="text-muted-foreground">
              v{blueprint.version} • {blueprint.endpoints.length} endpoints
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload("json")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Download size={16} />
              JSON
            </button>
            <button
              onClick={() => handleDownload("csv")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Download size={16} />
              CSV
            </button>
            <button
              onClick={onNewBlueprint}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={16} />
              New
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          {["endpoints", "insights", "errors", "json"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "errors" ? "Error Tests" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "endpoints" && (
          <div className="flex h-full">
            {/* Endpoints List */}
            <div className="w-80 border-r border-border bg-card overflow-y-auto">
              <div className="p-4 sticky top-0 bg-card/80 backdrop-blur border-b border-border">
                <p className="text-sm text-muted-foreground">{blueprint.endpoints.length} endpoints</p>
              </div>
              <div className="divide-y divide-border">
                {blueprint.endpoints.map((endpoint: ApiEndpoint, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`w-full p-3 text-left transition-colors hover:bg-muted ${
                      selectedEndpoint === endpoint ? "bg-muted border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate font-mono">{endpoint.path}</p>
                    {endpoint.description && (
                      <p className="text-xs text-muted-foreground truncate mt-1">{endpoint.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint Details */}
            <div className="flex-1 overflow-y-auto">
              <EndpointBrowser endpoint={selectedEndpoint} />
            </div>
          </div>
        )}

        {activeTab === "insights" && (
          <div className="p-8">
            <AIInsights insights={blueprint.aiInsights} />
          </div>
        )}

        {activeTab === "errors" && (
          <div className="p-8">
            <ErrorTestCases errorTests={blueprint.errorTests} />
          </div>
        )}

        {activeTab === "json" && (
          <div className="p-8">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto text-xs text-muted-foreground font-mono bg-background/50">
                {JSON.stringify(blueprint.rawJson, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
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
