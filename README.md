# 401(k) Allocation Guide — Vitality Wealth Advisors

Self-service 401(k) allocation tool powered by Claude AI.

## Deploy to Vercel (step by step)

### 1. Push to GitHub
- Create a new repository on github.com (name it `401k-advisor`)
- Upload all these files to it

### 2. Add to Vercel
- Go to vercel.com and click "Add New Project"
- Import your GitHub repository
- Vercel will auto-detect it as a Next.js project

### 3. Set your API key
- In Vercel, go to your project → Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your Anthropic API key
- Get your API key from: console.anthropic.com

### 4. Deploy
- Click Deploy — done. You'll get a URL like `https://401k-advisor.vercel.app`

### 5. Embed in WordPress
Add an HTML block to any WordPress page:
```html
<iframe 
  src="https://your-app.vercel.app" 
  width="100%" 
  height="900px" 
  frameborder="0"
  style="border:none;">
</iframe>
```

## Local development
```bash
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```
Open http://localhost:3000
