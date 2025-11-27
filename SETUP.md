# API Blueprint Reader - Local Setup Guide

## Quick Start (No Database Required)

The app works **100% locally** without any external services. Just run:

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open `http://localhost:3000` and start uploading API blueprints!

## Features That Work Without Configuration

✅ Upload JSON, YAML, TXT, and PDF files
✅ Parse OpenAPI/Swagger specifications  
✅ Extract endpoints automatically
✅ Generate error test cases
✅ Download results as JSON/CSV
✅ View AI insights (using default generated content)

## Optional: Add Database Support

If you want to **save** your blueprints to a database:

### Option 1: Supabase Cloud (Recommended)

1. Go to https://supabase.com/dashboard
2. Click "New Project" and create a free project
3. Go to **Settings > API**
4. Copy the `Project URL` and `anon public key`
5. Paste them in `.env.local`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

6. Run the migration script:
\`\`\`bash
npm run migrate
\`\`\`

7. Restart your dev server:
\`\`\`bash
npm run dev
\`\`\`

### Option 2: Local Supabase

1. Install Docker: https://docker.com
2. Install Supabase CLI:
\`\`\`bash
npm install -g supabase
\`\`\`

3. Start local Supabase:
\`\`\`bash
supabase start
\`\`\`

4. Copy the credentials from terminal output to `.env.local`

5. Run migrations:
\`\`\`bash
npm run migrate
\`\`\`

## Troubleshooting

### "No endpoints found" error
- Make sure your API file includes paths/endpoints
- Try uploading a sample OpenAPI spec

### Database connection errors
- You don't need a database! Leave it unconfigured
- The app works perfectly without it

### File upload fails
- Check that your file is valid JSON/YAML
- Ensure file size is under 50MB

## Environment Variables Explained

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL for database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Public key for Supabase authentication |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Private key for server-side operations |
| `POSTGRES_*` | No | Direct database connection (local only) |
| `NODE_ENV` | No | Set to "development" for local dev |

## Running Without Environment Variables

The app is fully functional with an **empty `.env.local`** file. All core features work:
- File upload and parsing
- Endpoint extraction
- Error test case generation
- Default AI insights

Only the database save feature requires Supabase configuration.
