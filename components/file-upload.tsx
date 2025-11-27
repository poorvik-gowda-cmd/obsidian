"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, AlertCircle, Loader } from "lucide-react"

interface FileUploadProps {
  onBlueprintParsed: (data: any) => void
}

export default function FileUpload({ onBlueprintParsed }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      const validExtensions = [".json", ".yaml", ".yml", ".txt", ".pdf"]
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

      if (!validExtensions.includes(fileExtension)) {
        throw new Error("Please upload a JSON, YAML, TXT, or PDF file")
      }

      const content = await file.text()

      const formData = new FormData()
      formData.append("file", file)
      formData.append("content", content)

      const response = await fetch("/api/blueprint/parse", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse blueprint")
      }

      console.log("[v0] Parse successful, data:", data)
      onBlueprintParsed(data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred"
      setError(errorMsg)
      console.error("[v0] File upload error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full ${isDragging ? "bg-primary/20" : "bg-muted"}`}>
            {loading ? (
              <Loader className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <Upload className={`w-8 h-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Upload API Blueprint</h2>
            <p className="text-muted-foreground">Drag and drop your API blueprint file here, or click to browse</p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Processing..." : "Add File"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.yaml,.yml,.txt,.pdf"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-semibold text-destructive">Error</p>
              <p className="text-sm text-destructive/80 max-h-32 overflow-y-auto">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
//file_upload contribution