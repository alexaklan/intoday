# intoday - Development Roadmap

## 🎯 **Current Status**
**Frontend application is complete and deployed to production at [https://intodayapp.netlify.app/](https://intodayapp.netlify.app/)**

**Database is set up with Supabase and ready for integration**

---

## ✅ **PHASE 1: COMPLETED - Frontend & Deployment**

### 🏗️ **Core Infrastructure**
- [x] Next.js 15 setup with TypeScript and App Router
- [x] Tailwind CSS + shadcn/ui component library
- [x] GSAP animations integration
- [x] Responsive design (mobile, tablet, desktop)
- [x] Custom intoday logo with Manrope font and toggle icon design
- [x] Production deployment to Netlify
- [x] GitHub repository setup and CI/CD

### 🔐 **Authentication System**
- [x] Complete authentication system with business rules
- [x] Protected routes with role-based access control
- [x] Session management with cookies
- [x] Role-based permissions enforcement (staff, org_admin, app_admin)
- [x] Login page with shadcn/ui design
- [x] AuthProvider context for state management
- [x] Production authentication with NEXTAUTH_SECRET

### 👥 **User Features**
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

### 🏢 **Organisation Admin Features**
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

### ⚡ **Super Admin Features**
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

### 🗄️ **Database Setup**
- [x] Supabase project creation and configuration
- [x] Database schema design (PostgreSQL)
- [x] Tables: organisations, users, teams, user_teams, schedules
- [x] Row Level Security (RLS) policies
- [x] Database indexes for performance
- [x] Sample data insertion
- [x] Database connection testing

### 📊 **Data & Structure**
- [x] TypeScript type definitions
- [x] Mock data implementation
- [x] Multi-team user support
- [x] Organisation structure
- [x] Role-based access (staff, org_admin, app_admin)
- [x] User, Team, and Organisation data models

### 🎨 **UI/UX Design**
- [x] Professional table layouts for data display
- [x] Clean inline forms for team and user creation
- [x] Improved navigation with role-specific menus
- [x] Better visual hierarchy and spacing
- [x] Consistent design language throughout
- [x] Responsive table designs with proper truncation

---

## 🔄 **PHASE 2: IN PROGRESS - Database Integration**

### 🗄️ **Database Connection**
- [x] Supabase client setup and configuration
- [x] Environment variables configuration
- [ ] **Connect authentication to real database** (replace mock data)
- [ ] **Connect user management to database**
- [ ] **Connect team management to database**
- [ ] **Connect schedule management to database**

### 🔐 **Authentication Enhancement**
- [ ] **Real password hashing and verification**
- [ ] **Database-backed user sessions**
- [ ] **Secure API endpoints for auth operations**
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication

### 📡 **API Development**
- [ ] **Schedule CRUD operations API**
- [ ] **User management APIs**
- [ ] **Team management APIs**
- [ ] **Organisation management APIs**
- [ ] **Real-time schedule updates**
- [ ] **Data validation and error handling**

---

## 📋 **PHASE 3: PENDING - Enhanced Features**

### 🔧 **Backend Development**
- [ ] REST API implementation
- [ ] GraphQL implementation (optional)
- [ ] Subdomain management system
- [ ] File upload handling
- [ ] Background job processing

### 📊 **Data Management**
- [ ] Real-time schedule updates
- [ ] Data validation
- [ ] Error handling
- [ ] Loading states
- [ ] Optimistic UI updates
- [ ] Data backup and recovery

### 🚀 **Enhanced Features**
- [ ] Export schedules (PDF, CSV, iCal)
- [ ] Email notifications for schedule changes
- [ ] Weekly digest emails
- [ ] Team capacity planning
- [ ] Office desk booking integration
- [ ] Recurring schedule patterns
- [ ] Bulk schedule updates
- [ ] User details modal/page for super admin

### 📈 **Analytics & Reporting**
- [ ] Detailed attendance analytics
- [ ] Team presence trends
- [ ] Office utilization reports
- [ ] Custom date range reports
- [ ] Export analytics data
- [ ] Visualizations (charts, graphs)

### 🛠️ **Admin Enhancements**
- [ ] Create/edit/delete organisations (super admin)
- [ ] Create/edit/delete teams (organisation admin)
- [ ] Invite users to organisation
- [ ] Remove users from organisation
- [ ] Bulk user imports (CSV)
- [ ] Audit logs
- [ ] System settings configuration
- [ ] Organisation settings management

---

## 📋 **PHASE 4: FUTURE - Advanced Features**

### 💰 **Subscription & Billing**
- [ ] Subscription plan management
- [ ] Billing dashboard
- [ ] Payment processing integration
- [ ] Usage tracking
- [ ] Plan upgrade/downgrade flows

### 🎨 **UX Improvements**
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Advanced search/filter functionality
- [ ] Quick actions menu
- [ ] Onboarding flow
- [ ] Help documentation
- [ ] Tooltips and hints
- [ ] Drag-and-drop scheduling

### ⚡ **Performance & Optimization**
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] Performance monitoring

### 🧪 **Testing & Quality**
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Accessibility audit
- [ ] Performance testing
- [ ] Security audit

### 🔧 **DevOps & Deployment**
- [ ] Advanced CI/CD pipeline
- [ ] Environment configuration
- [ ] Monitoring and logging
- [ ] Backup strategy
- [ ] SSL certificates
- [ ] Subdomain routing setup

### 📱 **Mobile**
- [ ] Progressive Web App (PWA)
- [ ] Mobile-specific optimizations
- [ ] Native mobile app (optional)

### 🔗 **Integrations**
- [ ] Microsoft Teams integration
- [ ] Slack integration
- [ ] Google Calendar sync
- [ ] Outlook Calendar sync
- [ ] SSO providers

---

## 🎯 **IMMEDIATE NEXT STEPS**

### **Priority 1: Database Integration (Current Focus)**
1. **Connect authentication to real database** - Replace mock auth with Supabase
2. **Connect user management** - Real CRUD operations for users
3. **Connect team management** - Real CRUD operations for teams
4. **Connect schedule management** - Real CRUD operations for schedules

### **Priority 2: API Development**
1. **Create API routes** for all CRUD operations
2. **Implement real-time updates** for schedule changes
3. **Add proper error handling** and validation
4. **Test all functionality** with real database

### **Priority 3: Enhanced Features**
1. **Export functionality** for schedules
2. **Email notifications** for schedule changes
3. **Advanced admin features** for super admin
4. **Performance optimization**

---

## 📝 **Notes**

This roadmap is a living document. Features are organized by development phases and can be reprioritized based on user feedback and business requirements.

**Current Focus:** Phase 2 - Database Integration and API Development

**Production URL:** [https://intodayapp.netlify.app/](https://intodayapp.netlify.app/)

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
NEXTAUTH_URL=https://intodayapp.netlify.app/
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
- **Project URL**: `https://xhwafzvkgcfnzlumaupa.supabase.co`
- **API Key (anon/public)**: Set in Netlify environment variables (NOT in code)
- **Service Role Key**: Set in Netlify environment variables (NOT in code) 
- **Database URL**: Set in Netlify environment variables (NOT in code)

**⚠️ SECURITY NOTE**: Never commit API keys to Git. Always use environment variables.

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