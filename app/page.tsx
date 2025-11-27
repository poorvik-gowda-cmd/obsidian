"use client"

import { useState } from "react"
import FileUpload from "@/components/file-upload"
import BlueprintViewer from "@/components/blueprint-viewer"
import Header from "@/components/header"

export interface ApiEndpoint {
  method: string
  path: string
  description?: string
  parameters?: Array<{
    name: string
    type: string
    required: boolean
  }>
  responses?: Array<{
    status: number
    description: string
  }>
}

export interface ApiBlueprint {
  title?: string
  version?: string
  endpoints: ApiEndpoint[]
}

export default function Home() {
  const [blueprint, setBlueprint] = useState<any | null>(null)

  const handleBlueprintParsed = (data: any) => {
    setBlueprint(data)
  }

  const handleNewBlueprint = () => {
    setBlueprint(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header />

      <main className="h-[calc(100vh-64px)] bg-background">
        {!blueprint ? (
          <div className="w-full h-full flex items-center justify-center p-8">
            <FileUpload onBlueprintParsed={handleBlueprintParsed} />
          </div>
        ) : (
          <BlueprintViewer blueprint={blueprint} onNewBlueprint={handleNewBlueprint} />
        )}
      </main>
    </div>
  )
}
