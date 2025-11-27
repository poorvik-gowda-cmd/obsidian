"use client"

import { Lightbulb, AlertTriangle, Zap, Lock, AlertCircle, CheckCircle } from "lucide-react"

interface AIInsightsProps {
  insights: any
}

export default function AIInsights({ insights }: AIInsightsProps) {
  if (!insights) return null

  const categories = [
    {
      key: "missing_cases",
      label: "Missing Cases",
      icon: AlertCircle,
      color: "text-yellow-400 bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      key: "naming_issues",
      label: "Naming Inconsistencies",
      icon: AlertTriangle,
      color: "text-orange-400 bg-orange-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      key: "redundancies",
      label: "Redundancies",
      icon: Zap,
      color: "text-blue-400 bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      key: "security_concerns",
      label: "Security Concerns",
      icon: Lock,
      color: "text-red-400 bg-red-500/20",
      borderColor: "border-red-500/30",
    },
    {
      key: "performance_tips",
      label: "Performance Tips",
      icon: Lightbulb,
      color: "text-green-400 bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      key: "breaking_changes",
      label: "Breaking Changes",
      icon: CheckCircle,
      color: "text-purple-400 bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">AI Insights & Recommendations</h3>

      <div className="space-y-4">
        {categories.map((category) => {
          const Icon = category.icon
          const content = insights[category.key]

          if (!content) return null

          const items = Array.isArray(content) ? content : [content]

          return (
            <div key={category.key} className={`border rounded-lg p-4 ${category.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded ${category.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">{category.label}</h4>
              </div>
              <ul className="space-y-2">
                {items.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
