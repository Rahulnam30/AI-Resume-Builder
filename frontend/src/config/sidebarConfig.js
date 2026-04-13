import {
  LayoutDashboard,
  FileText,
  FileUser,
  FilePen,
  CheckCircle,
  Download,
  Bell,
} from 'lucide-react';

export const sidebarMenuItems = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/user/dashboard',
    order: 1,
  },
  {
    id: 'resume',
    icon: FileText,
    label: 'AI Resume Builder',
    path: '/user/resume-builder',
    order: 2,
  },
  {
    id: 'cv',
    icon: FileUser,
    label: 'CV',
    path: '/user/cv',
    order: 3,
  },
  {
    id: 'coverletter',
    icon: FilePen,
    label: 'Cover Letter',
    path: '/user/cover-letter',
    order: 4,
  },
  {
    id: 'ats',
    icon: CheckCircle,
    label: 'ATS Score Checker',
    path: '/user/ats-checker',
    order: 5,
  },
  {
    id: 'downloads',
    icon: Download,
    label: 'Downloads',
    path: '/user/downloads',
    order: 6,
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    path: '/user/notifications',
    order: 7,
    badge: true, // Will be populated dynamically
  },
];

export const sidebarConfig = {
  defaultCollapsed: true,
  mobileBreakpoint: 768,
  animationDuration: 300,
  tooltipDelay: 300,
  collapsedWidth: 80,
  expandedWidth: 256,
};
