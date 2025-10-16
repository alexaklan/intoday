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

**Next Priority:** Deploy to Railway for production hosting and backend development

---

## 🚀 **Deployment Guide: Git + Railway Setup**

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
git remote add origin https://github.com/YOUR_USERNAME/intoday.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 2: Railway Account Setup**

#### **2.1 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub account
4. Complete account setup

#### **2.2 Railway Dashboard Overview**
- **Projects**: Your applications
- **Databases**: PostgreSQL instances
- **Domains**: Custom domain management
- **Settings**: Environment variables and config

### **Step 3: Deploy Frontend to Railway**

#### **3.1 Create New Project**
1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `intoday` repository
4. Railway will auto-detect it's a Next.js project

#### **3.2 Configure Deployment**
Railway will automatically:
- ✅ Detect Next.js framework
- ✅ Install dependencies (`npm install`)
- ✅ Build the application (`npm run build`)
- ✅ Start the server (`npm start`)

#### **3.3 Set Environment Variables**
In Railway dashboard → Your project → **Variables** tab:
```bash
# Add these environment variables:
NODE_ENV=production
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-app-name.railway.app
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run this command to generate a secure secret
openssl rand -base64 32
```

### **Step 4: Add PostgreSQL Database**

#### **4.1 Create Database**
1. In your Railway project dashboard
2. Click **"New"** → **"Database"** → **"PostgreSQL"**
3. Railway will provision a PostgreSQL database
4. Note the connection details (you'll need these later)

#### **4.2 Database Connection Details**
Railway will provide:
- **Host**: `containers-us-west-xxx.railway.app`
- **Port**: `5432`
- **Database**: `railway`
- **Username**: `postgres`
- **Password**: `auto-generated`
- **Connection URL**: `postgresql://postgres:password@host:port/railway`

### **Step 5: Configure Custom Domain (Optional)**

#### **5.1 Add Custom Domain**
1. In Railway project → **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `intoday.yourdomain.com`)
4. Follow DNS configuration instructions

#### **5.2 DNS Configuration**
Add these DNS records to your domain provider:
```
Type: CNAME
Name: intoday (or subdomain of choice)
Value: your-app-name.railway.app
```

### **Step 6: Environment Configuration**

#### **6.1 Update Environment Variables**
Add database connection to Railway variables:
```bash
# Add to Railway environment variables:
DATABASE_URL=postgresql://postgres:password@host:port/railway
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
Railway automatically deploys when you push to GitHub:
```bash
# Make a small change and push
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

#### **7.2 Monitor Deployment**
1. Go to Railway dashboard → Your project
2. Click **"Deployments"** tab
3. Watch the build logs in real-time
4. Deployment typically takes 2-5 minutes

#### **7.3 Test Production Application**
1. Visit your Railway URL: `https://your-app-name.railway.app`
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

# 4. Railway automatically deploys
# 5. Test production deployment
```

#### **8.2 Environment Management**
- **Local Development**: `npm run dev`
- **Production**: Railway handles automatically
- **Environment Variables**: Managed in Railway dashboard
- **Database**: PostgreSQL managed by Railway

### **Step 9: Monitoring and Maintenance**

#### **9.1 Railway Dashboard Features**
- **Metrics**: CPU, RAM, and bandwidth usage
- **Logs**: Real-time application logs
- **Deployments**: Deployment history and rollback
- **Settings**: Environment variables and configuration

#### **9.2 Cost Monitoring**
- Monitor usage in Railway dashboard
- $5 monthly credit should last months
- Upgrade to paid plan when needed

### **Troubleshooting Common Issues**

#### **Issue 1: Build Failures**
```bash
# Check build logs in Railway dashboard
# Common fixes:
- Update package.json dependencies
- Check for TypeScript errors
- Verify environment variables
```

#### **Issue 2: Database Connection Issues**
```bash
# Verify DATABASE_URL in Railway variables
# Check PostgreSQL service status
# Ensure database is provisioned
```

#### **Issue 3: Authentication Issues**
```bash
# Verify NEXTAUTH_URL matches your domain
# Check NEXTAUTH_SECRET is set
# Ensure cookies are working in production
```

### **Next Steps After Deployment**

1. **✅ Frontend deployed and accessible**
2. **🔄 Add backend API routes** (Next.js API routes)
3. **🔄 Connect to PostgreSQL database**
4. **🔄 Implement data persistence**
5. **🔄 Add real-time features**
6. **🔄 Set up monitoring and alerts**

---

**Next Priority:** Backend development with Node.js and database implementation