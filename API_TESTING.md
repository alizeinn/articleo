# Articleo API Testing Guide

## Credentials
```bash
SUPABASE_URL=https://gjiziygpiimlxblrsnya.supabase.co
ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE
```

## Quick Test Commands

### 1. List Sites
```bash
curl "https://gjiziygpiimlxblrsnya.supabase.co/rest/v1/sites" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE"
```

### 2. Create a Site
```bash
curl -X POST "https://gjiziygpiimlxblrsnya.supabase.co/rest/v1/sites" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"domain": "example.com", "name": "Example Site"}'
```

### 3. List Summaries (Replace $SITE_ID with actual ID)
```bash
curl "https://gjiziygpiimlxblrsnya.supabase.co/rest/v1/summaries?site_id=eq.$SITE_ID" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE"
```

### 4. Create a Summary (Replace $SITE_ID with actual ID)
```bash
curl -X POST "https://gjiziygpiimlxblrsnya.supabase.co/rest/v1/summaries" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaXppeWdwaWltbHhibHJzbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM1NDksImV4cCI6MjA1MDE3OTU0OX0.n2y8-jPWP9UC6rx4NrchZhLUHH27Ah1PdP3f8vwCRGE" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "site_id": "$SITE_ID",
    "url": "https://example.com/article",
    "title": "Test Article",
    "original_content": "Test content..."
  }'
```

## Testing Steps

1. First, create a site using the "Create a Site" command
2. Copy the `id` from the response
3. Replace `$SITE_ID` in the summaries commands with the actual site ID
4. Test listing summaries and creating a summary

## Expected Responses

### Sites List Response
```json
[
  {
    "id": "uuid",
    "domain": "example.com",
    "site_key": "unique-key",
    "name": "Example Site",
    "created_at": "2024-03-19T12:00:00Z"
  }
]
```

### Summaries List Response
```json
[
  {
    "id": "uuid",
    "site_id": "site-uuid",
    "url": "https://example.com/article",
    "title": "Test Article",
    "summary": "",
    "created_at": "2024-03-19T12:00:00Z"
  }
]
```

## Troubleshooting

If you get a 404 error:
- Verify the URL is correct
- Check that the tables exist in your Supabase project

If you get a 401 error:
- Verify your API key is correct
- Make sure both the `apikey` and `Authorization` headers are present

If you get a 403 error:
- Check the RLS policies in your Supabase project
- Verify you have the correct permissions