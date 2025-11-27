export function generateAIInsights(endpoints: any[], blueprintData: any) {
  // Return intelligent default insights based on blueprint analysis
  return getDefaultInsights(endpoints, blueprintData)
}

function getDefaultInsights(endpoints: any[], blueprintData: any) {
  // Analyze endpoints to provide smarter default insights
  const methods = endpoints.map((ep) => ep.method)
  const hasAuthentication = endpoints.some(
    (ep) => ep.summary?.toLowerCase().includes("auth") || ep.path.toLowerCase().includes("auth"),
  )
  const hasPagination = endpoints.some(
    (ep) => ep.summary?.toLowerCase().includes("list") || ep.path.toLowerCase().includes("list"),
  )

  return {
    missing_cases: [
      "Add error response examples for all endpoints",
      "Document timeout and retry behavior",
      "Add request/response validation schemas",
      "Include rate limit headers in responses",
      !hasAuthentication && "Consider adding authentication/authorization documentation",
    ].filter(Boolean),
    naming_issues: [
      "Review endpoint names for REST compliance",
      "Ensure consistent parameter naming (camelCase vs snake_case)",
      "Standardize status code responses",
    ],
    redundancies: [
      "Check for overlapping endpoint functionality",
      "Consider consolidating similar CRUD operations",
      "Review for duplicate authentication patterns",
    ],
    security_concerns: [
      "Ensure all endpoints require HTTPS",
      "Implement input validation for all parameters",
      hasAuthentication ? "Verify authentication is properly implemented" : "Add authentication/authorization",
      "Enable CORS only for trusted domains",
      "Implement rate limiting on sensitive endpoints",
    ].filter(Boolean),
    performance_tips: [
      hasPagination ? "Implement cursor-based pagination for large datasets" : "Consider pagination for list endpoints",
      "Add caching headers for GET endpoints",
      "Compress responses with gzip/brotli",
      "Use HTTP/2 server push for related resources",
      "Monitor endpoint response times",
    ].filter(Boolean),
    breaking_changes: [
      "Version your API (e.g., /api/v1/)",
      "Maintain backward compatibility for at least 2 minor versions",
      "Provide deprecation notices 6 months before removal",
      "Document all breaking changes in release notes",
    ],
  }
}
