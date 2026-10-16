# Whispyr AI — Real Estate CRM

**Production:** [https://crm-pro-pa87.vercel.app/](https://crm-pro-pa87.vercel.app/)

**Demo:** [View Demo on Google Drive](https://drive.google.com/drive/folders/1hT8UUh7p3Ictt9-_wxOEOh8pbYZqEsMb?usp=sharing)

## Overview

**Whispyr AI** is a full-stack real estate CRM built with **Next.js**, featuring role-based access control, lead and activity management, automated follow-ups and reminders, and AI-powered lead insights.

---

## Features

- **Lead management:** Organize real estate leads and track their stages through the pipeline.
- **Activity tracking:** Maintain lead activity logs to record interactions and progress.
- **Dashboard:** Monitor key CRM metrics, lead distribution, conversion rates, and agent performance through interactive charts.
- **AI-powered lead analysis:** Generate contextual lead insights using the **Vercel AI SDK** and **Vercel AI Gateway**, with prompt engineering and **Zod** schema validation for structured outputs.
- **Role-based access control:** Support admin, manager, and agent roles with permissions enforced on the backend.
- **Authentication and invitations:** Use **Supabase Auth** and magic-link invitations sent through **Resend**.
- **Automated reminders and notifications:** Use **QStash** serverless jobs to schedule follow-up tasks and notifications.
- **Data fetching and mutations:** Use **TanStack Query** for client-side data fetching, caching, and mutations.
- **Reusable dashboard UI:** Build consistent interfaces with **shadcn/ui** and **Tailwind CSS**, including charts, dialogs, sidebars, and data tables.
- **Validated API data:** Use **TypeScript** and **Zod** schemas to define data structures and validate API requests and responses.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | **Next.js App Router**, **React** |
| Language | **TypeScript** |
| Styling and UI | **Tailwind CSS**, **shadcn/ui** |
| Data fetching | **TanStack Query** |
| Database ORM | **Prisma** |
| Authentication | **Supabase Auth** |
| Validation | **Zod** |
| Charts | **Recharts** |
| AI integration | **Vercel AI SDK**, **Vercel AI Gateway** |
| Background jobs | **QStash** |
| Email delivery | **Resend** |
| Caching / data services | **Redis** |

---

## Architecture

The project uses a **feature-based service-layer architecture** to keep application logic organized and maintainable. Features separate their schemas, services, database logic, and exports.

A typical feature is organized around:

- **Schemas:** TypeScript types and Zod schemas for data structures and validation.
- **Services:** Feature-specific application and API operations.
- **Database logic:** Prisma queries and persistence operations.
- **Index files:** Centralized exports for cleaner imports.
- **Helpers:** Reusable utility functions for common feature-specific operations.

For example, the reminder service is organized as follows:

```text
src/services/reminder/
├── index.ts      # Centralized exports
├── schema.ts     # TypeScript types and Zod validation schemas
├── db.ts         # Database queries and persistence using Prisma
├── service.ts    # Reminder business logic and operations
└── helpers.ts    # Shared reminder utility functions
```

This structure separates validation, database access, business logic, and reusable utilities into focused modules, making the codebase easier to maintain and extend.

**Next.js App Router** handles application routing, protected pages, and API routes. **TanStack Query** manages client-side server-state operations, while **Prisma** handles database queries and persistence. Authentication and role-based permissions restrict access according to the user's role.

---

## Dashboard

The dashboard displays key CRM metrics using **shadcn/ui** cards and **Recharts** visualizations.

- **KPI cards:** Total leads, new leads this week, conversion rate, and overdue reminders.
- **Leads by Stage:** A bar chart built with Recharts `BarChart`.
- **Leads by Status:** A donut chart built with Recharts `PieChart`.
- **Top Performing Agents:** The top five agents by won leads, visible to managers and admins only.

---

## AI Lead Analysis

The AI lead-analysis feature uses the **Vercel AI SDK** and **Vercel AI Gateway** to generate insights from available lead context.

- **Prompt engineering:** Carefully designed prompts provide relevant lead context, including profile details, stage, status, recent activities, notes, and pending reminders, to generate focused, actionable insights. Call follow-ups also incorporate call outcomes and agent notes.
- **Schema definition:** TypeScript types and Zod schemas define and validate structured AI outputs, including lead summaries, key facts, risks, recommended next actions, follow-up questions, call scripts, objection handlers, and suggested reminders.

This combination helps keep AI responses aligned with the application's expected data format and makes the generated insights easier to use within the CRM.

---

## Role-Based Access Control

The CRM uses role-based permissions to control access to leads, reminders, dashboard data, and administrative operations. **Permissions are enforced on the backend**, preventing users from performing actions outside their assigned role, even if they attempt to bypass the frontend.

| Role | Permissions |
|---|---|
| **Agent** | Work with assigned leads, view their own pipeline and reminders, update lead progress, add activities, create reminders for accessible leads, and export assigned leads. Cannot create or reassign leads or edit lead contact details. |
| **Manager** | View all leads and team-wide dashboard data, create and update leads, reassign leads to active agents, view team reminders, and export all leads. Cannot manage users or import leads. |
| **Admin** | Has all manager permissions, plus user management and lead import. Can create, update, deactivate, and reactivate users, and resend invitations. |

Backend permission checks help ensure that access restrictions are applied to API operations and data, rather than relying solely on hiding or disabling frontend controls.

---

## Background Jobs and Invitations

- **Invitations:** Supabase Auth magic-link invitations are delivered through Resend.
- **Reminders and notifications:** QStash schedules serverless jobs for follow-up workflows, with Redis helping prevent duplicate reminders and manage caching where needed.

---

## Folder Structure

```text
crm-pro/
├── .vscode/
├── prisma/
│   ├── migrations/
│   └── seed/
├── public/
└── src/
    ├── app/
    │   ├── (protected)/
    │   │   ├── admin/
    │   │   │   ├── export/
    │   │   │   ├── import/
    │   │   │   └── users/
    │   │   ├── dashboard/
    │   │   ├── leads/
    │   │   │   └── [id]/
    │   │   └── reminders/
    │   ├── api/
    │   │   ├── admin/
    │   │   │   ├── import/
    │   │   │   └── users/
    │   │   │       └── [id]/
    │   │   │           ├── deactivate/
    │   │   │           ├── reactivate/
    │   │   │           └── resend-invite/
    │   │   ├── ai/
    │   │   │   ├── call-followup/
    │   │   │   └── lead-brief/
    │   │   │       └── save/
    │   │   ├── dashboard/
    │   │   ├── leads/
    │   │   │   ├── [id]/
    │   │   │   │   ├── activities/
    │   │   │   │   │   ├── call-attempt/
    │   │   │   │   │   └── note/
    │   │   │   ├── attachments/
    │   │   │   │   └── [attachmentId]/
    │   │   │   ├── lead-brief/
    │   │   │   └── reminders/
    │   │   ├── export/
    │   │   └── reassign/
    │   ├── notifications/
    │   │   └── [id]/
    │   │       └── read/
    │   ├── reminders/
    │   │   └── [id]/
    │   └── upstash/
    │       └── reminder-due/
    │   ├── auth/
    │   │   └── callback/
    │   └── login/
    ├── components/
    │   ├── admin/
    │   ├── dashboard/
    │   ├── leads/
    │   │   └── lead-details/
    │   ├── reminders/
    │   └── ui/
    ├── hooks/
    ├── lib/
    │   ├── supabase/
    │   └── tanstack/
    ├── providers/
    ├── services/
    │   ├── activity/
    │   ├── admin/
    │   ├── ai/
    │   ├── attachments/
    │   ├── dashboard/
    │   ├── import-export/
    │   ├── lead/
    │   ├── notification/
    │   └── reminder/
    │       ├── index.ts
    │       ├── schema.ts
    │       ├── db.ts
    │       ├── service.ts
    │       └── helpers.ts
    └── utils/
        └── types/
```
