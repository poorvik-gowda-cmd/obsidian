module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Obsidian-APIBlueprint_01/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://pponvkjhumemdolagbkq.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwb252a2podW1lbWRvbGFnYmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTQxNzcsImV4cCI6MjA3OTIzMDE3N30.6oumdq8XFe3lSQ_38jelJVsWeI_V9yIzKVr3d0HfbK8"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Can be ignored if middleware is refreshing sessions
                }
            }
        }
    });
}
}),
"[project]/Obsidian-APIBlueprint_01/lib/yaml-parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractEndpoints",
    ()=>extractEndpoints,
    "parseYAML",
    ()=>parseYAML
]);
function parseSimpleYAML(yamlString) {
    try {
        // First, try to parse as JSON
        try {
            return JSON.parse(yamlString);
        } catch  {
        // If not JSON, parse as simple YAML
        }
        const obj = {};
        const lines = yamlString.split("\n");
        let currentKey = "";
        const currentArray = [];
        for (const line of lines){
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const indentLevel = line.search(/\S/);
            const colonIndex = trimmed.indexOf(":");
            if (colonIndex > -1) {
                const key = trimmed.substring(0, colonIndex).trim();
                const value = trimmed.substring(colonIndex + 1).trim();
                if (indentLevel === 0) {
                    currentKey = key;
                    if (value) {
                        obj[key] = parseYAMLValue(value);
                    } else {
                        obj[key] = {};
                    }
                } else if (indentLevel === 2) {
                    if (Array.isArray(obj[currentKey])) {
                        obj[currentKey][obj[currentKey].length - 1][key] = parseYAMLValue(value);
                    } else if (typeof obj[currentKey] === "object" && obj[currentKey] !== null) {
                        obj[currentKey][key] = parseYAMLValue(value);
                    }
                }
            } else if (trimmed.startsWith("-")) {
                const item = trimmed.substring(1).trim();
                if (!Array.isArray(obj[currentKey])) {
                    obj[currentKey] = [];
                }
                if (colonIndex > -1) {
                    const key = item.substring(0, colonIndex).trim();
                    const value = item.substring(colonIndex + 1).trim();
                    obj[currentKey].push({
                        [key]: parseYAMLValue(value)
                    });
                } else {
                    obj[currentKey].push(parseYAMLValue(item));
                }
            }
        }
        return obj;
    } catch (error) {
        console.error("[v0] YAML parsing error:", error);
        throw new Error("Failed to parse YAML file");
    }
}
function parseYAMLValue(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null" || value === "") return null;
    if (!isNaN(Number(value)) && value !== "") return Number(value);
    if (value.startsWith("[") && value.endsWith("]")) {
        try {
            return JSON.parse(value);
        } catch  {
            return value;
        }
    }
    if (value.startsWith("{") && value.endsWith("}")) {
        try {
            return JSON.parse(value);
        } catch  {
            return value;
        }
    }
    return value.replace(/^["']|["']$/g, "");
}
function parseYAML(yamlString) {
    return parseSimpleYAML(yamlString);
}
function extractEndpoints(blueprint) {
    const endpoints = [];
    console.log("[v0] Checking for OpenAPI paths...");
    // Handle OpenAPI/Swagger format (most common)
    if (blueprint.paths && typeof blueprint.paths === "object") {
        Object.entries(blueprint.paths).forEach(([path, methods])=>{
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
                        tags: []
                    });
                }
                return;
            }
            Object.entries(methods).forEach(([method, details])=>{
                if (method.toLowerCase() === "parameters" || !details || typeof details !== "object") return;
                endpoints.push({
                    path,
                    method: method.toUpperCase(),
                    summary: details.summary || `${method.toUpperCase()} ${path}`,
                    description: details.description || "",
                    operationId: details.operationId || "",
                    parameters: details.parameters || [],
                    requestBody: details.requestBody || null,
                    responses: details.responses || {},
                    tags: details.tags || []
                });
            });
        });
        console.log("[v0] Found OpenAPI endpoints:", endpoints.length);
    }
    console.log("[v0] Checking for API Blueprint resourceGroups...");
    // Handle API Blueprint format
    if (blueprint.resourceGroups && Array.isArray(blueprint.resourceGroups)) {
        blueprint.resourceGroups.forEach((group)=>{
            if (group.resources && Array.isArray(group.resources)) {
                group.resources.forEach((resource)=>{
                    if (resource.actions && Array.isArray(resource.actions)) {
                        resource.actions.forEach((action)=>{
                            endpoints.push({
                                path: resource.uriTemplate || resource.href || "",
                                method: action.method || "GET",
                                summary: action.name || "",
                                description: action.description || "",
                                parameters: resource.parameters || [],
                                requestBody: action.request || null,
                                responses: action.responses || []
                            });
                        });
                    }
                });
            }
        });
        console.log("[v0] Found API Blueprint endpoints:", endpoints.length);
    }
    console.log("[v0] Checking for simple endpoints array...");
    // Handle simple endpoints array format
    if (blueprint.endpoints && Array.isArray(blueprint.endpoints)) {
        blueprint.endpoints.forEach((endpoint)=>{
            if (endpoint.path && endpoint.method) {
                endpoints.push({
                    path: endpoint.path,
                    method: endpoint.method.toUpperCase(),
                    summary: endpoint.summary || endpoint.name || "",
                    description: endpoint.description || "",
                    parameters: endpoint.parameters || [],
                    requestBody: endpoint.requestBody || null,
                    responses: endpoint.responses || [],
                    tags: endpoint.tags || []
                });
            }
        });
        console.log("[v0] Found simple endpoints:", endpoints.length);
    }
    // Deduplicate endpoints
    const uniqueEndpoints = Array.from(new Map(endpoints.map((ep)=>[
            ep.path + ep.method,
            ep
        ])).values());
    console.log("[v0] Total unique endpoints:", uniqueEndpoints.length);
    return uniqueEndpoints;
}
}),
"[project]/Obsidian-APIBlueprint_01/lib/error-case-generator.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateErrorTestCases",
    ()=>generateErrorTestCases
]);
function generateErrorTestCases(endpoints) {
    const errorTests = [];
    endpoints.forEach((endpoint)=>{
        const basePath = endpoint.path.replace(/{[^}]+}/g, ":id");
        errorTests.push(// 1. Missing Required Parameters
        {
            type: "Missing Required Field",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request missing required fields",
            request: {
                method: endpoint.method,
                url: basePath,
                body: "{}"
            },
            expectedResponse: {
                status: 400,
                error: "Missing required field"
            }
        }, // 2. Invalid Data Type
        {
            type: "Invalid Data Type",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Sending wrong data type for field",
            request: {
                method: endpoint.method,
                url: basePath,
                body: '{"id": "not-a-number"}'
            },
            expectedResponse: {
                status: 400,
                error: "Invalid data type"
            }
        }, // 3. Unauthorized Access
        {
            type: "Unauthorized",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request without valid authentication",
            request: {
                method: endpoint.method,
                url: basePath,
                headers: {
                    Authorization: ""
                }
            },
            expectedResponse: {
                status: 401,
                error: "Unauthorized"
            }
        }, // 4. Forbidden Access
        {
            type: "Forbidden",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Authenticated user lacks permission",
            request: {
                method: endpoint.method,
                url: basePath,
                headers: {
                    Authorization: "Bearer invalid_token"
                }
            },
            expectedResponse: {
                status: 403,
                error: "Forbidden"
            }
        }, // 5. Not Found
        {
            type: "Not Found",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Resource does not exist",
            request: {
                method: endpoint.method,
                url: basePath.replace(":id", "99999")
            },
            expectedResponse: {
                status: 404,
                error: "Resource not found"
            }
        }, // 6. Duplicate Resource
        {
            type: "Duplicate Resource",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Creating duplicate resource",
            request: {
                method: endpoint.method,
                url: basePath,
                body: '{"email": "existing@example.com"}'
            },
            expectedResponse: {
                status: 409,
                error: "Resource already exists"
            }
        }, // 7. Validation Error
        {
            type: "Validation Error",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Invalid input format",
            request: {
                method: endpoint.method,
                url: basePath,
                body: '{"email": "invalid-email"}'
            },
            expectedResponse: {
                status: 400,
                error: "Validation failed"
            }
        }, // 8. Rate Limiting
        {
            type: "Rate Limit Exceeded",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Too many requests from same IP/user",
            request: {
                method: endpoint.method,
                url: basePath
            },
            expectedResponse: {
                status: 429,
                error: "Rate limit exceeded",
                headers: {
                    "Retry-After": "60"
                }
            }
        }, // 9. SQL Injection Prevention
        {
            type: "SQL Injection Prevention",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request contains SQL injection attempt",
            request: {
                method: endpoint.method,
                url: basePath,
                body: '{"search": "\\"; DROP TABLE users; --"}'
            },
            expectedResponse: {
                status: 400,
                error: "Invalid input"
            }
        }, // 10. XSS Prevention
        {
            type: "XSS Prevention",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request contains script injection",
            request: {
                method: endpoint.method,
                url: basePath,
                body: '{"name": "<script>alert(1)</script>"}'
            },
            expectedResponse: {
                status: 400,
                error: "Invalid input"
            }
        }, // 11. CSRF Token Missing
        {
            type: "CSRF Token Missing",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "State-changing request without CSRF token",
            request: {
                method: endpoint.method,
                url: basePath,
                headers: {
                    "X-CSRF-Token": ""
                }
            },
            expectedResponse: {
                status: 403,
                error: "CSRF token required"
            }
        }, // 12. Timeout
        {
            type: "Request Timeout",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request exceeds timeout limit",
            request: {
                method: endpoint.method,
                url: basePath,
                timeout: "30s"
            },
            expectedResponse: {
                status: 408,
                error: "Request timeout"
            }
        }, // 13. Payload Too Large
        {
            type: "Payload Too Large",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request body exceeds size limit",
            request: {
                method: endpoint.method,
                url: basePath,
                body: "large payload (> 10MB)"
            },
            expectedResponse: {
                status: 413,
                error: "Payload too large"
            }
        }, // 14. Unsupported Media Type
        {
            type: "Unsupported Media Type",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Request uses unsupported content type",
            request: {
                method: endpoint.method,
                url: basePath,
                headers: {
                    "Content-Type": "application/xml"
                },
                body: "<invalid>xml</invalid>"
            },
            expectedResponse: {
                status: 415,
                error: "Unsupported media type"
            }
        }, // 15. Server Error
        {
            type: "Internal Server Error",
            endpoint: `${endpoint.method} ${endpoint.path}`,
            description: "Server encountered unexpected error",
            request: {
                method: endpoint.method,
                url: basePath
            },
            expectedResponse: {
                status: 500,
                error: "Internal server error"
            }
        });
    });
    return errorTests;
}
}),
"[project]/Obsidian-APIBlueprint_01/lib/pdf-parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractTextFromPDF",
    ()=>extractTextFromPDF
]);
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    // Simple PDF text extraction - reads text streams from PDF
    // This handles basic PDFs; complex PDFs may need pdfjs-dist library
    let text = "";
    let inTextObject = false;
    let currentText = "";
    for(let i = 0; i < uint8Array.length; i++){
        const char = String.fromCharCode(uint8Array[i]);
        // Look for text object markers
        if (char === "B" && String.fromCharCode(uint8Array[i + 1]) === "T") {
            inTextObject = true;
            i += 1;
        } else if (char === "E" && String.fromCharCode(uint8Array[i + 1]) === "T") {
            inTextObject = false;
            if (currentText) {
                text += currentText + "\n";
                currentText = "";
            }
            i += 1;
        } else if (inTextObject && char === "T" && String.fromCharCode(uint8Array[i + 1]) === "j") {
            // Extract text between parentheses
            let j = i + 2;
            while(j < uint8Array.length && String.fromCharCode(uint8Array[j]) !== "(")j++;
            j++;
            while(j < uint8Array.length && String.fromCharCode(uint8Array[j]) !== ")"){
                const c = String.fromCharCode(uint8Array[j]);
                if (c.charCodeAt(0) > 31 && c.charCodeAt(0) < 127) {
                    currentText += c;
                }
                j++;
            }
            i = j;
        }
    }
    return text || extractFallbackPDFText(uint8Array);
}
function extractFallbackPDFText(uint8Array) {
    // Fallback: extract readable strings from PDF
    let text = "";
    let currentString = "";
    for(let i = 0; i < uint8Array.length; i++){
        const char = String.fromCharCode(uint8Array[i]);
        if (char.charCodeAt(0) > 31 && char.charCodeAt(0) < 127 && char !== "<" && char !== ">") {
            currentString += char;
        } else {
            if (currentString.length > 3) {
                text += currentString + " ";
            }
            currentString = "";
        }
    }
    return text;
}
}),
"[project]/Obsidian-APIBlueprint_01/lib/ai-insights-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateAIInsights",
    ()=>generateAIInsights
]);
function generateAIInsights(endpoints, blueprintData) {
    // Return intelligent default insights based on blueprint analysis
    return getDefaultInsights(endpoints, blueprintData);
}
function getDefaultInsights(endpoints, blueprintData) {
    // Analyze endpoints to provide smarter default insights
    const methods = endpoints.map((ep)=>ep.method);
    const hasAuthentication = endpoints.some((ep)=>ep.summary?.toLowerCase().includes("auth") || ep.path.toLowerCase().includes("auth"));
    const hasPagination = endpoints.some((ep)=>ep.summary?.toLowerCase().includes("list") || ep.path.toLowerCase().includes("list"));
    return {
        missing_cases: [
            "Add error response examples for all endpoints",
            "Document timeout and retry behavior",
            "Add request/response validation schemas",
            "Include rate limit headers in responses",
            !hasAuthentication && "Consider adding authentication/authorization documentation"
        ].filter(Boolean),
        naming_issues: [
            "Review endpoint names for REST compliance",
            "Ensure consistent parameter naming (camelCase vs snake_case)",
            "Standardize status code responses"
        ],
        redundancies: [
            "Check for overlapping endpoint functionality",
            "Consider consolidating similar CRUD operations",
            "Review for duplicate authentication patterns"
        ],
        security_concerns: [
            "Ensure all endpoints require HTTPS",
            "Implement input validation for all parameters",
            hasAuthentication ? "Verify authentication is properly implemented" : "Add authentication/authorization",
            "Enable CORS only for trusted domains",
            "Implement rate limiting on sensitive endpoints"
        ].filter(Boolean),
        performance_tips: [
            hasPagination ? "Implement cursor-based pagination for large datasets" : "Consider pagination for list endpoints",
            "Add caching headers for GET endpoints",
            "Compress responses with gzip/brotli",
            "Use HTTP/2 server push for related resources",
            "Monitor endpoint response times"
        ].filter(Boolean),
        breaking_changes: [
            "Version your API (e.g., /api/v1/)",
            "Maintain backward compatibility for at least 2 minor versions",
            "Provide deprecation notices 6 months before removal",
            "Document all breaking changes in release notes"
        ]
    };
}
}),
"[project]/Obsidian-APIBlueprint_01/app/api/blueprint/parse/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Obsidian-APIBlueprint_01/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$yaml$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Obsidian-APIBlueprint_01/lib/yaml-parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$error$2d$case$2d$generator$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Obsidian-APIBlueprint_01/lib/error-case-generator.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$pdf$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Obsidian-APIBlueprint_01/lib/pdf-parser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$ai$2d$insights$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Obsidian-APIBlueprint_01/lib/ai-insights-generator.ts [app-route] (ecmascript)");
;
;
;
;
;
;
function extractEndpointsFromText(text) {
    const endpoints = [];
    const methods = [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "HEAD"
    ];
    const lines = text.split("\n");
    lines.forEach((line)=>{
        methods.forEach((method)=>{
            if (line.includes(method)) {
                const methodIndex = line.indexOf(method);
                const pathPart = line.substring(methodIndex + method.length).trim();
                const pathMatch = pathPart.match(/^(\/[\w\-/{}]*)/);
                if (pathMatch && pathMatch[1]) {
                    const path = pathMatch[1].split(/[\s,]/)[0];
                    const description = pathPart.substring(path.length).trim();
                    endpoints.push({
                        path,
                        method: method.toUpperCase(),
                        summary: description || `${method} ${path}`,
                        description: description,
                        parameters: [],
                        requestBody: null,
                        responses: []
                    });
                }
            }
        });
    });
    return Array.from(new Map(endpoints.map((ep)=>[
            ep.path + ep.method,
            ep
        ])).values());
}
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const content = formData.get("content");
        const filename = file?.name || "blueprint";
        if (!content && !filename.endsWith(".pdf")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No file content provided"
            }, {
                status: 400
            });
        }
        let blueprintData;
        let processedContent = content;
        if (filename.endsWith(".pdf")) {
            processedContent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$pdf$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTextFromPDF"])(file);
            if (!processedContent || processedContent.trim().length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Could not extract text from PDF. Please ensure it contains readable text."
                }, {
                    status: 400
                });
            }
        }
        if (filename.endsWith(".txt")) {
            processedContent = content;
            try {
                blueprintData = JSON.parse(processedContent);
            } catch  {
                try {
                    blueprintData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$yaml$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseYAML"])(processedContent);
                } catch  {
                    blueprintData = {
                        title: "API Documentation from Text",
                        version: "1.0.0",
                        description: processedContent.substring(0, 500),
                        documentation: processedContent,
                        endpoints: extractEndpointsFromText(processedContent)
                    };
                }
            }
        } else if (filename.endsWith(".yaml") || filename.endsWith(".yml")) {
            blueprintData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$yaml$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseYAML"])(processedContent);
        } else {
            try {
                blueprintData = JSON.parse(processedContent);
            } catch  {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid JSON format"
                }, {
                    status: 400
                });
            }
        }
        console.log("[v0] Parsed blueprint:", JSON.stringify(blueprintData, null, 2).substring(0, 500));
        const endpoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$yaml$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractEndpoints"])(blueprintData);
        console.log("[v0] Extracted endpoints count:", endpoints.length);
        if (endpoints.length === 0) {
            console.log("[v0] Blueprint data structure:", JSON.stringify(blueprintData, null, 2));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No endpoints found in blueprint. Ensure your file includes: paths (OpenAPI), resourceGroups (API Blueprint), endpoints array, or endpoint documentation."
            }, {
                status: 400
            });
        }
        const errorTests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$error$2d$case$2d$generator$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateErrorTestCases"])(endpoints);
        console.log("[v0] Generated error tests:", errorTests.length);
        const aiInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$ai$2d$insights$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAIInsights"])(endpoints, blueprintData);
        console.log("[v0] Generated insights (no credit card required)");
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Obsidian$2d$APIBlueprint_01$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error: dbError } = await supabase.from("api_blueprints").insert({
            file_url: `file://${filename}`,
            original_filename: filename,
            parsed_json: blueprintData,
            ai_insights: aiInsights,
            error_tests: errorTests
        }).select().single();
        if (dbError) {
            console.error("[v0] Database error:", dbError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: data?.id || null,
            filename: filename,
            title: blueprintData.info?.title || blueprintData.title || "API Blueprint",
            version: blueprintData.info?.version || blueprintData.version || "1.0.0",
            endpoints: endpoints,
            errorTests: errorTests,
            aiInsights: aiInsights,
            rawJson: blueprintData,
            createdAt: data?.created_at || new Date().toISOString()
        });
    } catch (error) {
        console.error("[v0] Parse error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Failed to parse blueprint"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7acff7fc._.js.map