# intoday - Development Roadmap

## ✅ Completed Features

### Core Functionality
- [x] Next.js 15 setup with TypeScript and App Router
- [x] Tailwind CSS + shadcn/ui component library
- [x] GSAP animations integration
- [x] Responsive design (mobile, tablet, desktop)
- [x] Custom intoday logo with Manrope font and toggle icon design

### Authentication & Security
- [x] Complete authentication system with business rules
- [x] Protected routes with role-based access control
- [x] Session management with cookies
- [x] Role-based permissions enforcement (staff, org_admin, app_admin)
- [x] Login page with shadcn/ui design
- [x] AuthProvider context for state management

### User Features
- [x] Weekly schedule view (Monday-Friday)
- [x] Office/Home day selection toggle
- [x] Week navigation (previous/next/current week)
- [x] Current week highlighting
- [x] Team member schedule visibility
- [x] Day labels showing dates
- [x] Multi-team support for users
- [x] Team switching interface with clean tab design
- [x] Grid and list view modes for team members
- [x] Monthly calendar view
- [x] Account settings page (profile, password, notifications)
- [x] User dropdown menu in navbar

### Organisation Admin Features
- [x] Organisation admin panel with tab-based navigation
- [x] Team management interface
- [x] Create team functionality with inline form
- [x] Add user functionality with inline form
- [x] User management with team assignments
- [x] Add/remove users from multiple teams
- [x] Schedule management for all team members
- [x] Override user schedules as admin
- [x] Monthly calendar view for admin
- [x] Team member cards with current day highlighting

### Super Admin Features
- [x] Complete super admin panel with application-level management
- [x] Overview dashboard with system statistics
- [x] Organisation management with professional table layout
- [x] Global user management with search functionality
- [x] Subdomain display for organisations (.intoday.io format)
- [x] Subscription management UI (placeholder)
- [x] Reports dashboard UI (placeholder)
- [x] Application settings UI (placeholder)
- [x] Role-based navigation (Schedule/Super Admin switcher)
- [x] Sub-navigation for super admin sections

### Data & Structure
- [x] TypeScript type definitions
- [x] Mock data implementation
- [x] Multi-team user support
- [x] Organisation structure
- [x] Role-based access (staff, org_admin, app_admin)
- [x] User, Team, and Organisation data models

### UI/UX Improvements
- [x] Professional table layouts for data display
- [x] Clean inline forms for team and user creation
- [x] Improved navigation with role-specific menus
- [x] Better visual hierarchy and spacing
- [x] Consistent design language throughout
- [x] Responsive table designs with proper truncation

## 📋 TODO / Upcoming Features

### Authentication & Security
- [ ] Clerk authentication integration
- [ ] Secure API endpoints
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication

### Backend Development
- [ ] Node.js backend setup
- [ ] Database schema design (PostgreSQL/MongoDB)
- [ ] REST API or GraphQL implementation
- [ ] Schedule CRUD operations
- [ ] User management APIs
- [ ] Team management APIs
- [ ] Organisation management APIs
- [ ] Subdomain management system

### Data Persistence
- [ ] Connect frontend to backend APIs
- [ ] Real-time schedule updates
- [ ] Data validation
- [ ] Error handling
- [ ] Loading states
- [ ] Optimistic UI updates

### Enhanced Features
- [ ] Export schedules (PDF, CSV, iCal)
- [ ] Email notifications for schedule changes
- [ ] Weekly digest emails
- [ ] Team capacity planning
- [ ] Office desk booking integration
- [ ] Recurring schedule patterns
- [ ] Bulk schedule updates
- [ ] User details modal/page for super admin

### Analytics & Reporting
- [ ] Detailed attendance analytics
- [ ] Team presence trends
- [ ] Office utilization reports
- [ ] Custom date range reports
- [ ] Export analytics data
- [ ] Visualizations (charts, graphs)

### Admin Enhancements
- [ ] Create/edit/delete organisations (super admin)
- [ ] Create/edit/delete teams (organisation admin)
- [ ] Invite users to organisation
- [ ] Remove users from organisation
- [ ] Bulk user imports (CSV)
- [ ] Audit logs
- [ ] System settings configuration
- [ ] Organisation settings management

### Subscription & Billing
- [ ] Subscription plan management
- [ ] Billing dashboard
- [ ] Payment processing integration
- [ ] Usage tracking
- [ ] Plan upgrade/downgrade flows

### UX Improvements
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Advanced search/filter functionality
- [ ] Quick actions menu
- [ ] Onboarding flow
- [ ] Help documentation
- [ ] Tooltips and hints
- [ ] Drag-and-drop scheduling

### Performance & Optimization
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] Performance monitoring

### Testing & Quality
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Accessibility audit
- [ ] Performance testing
- [ ] Security audit

### DevOps & Deployment
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Environment configuration
- [ ] Monitoring and logging
- [ ] Backup strategy
- [ ] SSL certificates
- [ ] Subdomain routing setup

### Mobile
- [ ] Progressive Web App (PWA)
- [ ] Mobile-specific optimizations
- [ ] Native mobile app (optional)

### Integrations
- [ ] Microsoft Teams integration
- [ ] Slack integration
- [ ] Google Calendar sync
- [ ] Outlook Calendar sync
- [ ] SSO providers

## 🐛 Known Issues

- [ ] None currently

## 💡 Future Considerations

- [ ] Multi-language support (i18n)
- [ ] Time zone support
- [ ] Custom branding per organisation
- [ ] API for third-party integrations
- [ ] Webhooks
- [ ] Advanced permission system
- [ ] Department/location hierarchies
- [ ] Real-time notifications
- [ ] Mobile app development

---

## Notes

This roadmap is a living document. Features can be added, removed, or reprioritized based on user feedback and business requirements.

**Current Status:** Frontend application is feature-complete with authentication, user management, organisation management, and super admin functionality. Ready for backend development and data persistence.

**Next Priority:** Deploy to Netlify for production hosting and backend development

---

## 🚀 **Deployment Guide: Git + Netlify Setup**

### **Step 1: Git Setup & GitHub Repository**

#### **1.1 Initialize Git (if not already done)**
```bash
# Navigate to your project directory
cd /Users/alexkozak/Documents/workday.io

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete intoday frontend with authentication and admin panels"
```

#### **1.2 Create GitHub Repository**
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Repository name: `intoday` (or your preferred name)
4. Description: `Office schedule management application`
5. Set to **Public** (for free hosting)
6. **Don't** initialize with README (we already have files)
7. Click **"Create repository"**

#### **1.3 Connect Local Repository to GitHub**
```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/alexaklan/intoday.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 2: Netlify Account Setup**

#### **2.1 Create Netlify Account**
1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** → **"Sign up with GitHub"**
3. Authorize Netlify to access your GitHub account
4. Complete account setup

#### **2.2 Netlify Dashboard Overview**
- **Sites**: Your deployed applications
- **Functions**: Serverless functions
- **Domains**: Custom domain management
- **Forms**: Form handling (if needed)
- **Settings**: Environment variables and config

### **Step 3: Deploy Frontend to Netlify**

#### **3.1 Create New Site**
1. In Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your `intoday` repository

#### **3.2 Configure Build Settings**
Netlify will auto-detect Next.js, but verify these settings:
```bash
# Build settings (auto-detected):
Build command: npm run build
Publish directory: .next
Node version: 18.x (or latest)
```

#### **3.3 Set Environment Variables**
In Netlify dashboard → Your site → **Site settings** → **Environment variables**:
```bash
# Add these environment variables:
NODE_ENV=production
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-site-name.netlify.app
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run this command to generate a secure secret
openssl rand -base64 32
```

### **Step 4: Add Database (Supabase)**

#### **4.1 Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** → **"New project"**
3. Choose your organization
4. Project name: `intoday-db`
5. Database password: Generate a strong password
6. Region: Choose closest to your users
7. Click **"Create new project"**

#### **4.2 Database Connection Details**
Supabase will provide:
- **Project URL**: `https://your-project.supabase.co`
- **API Key**: `eyJ...` (anon/public key)
- **Service Role Key**: `eyJ...` (secret key)
- **Database URL**: `postgresql://postgres:password@host:port/postgres`

### **Step 5: Configure Custom Domain (Optional)**

#### **5.1 Add Custom Domain**
1. In Netlify dashboard → Your site → **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `intoday.yourdomain.com`)
4. Follow DNS configuration instructions

#### **5.2 DNS Configuration**
Add these DNS records to your domain provider:
```
Type: CNAME
Name: intoday (or subdomain of choice)
Value: your-site-name.netlify.app
```

### **Step 6: Environment Configuration**

#### **6.1 Update Environment Variables**
Add database connection to Netlify variables:
```bash
# Add to Netlify environment variables:
DATABASE_URL=postgresql://postgres:password@host:port/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
NODE_ENV=production
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

#### **6.2 Update Authentication URLs**
In your code, update any hardcoded URLs:
```typescript
// In lib/auth-service.ts or similar files
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001'
```

### **Step 7: Deploy and Test**

#### **7.1 Trigger Deployment**
Netlify automatically deploys when you push to GitHub:
```bash
# Make a small change and push
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

#### **7.2 Monitor Deployment**
1. Go to Netlify dashboard → Your site
2. Click **"Deploys"** tab
3. Watch the build logs in real-time
4. Deployment typically takes 2-3 minutes

#### **7.3 Test Production Application**
1. Visit your Netlify URL: `https://your-site-name.netlify.app`
2. Test login functionality
3. Test all admin features
4. Verify database connectivity (once backend is added)

### **Step 8: Ongoing Development Workflow**

#### **8.1 Development Process**
```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# 4. Netlify automatically deploys
# 5. Test production deployment
```

#### **8.2 Environment Management**
- **Local Development**: `npm run dev`
- **Production**: Netlify handles automatically
- **Environment Variables**: Managed in Netlify dashboard
- **Database**: PostgreSQL managed by Supabase

### **Step 9: Monitoring and Maintenance**

#### **9.1 Netlify Dashboard Features**
- **Analytics**: Site traffic and performance metrics
- **Logs**: Build and function logs
- **Deployments**: Deployment history and rollback
- **Functions**: Serverless function management
- **Forms**: Form submission handling

#### **9.2 Cost Monitoring**
- Monitor usage in Netlify dashboard
- Free tier: 100GB bandwidth, 300 build minutes
- Upgrade to paid plan when needed

### **Troubleshooting Common Issues**

#### **Issue 1: Build Failures**
```bash
# Check build logs in Netlify dashboard
# Common fixes:
- Update package.json dependencies
- Check for TypeScript errors
- Verify environment variables
- Check Node.js version compatibility
```

#### **Issue 2: Database Connection Issues**
```bash
# Verify DATABASE_URL in Netlify variables
# Check Supabase project status
# Ensure database is accessible from Netlify
```

#### **Issue 3: Authentication Issues**
```bash
# Verify NEXTAUTH_URL matches your domain
# Check NEXTAUTH_SECRET is set
# Ensure cookies are working in production
# Check SameSite cookie settings for HTTPS
```

### **Next Steps After Deployment**

1. **✅ Frontend deployed and accessible**
2. **🔄 Add backend API routes** (Next.js API routes)
3. **🔄 Connect to PostgreSQL database**
4. **🔄 Implement data persistence**
5. **🔄 Add real-time features**
6. **🔄 Set up monitoring and alerts**

---

**Next Priority:** Backend development with Node.js and Supabase database implementation