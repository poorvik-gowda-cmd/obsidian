"use client"

import { Code2, Copy, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import type { ApiEndpoint } from "@/app/page"

interface EndpointBrowserProps {
  endpoint: ApiEndpoint | null
}

export default function EndpointBrowser({ endpoint }: EndpointBrowserProps) {
  const [copied, setCopied] = useState(false)

  if (!endpoint) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>Select an endpoint to view details</p>
      </div>
    )
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getMethodBgColor(endpoint.method)}`}>
            {endpoint.method}
          </span>
          <code className="text-xl font-mono bg-card p-3 rounded-lg flex-1 min-w-0 break-all">{endpoint.path}</code>
          <button onClick={() => handleCopy(endpoint.path)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            {copied ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {endpoint.description && (
          <p className="text-muted-foreground text-base leading-relaxed">{endpoint.description}</p>
        )}
      </div>

      {/* Parameters */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Parameters
          </h3>
          <div className="bg-card rounded-lg overflow-hidden border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {endpoint.parameters.map((param, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-foreground">{param.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">{param.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      {param.required ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs font-semibold">
                          Required
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">Optional</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Responses */}
      {endpoint.responses && endpoint.responses.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Responses
          </h3>
          <div className="space-y-2">
            {endpoint.responses.map((response, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded font-semibold text-sm ${getStatusColor(response.status)}`}>
                    {response.status}
                  </span>
                  <p className="text-foreground">{response.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!endpoint.parameters || endpoint.parameters.length === 0) &&
        (!endpoint.responses || endpoint.responses.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No additional details available for this endpoint</p>
          </div>
        )}
    </div>
  )
}

function getMethodBgColor(method: string): string {
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

function getStatusColor(status: number): string {
  if (status < 300) return "bg-green-500/20 text-green-300"
  if (status < 400) return "bg-blue-500/20 text-blue-300"
  if (status < 500) return "bg-yellow-500/20 text-yellow-300"
  return "bg-red-500/20 text-red-300"
}
