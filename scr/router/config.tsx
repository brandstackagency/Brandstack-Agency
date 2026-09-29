import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const PricingPage = lazy(() => import('../pages/pricing/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const ProjectsPage = lazy(() => import('../pages/projects/page'));
const UploadPage = lazy(() => import('../pages/upload/page'));
const BookPage = lazy(() => import('../pages/book/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const BrandStackPage = lazy(() => import('../pages/brandstack/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const PortalLogin = lazy(() => import('../pages/portal/page'));
const PortalEntry = lazy(() => import('../pages/portal/entry/page'));
const PortalDashboard = lazy(() => import('../pages/portal/dashboard/page'));
const PortalProjectDetail = lazy(() => import('../pages/portal/project/page'));
const PortalReports = lazy(() => import('../pages/portal/reports/page'));
const AdminPortalsPage = lazy(() => import('../pages/admin/portals/page'));

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/projects', element: <ProjectsPage /> },
  { path: '/upload', element: <UploadPage /> },
  { path: '/book', element: <BookPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/admin/portals', element: <AdminPortalsPage /> },
  { path: '/brandstack', element: <BrandStackPage /> },
  { path: '/portal', element: <PortalLogin /> },
  { path: '/portal/dashboard', element: <PortalDashboard /> },
  { path: '/portal/project/:id', element: <PortalProjectDetail /> },
  { path: '/portal/reports', element: <PortalReports /> },
  { path: '/portal/:slug', element: <PortalEntry /> },
  { path: '*', element: <NotFound /> },
];

export default routes;