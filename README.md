# OSS Ranker

A platform for discovering and voting on open-source projects. Built with Next.js, Prisma, and TypeScript.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd ossranker

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Initialize the database
pnpm prisma migrate dev

# Start the development server
pnpm dev

pnpm tsx src/scripts/seed-repos.ts
```

## 🛠 Development Setup

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- SQLite (for development)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./db.sqlite"

# Next Auth
# Generate a secret: `openssl rand -base64 32`
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### Database Setup

```bash
# Generate Prisma Client
pnpm prisma generate

# Apply migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed

# (Optional) View database with Prisma Studio
pnpm prisma studio
```

### Available Scripts

```bash
# Development
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm format      # Format code with Prettier
pnpm type-check  # Run TypeScript checks
```

## 🏗 Project Structure

```
ossranker/
├── prisma/                # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js app router components
│   ├── server/          # Server-side code (API, auth, etc.)
│   └── styles/          # Global styles
└── tests/               # Test files
```

## 🔒 Authentication

- Uses NextAuth.js for authentication
- GitHub OAuth provider
- Session-based authentication
- Protected API routes and pages

## 📊 Database Schema

### Key Models

- `Repository`: GitHub repository information
- `Vote`: User votes on repositories
- `DailyVoteCount`: Tracks daily voting limits
- `User`: User profile and authentication data

## 🚀 Vercel Deployment

### Prerequisites

1. [Vercel Account](https://vercel.com/signup)
2. [GitHub Account](https://github.com)
3. PostgreSQL Database (We recommend [Neon](https://neon.tech) or [Supabase](https://supabase.com))

### Setup Steps

1. **Database Setup**:

   - Create a PostgreSQL database (Neon/Supabase)
   - Get your database connection URL
   - Make sure to enable connection pooling for better performance

2. **GitHub OAuth**:

   - Go to GitHub Developer Settings
   - Create a new OAuth App
   - Set the callback URL to: `https://your-domain.vercel.app/api/auth/callback/github`
   - Save the Client ID and Secret

3. **Deploy to Vercel**:

   ```bash
   # Install Vercel CLI
   pnpm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

   Or use the deploy button:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fossranker)

4. **Environment Variables**:
   Set these in your Vercel project settings:

   ```env
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=... # Generate with: openssl rand -base64 32
   NEXTAUTH_URL=https://your-domain.vercel.app
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   ```

5. **Database Migration**:
   ```bash
   # After first deployment, run migrations
   pnpm prisma migrate deploy
   ```

### Production Optimizations

1. **Database Connection Pooling**:

   ```env
   DATABASE_URL=postgres://...?pgbouncer=true&connection_limit=1
   ```

2. **Edge Config**:

   - Enable Edge Config in Vercel
   - Store rate limiting data in Edge Config
   - Use Edge Middleware for better performance

3. **Caching**:

   - Enable ISR for repository pages
   - Use Edge Cache for API responses
   - Implement stale-while-revalidate pattern

4. **Monitoring**:
   - Enable Vercel Analytics
   - Set up Error tracking
   - Configure Status page

### Automatic Deployments

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments
3. Configure branch deployments:
   - Production: main/master branch
   - Preview: Pull requests
   - Development: development branch

### Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test GitHub authentication
- [ ] Check rate limiting
- [ ] Verify API endpoints
- [ ] Test voting functionality
- [ ] Monitor error rates
- [ ] Set up alerts

### Troubleshooting

Common issues and solutions:

1. **Database Connection Issues**:

   - Check connection string format
   - Verify IP allowlist
   - Enable connection pooling

2. **Authentication Errors**:

   - Verify OAuth callback URLs
   - Check environment variables
   - Clear browser cookies

3. **Build Failures**:

   - Check build logs
   - Verify dependencies
   - Update Node.js version

4. **Performance Issues**:
   - Enable Edge Functions
   - Optimize database queries
   - Implement caching

Need help? Check our [Troubleshooting Guide](docs/troubleshooting.md) or [open an issue](https://github.com/your-repo/ossranker/issues).

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
