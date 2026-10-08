export type UserRole = 
  | 'Super Admin' 
  | 'Content Manager' 
  | 'Project Manager' 
  | 'Sales' 
  | 'Editor' 
  | 'Viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface CompanySettings {
  id: string;
  name: string;
  tagline: string;
  positioning: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  licenseInfo: string;
  insuranceInfo: string;
  socials: {
    instagram: string;
    houzz: string;
    architecturalDigest: string;
    pinterest: string;
    facebook?: string;
  };
  serviceAreasSummary: string;
  footerDescription: string;
  copyrightText: string;
  updatedAt: string;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  imageType: 'hero' | 'gallery' | 'before' | 'after' | 'detail';
  caption: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  neighborhood: string;
  category: 'Kitchen Remodeling' | 'Bathroom Remodeling' | 'Basement Finishing' | 'Whole-Home Renovation' | 'Home Addition' | 'Custom Renovation';
  shortDescription: string;
  fullDescription: string;
  designApproach: string;
  materials: string[];
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  propertyType: string;
  yearCompleted: number;
  heroImage: string;
  beforeImage?: string;
  afterImage?: string;
  galleryImages: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  heroImage: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  typicalScope: string[];
  materials: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  fullReview?: string;
  imageUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing' | 'Design' | 'Construction' | 'Timeline' | 'Financing';
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  popularProjects: string[];
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  imageUrl?: string;
  sortOrder: number;
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  credentials: string;
  sortOrder: number;
  published: boolean;
}

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Consultation Scheduled'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost'
  | 'Archived';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  address?: string;
  projectType: string;
  propertyType: string;
  estimatedBudget: string;
  preferredTimeline: string;
  projectDetails: string;
  preferredContactMethod: 'phone' | 'email' | 'text';
  status: LeadStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageStatus = 'New' | 'Read' | 'Responded' | 'Archived';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: MessageStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'projects' | 'services' | 'pages' | 'team' | 'site';
  sizeBytes?: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export interface HomepageConfig {
  heroEyebrow: string;
  heroHeading: string;
  heroSupportingText: string;
  heroImage: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  introHeading: string;
  introText: string;
  whyHeading: string;
  whyDescription: string;
  whyPoints: { title: string; description: string }[];
  finalCtaHeading: string;
  finalCtaText: string;
  finalCtaButtonText: string;
  updatedAt: string;
}

export interface FinancingContent {
  headline: string;
  subheadline: string;
  introParagraph: string;
  disclaimer: string;
  features: { title: string; description: string }[];
  steps: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  updatedAt: string;
}

export interface DatabaseSchema {
  companySettings: CompanySettings;
  homepageConfig: HomepageConfig;
  financingContent: FinancingContent;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  serviceAreas: ServiceArea[];
  processSteps: ProcessStep[];
  teamMembers: TeamMember[];
  consultationRequests: ConsultationRequest[];
  contactMessages: ContactMessage[];
  mediaItems: MediaItem[];
  adminUsers: AdminUser[];
  auditLogs: AuditLog[];
}
