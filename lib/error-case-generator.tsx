export function generateErrorTestCases(endpoints: any[]): any[] {
  const errorTests: any[] = []

  endpoints.forEach((endpoint) => {
    const basePath = endpoint.path.replace(/{[^}]+}/g, ":id")

    errorTests.push(
      // 1. Missing Required Parameters
      {
        type: "Missing Required Field",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request missing required fields",
        request: {
          method: endpoint.method,
          url: basePath,
          body: "{}",
        },
        expectedResponse: {
          status: 400,
          error: "Missing required field",
        },
      },
      // 2. Invalid Data Type
      {
        type: "Invalid Data Type",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Sending wrong data type for field",
        request: {
          method: endpoint.method,
          url: basePath,
          body: '{"id": "not-a-number"}',
        },
        expectedResponse: {
          status: 400,
          error: "Invalid data type",
        },
      },
      // 3. Unauthorized Access
      {
        type: "Unauthorized",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request without valid authentication",
        request: {
          method: endpoint.method,
          url: basePath,
          headers: { Authorization: "" },
        },
        expectedResponse: {
          status: 401,
          error: "Unauthorized",
        },
      },
      // 4. Forbidden Access
      {
        type: "Forbidden",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Authenticated user lacks permission",
        request: {
          method: endpoint.method,
          url: basePath,
          headers: { Authorization: "Bearer invalid_token" },
        },
        expectedResponse: {
          status: 403,
          error: "Forbidden",
        },
      },
      // 5. Not Found
      {
        type: "Not Found",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Resource does not exist",
        request: {
          method: endpoint.method,
          url: basePath.replace(":id", "99999"),
        },
        expectedResponse: {
          status: 404,
          error: "Resource not found",
        },
      },
      // 6. Duplicate Resource
      {
        type: "Duplicate Resource",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Creating duplicate resource",
        request: {
          method: endpoint.method,
          url: basePath,
          body: '{"email": "existing@example.com"}',
        },
        expectedResponse: {
          status: 409,
          error: "Resource already exists",
        },
      },
      // 7. Validation Error
      {
        type: "Validation Error",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Invalid input format",
        request: {
          method: endpoint.method,
          url: basePath,
          body: '{"email": "invalid-email"}',
        },
        expectedResponse: {
          status: 400,
          error: "Validation failed",
        },
      },
      // 8. Rate Limiting
      {
        type: "Rate Limit Exceeded",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Too many requests from same IP/user",
        request: {
          method: endpoint.method,
          url: basePath,
        },
        expectedResponse: {
          status: 429,
          error: "Rate limit exceeded",
          headers: { "Retry-After": "60" },
        },
      },
      // 9. SQL Injection Prevention
      {
        type: "SQL Injection Prevention",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request contains SQL injection attempt",
        request: {
          method: endpoint.method,
          url: basePath,
          body: '{"search": "\\"; DROP TABLE users; --"}',
        },
        expectedResponse: {
          status: 400,
          error: "Invalid input",
        },
      },
      // 10. XSS Prevention
      {
        type: "XSS Prevention",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request contains script injection",
        request: {
          method: endpoint.method,
          url: basePath,
          body: '{"name": "<script>alert(1)</script>"}',
        },
        expectedResponse: {
          status: 400,
          error: "Invalid input",
        },
      },
      // 11. CSRF Token Missing
      {
        type: "CSRF Token Missing",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "State-changing request without CSRF token",
        request: {
          method: endpoint.method,
          url: basePath,
          headers: { "X-CSRF-Token": "" },
        },
        expectedResponse: {
          status: 403,
          error: "CSRF token required",
        },
      },
      // 12. Timeout
      {
        type: "Request Timeout",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request exceeds timeout limit",
        request: {
          method: endpoint.method,
          url: basePath,
          timeout: "30s",
        },
        expectedResponse: {
          status: 408,
          error: "Request timeout",
        },
      },
      // 13. Payload Too Large
      {
        type: "Payload Too Large",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request body exceeds size limit",
        request: {
          method: endpoint.method,
          url: basePath,
          body: "large payload (> 10MB)",
        },
        expectedResponse: {
          status: 413,
          error: "Payload too large",
        },
      },
      // 14. Unsupported Media Type
      {
        type: "Unsupported Media Type",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Request uses unsupported content type",
        request: {
          method: endpoint.method,
          url: basePath,
          headers: { "Content-Type": "application/xml" },
          body: "<invalid>xml</invalid>",
        },
        expectedResponse: {
          status: 415,
          error: "Unsupported media type",
        },
      },
      // 15. Server Error
      {
        type: "Internal Server Error",
        endpoint: `${endpoint.method} ${endpoint.path}`,
        description: "Server encountered unexpected error",
        request: {
          method: endpoint.method,
          url: basePath,
        },
        expectedResponse: {
          status: 500,
          error: "Internal server error",
        },
      },
    )
  })

  return errorTests
}
