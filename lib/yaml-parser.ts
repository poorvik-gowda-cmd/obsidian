function parseSimpleYAML(yamlString: string): any {
  try {
    // First, try to parse as JSON
    try {
      return JSON.parse(yamlString)
    } catch {
      // If not JSON, parse as simple YAML
    }

    const obj: any = {}
    const lines = yamlString.split("\n")
    let currentKey = ""
    const currentArray: any[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue

      const indentLevel = line.search(/\S/)
      const colonIndex = trimmed.indexOf(":")

      if (colonIndex > -1) {
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        if (indentLevel === 0) {
          currentKey = key
          if (value) {
            obj[key] = parseYAMLValue(value)
          } else {
            obj[key] = {}
          }
        } else if (indentLevel === 2) {
          if (Array.isArray(obj[currentKey])) {
            obj[currentKey][obj[currentKey].length - 1][key] = parseYAMLValue(value)
          } else if (typeof obj[currentKey] === "object" && obj[currentKey] !== null) {
            obj[currentKey][key] = parseYAMLValue(value)
          }
        }
      } else if (trimmed.startsWith("-")) {
        const item = trimmed.substring(1).trim()
        if (!Array.isArray(obj[currentKey])) {
          obj[currentKey] = []
        }
        if (colonIndex > -1) {
          const key = item.substring(0, colonIndex).trim()
          const value = item.substring(colonIndex + 1).trim()
          obj[currentKey].push({ [key]: parseYAMLValue(value) })
        } else {
          obj[currentKey].push(parseYAMLValue(item))
        }
      }
    }

    return obj
  } catch (error) {
    console.error("[v0] YAML parsing error:", error)
    throw new Error("Failed to parse YAML file")
  }
}

function parseYAMLValue(value: string): any {
  if (value === "true") return true
  if (value === "false") return false
  if (value === "null" || value === "") return null
  if (!isNaN(Number(value)) && value !== "") return Number(value)
  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
  if (value.startsWith("{") && value.endsWith("}")) {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
  return value.replace(/^["']|["']$/g, "")
}

export function parseYAML(yamlString: string): any {
  return parseSimpleYAML(yamlString)
}

export function extractEndpoints(blueprint: any): any[] {
  const endpoints: any[] = []

  console.log("[v0] Checking for OpenAPI paths...")
  // Handle OpenAPI/Swagger format (most common)
  if (blueprint.paths && typeof blueprint.paths === "object") {
    Object.entries(blueprint.paths).forEach(([path, methods]: [string, any]) => {
      if (!methods || typeof methods !== "object") {
        if (methods === null) {
          endpoints.push({
            path,
            method: "GET",
            summary: `GET ${path}`,
            description: "",
            operationId: "",
            parameters: [],
            requestBody: null,
            responses: {},
            tags: [],
          })
        }
        return
      }

      Object.entries(methods).forEach(([method, details]: [string, any]) => {
        if (method.toLowerCase() === "parameters" || !details || typeof details !== "object") return

        endpoints.push({
          path,
          method: method.toUpperCase(),
          summary: details.summary || `${method.toUpperCase()} ${path}`,
          description: details.description || "",
          operationId: details.operationId || "",
          parameters: details.parameters || [],
          requestBody: details.requestBody || null,
          responses: details.responses || {},
          tags: details.tags || [],
        })
      })
    })
    console.log("[v0] Found OpenAPI endpoints:", endpoints.length)
  }

  console.log("[v0] Checking for API Blueprint resourceGroups...")
  // Handle API Blueprint format
  if (blueprint.resourceGroups && Array.isArray(blueprint.resourceGroups)) {
    blueprint.resourceGroups.forEach((group: any) => {
      if (group.resources && Array.isArray(group.resources)) {
        group.resources.forEach((resource: any) => {
          if (resource.actions && Array.isArray(resource.actions)) {
            resource.actions.forEach((action: any) => {
              endpoints.push({
                path: resource.uriTemplate || resource.href || "",
                method: action.method || "GET",
                summary: action.name || "",
                description: action.description || "",
                parameters: resource.parameters || [],
                requestBody: action.request || null,
                responses: action.responses || [],
              })
            })
          }
        })
      }
    })
    console.log("[v0] Found API Blueprint endpoints:", endpoints.length)
  }

  console.log("[v0] Checking for simple endpoints array...")
  // Handle simple endpoints array format
  if (blueprint.endpoints && Array.isArray(blueprint.endpoints)) {
    blueprint.endpoints.forEach((endpoint: any) => {
      if (endpoint.path && endpoint.method) {
        endpoints.push({
          path: endpoint.path,
          method: endpoint.method.toUpperCase(),
          summary: endpoint.summary || endpoint.name || "",
          description: endpoint.description || "",
          parameters: endpoint.parameters || [],
          requestBody: endpoint.requestBody || null,
          responses: endpoint.responses || [],
          tags: endpoint.tags || [],
        })
      }
    })
    console.log("[v0] Found simple endpoints:", endpoints.length)
  }

  // Deduplicate endpoints
  const uniqueEndpoints = Array.from(new Map(endpoints.map((ep) => [ep.path + ep.method, ep])).values())
  console.log("[v0] Total unique endpoints:", uniqueEndpoints.length)

  return uniqueEndpoints
}
