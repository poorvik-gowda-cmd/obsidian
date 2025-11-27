# API Blueprint Reader - Hosting Setup Guide

## Quick Start for Production

### Prerequisites
- Node.js 18+ installed
- GitHub account
- Vercel account
- Supabase account
- OpenAI account

### Step 1: Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to initialize (2-3 minutes)
4. Go to **Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: OpenAI Setup (3 minutes)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API keys** section
4. Click **Create new secret key**
5. Copy the key → `OPENAI_API_KEY`
6. **Important**: Add at least $5 credit to your account (Go to Settings > Billing)

### Step 3: Local Testing

1. Clone or download the project
2. Create `.env.local` file with your credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
\`\`\`

3. Install and run:
\`\`\`bash
npm install
npm run dev
\`\`\`

4. Test at `http://localhost:3000`

### Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click **Add New > Project**
4. Select your GitHub repository
5. Click **Deploy** (it will auto-detect Next.js)
6. After deployment, go to **Settings > Environment Variables**
7. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`

8. Redeploy after adding env vars

### Step 5: Verify Deployment

- Visit your Vercel URL
- Try uploading an API blueprint file
- Check that endpoints are parsed correctly
- Verify AI insights are generated

## Troubleshooting

### "No endpoints found" error
- Ensure your API file is valid JSON or YAML
- Check that it has `paths` (OpenAPI) or similar structure
- Try with the example files first

### OpenAI API errors
- Verify API key is correct
- Check that your OpenAI account has credits
- Monitor usage at platform.openai.com

### Supabase connection errors
- Verify all Supabase keys are correct
- Check that the database tables exist
- Go to Supabase dashboard and manually check api_blueprints table

### Database tables missing
- Run the SQL script in `scripts/` folder
- Or create the `api_blueprints` table manually in Supabase

## Environment Variables Summary

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API | Yes |
| `SUPABASE_URL` | Supabase > Settings > API | Yes |
| `SUPABASE_ANON_KEY` | Supabase > Settings > API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API | Yes |
| `OPENAI_API_KEY` | OpenAI > API Keys | Yes |

## Support

For issues:
1. Check the debug console for error messages
2. Verify all environment variables are set correctly
3. Check Supabase and OpenAI dashboards for account issues
