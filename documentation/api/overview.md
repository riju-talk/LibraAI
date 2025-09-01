# API Documentation

## Base URL
```
https://api.libraai.legal/v1
```

## Authentication
All API requests require an API key for authentication. Include it in the `Authorization` header:
```
Authorization: Bearer YOUR_API_KEY
```

## Rate Limiting
- 100 requests per minute per API key
- 1,000 requests per day per user

## Endpoints

### Documents
- `POST /documents/upload` - Upload and analyze a document
- `GET /documents/{id}` - Retrieve document analysis
- `GET /documents` - List all user's documents
- `DELETE /documents/{id}` - Delete a document

### Legal Research
- `POST /research/query` - Submit a legal research query
- `GET /research/history` - Get research history
- `GET /research/cases/{id}` - Get case details

### Templates
- `GET /templates` - List available templates
- `POST /templates/generate` - Generate document from template

## Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "requestId": "req_1234567890",
    "timestamp": "2025-09-02T01:45:00Z"
  }
}
```

## Error Handling
Errors follow this format:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid input parameters",
    "details": {
      "field": "document",
      "issue": "File type not supported"
    }
  }
}
```

## Webhooks
LibraAI can send webhook notifications for various events:
- `document.analysis_complete`
- `research.completed`
- `compliance.alert`

## SDKs
Official SDKs are available for:
- JavaScript/Node.js
- Python
- Java
- .NET
