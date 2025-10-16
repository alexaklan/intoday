# Workday - Office Attendance Planner

A modern web application for managing office and remote working schedules.

## Overview

Workday helps teams coordinate office and remote work schedules. Staff members can set their weekly availability, view teammate schedules, and admins can manage teams and organisations.

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- GSAP (animations)
- date-fns (date utilities)

**Backend** _(planned)_
- Node.js
- PostgreSQL/MongoDB
- REST API or GraphQL

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
workday.io/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin panel
│   ├── settings/       # User settings
│   ├── page.tsx        # Home page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
├── lib/               # Utilities and types
│   ├── types.ts       # TypeScript definitions
│   ├── mock-data.ts   # Development data
│   └── utils.ts       # Helper functions
└── public/            # Static assets
```

## Configuration

### Mock Data

Currently using mock data from `lib/mock-data.ts`. Switch users by changing the `currentUser` export:

```typescript
export const currentUser: User = users[0]; // Change index
```

### Environment Variables

```env
# Coming soon with authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Features

### User Roles

- **Staff**: Manage own schedule, view team schedules
- **Organisation Admin**: Manage teams, users, and schedules for their organisation
- **App Admin**: Full system access

### Current Capabilities

- Weekly schedule management (Mon-Fri)
- Office/Home day selection
- Multi-team membership
- Team schedule visibility
- Admin panel (organisations, teams, users)
- Account settings

See [ROADMAP.md](./ROADMAP.md) for complete feature list and development plan.

## Development

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- British English spelling (e.g., "Organisation")
- Functional components with hooks

### Testing

```bash
# Unit tests (coming soon)
npm test

# E2E tests (coming soon)
npm run test:e2e
```

### Deployment

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

## Documentation

- [Roadmap](./ROADMAP.md) - Feature tracking and development plan
- [API Docs](./docs/api.md) _(coming soon)_
- [Component Guide](./docs/components.md) _(coming soon)_

## License

MIT

---

**Status**: Development (Mock Data)  
**Next Milestone**: Authentication Integration
