import { Code2 } from "lucide-react"

export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <Code2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">APIBlueprint</h1>
          <p className="text-xs text-muted-foreground">API Specification Reader</p>
        </div>
      </div>
    </header>
  )
}
