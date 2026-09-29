# Brandstack Client Portal

## 1. Project Description
A private, multi-tenant **Client Portal** where each Brandstack client gets their own dedicated workspace. Clients log in to see real-time project status (working on, pending, upcoming, concluded), leave comments, and receive progress reports. The agency can easily create/manage client portals, update project statuses, and generate reports without any coding.

## 2. Page Structure
- `/portal` - Client Portal Login (public)
- `/portal/dashboard` - Client Dashboard (authenticated)
- `/portal/project/:id` - Project Detail with Comments (authenticated)
- `/portal/reports` - Client Reports (authenticated)
- `/admin/portals` - Admin Portal Manager (admin PIN protected)

## 3. Core Features
- [ ] Supabase Auth for client login (email/password)
- [ ] Multi-tenant isolation: each client sees only their own brand
- [ ] Project status dashboard (Working On / Pending / Upcoming / Concluded)
- [ ] Inline project cards with folder-card design language
- [ ] Comment threads on each project (client + admin)
- [ ] Admin interface to create/manage client portals
- [ ] Admin interface to add/edit projects within portals
- [ ] Report generation with export
- [ ] Responsive with same dark/purple aesthetic

## 4. Data Model Design

### Table: client_portals
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Supabase auth user id |
| client_name | text | Client company name |
| brand_name | text | Brand name |
| slug | text | URL-friendly identifier |
| description | text | Portal overview |
| logo_url | text | Optional brand logo |
| status | text | active / archived |
| created_at | timestamptz | Auto |
| updated_at | timestamptz | Auto |

### Table: portal_projects
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| portal_id | uuid | FK to client_portals |
| title | text | Project name |
| description | text | Project details |
| status | text | working_on / pending / upcoming / concluded |
| priority | text | low / medium / high / urgent |
| category | text | branding / marketing / web / strategy / other |
| start_date | date | Planned start |
| end_date | date | Target completion |
| deliverables | jsonb | List of deliverable items |
| notes | text | Internal notes |
| progress | int | 0-100 percent |
| created_at | timestamptz | Auto |
| updated_at | timestamptz | Auto |

### Table: portal_comments
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| project_id | uuid | FK to portal_projects |
| portal_id | uuid | FK to client_portals |
| author_name | text | Display name |
| author_email | text | Email identifier |
| content | text | Comment body |
| is_admin | boolean | True if from agency side |
| created_at | timestamptz | Auto |

## 5. Backend / Third-party Integration Plan
- **Supabase**: Auth (email/password), Database (tables above with RLS), Edge Functions for admin operations
- **No Shopify/Stripe** needed for this feature

## 6. Development Phase Plan

### Phase 1: Database + Auth Foundation
- Goal: Create tables with RLS, set up Supabase client, build login page
- Deliverable: Database schema, Supabase client singleton, /portal login page, basic /portal/dashboard

### Phase 2: Dashboard + Project Cards
- Goal: Build the client dashboard with status columns, folder-card UI, project detail view
- Deliverable: Full dashboard with 4 status columns, project cards with comments section

### Phase 3: Admin Portal Manager
- Goal: Build admin interface to create portals, manage clients, add/edit projects
- Deliverable: /admin/portals page with CRUD for portals and projects

### Phase 4: Comments + Reporting
- Goal: Comment threads on projects, report generation UI
- Deliverable: Comments, report generation with download/export

### Phase 5: Polish + Navigation
- Goal: Add portal links to navbar, finalize UX, responsive polish
- Deliverable: Navbar portal entry, responsive fixes, final QA