import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { initialDatabase } from './src/data/seedData';
import { DatabaseSchema, ConsultationRequest, ContactMessage, AuditLog } from './src/types';

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database file if missing
function initDb(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), 'utf-8');
    return initialDatabase;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading database file, resetting to initial seed:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), 'utf-8');
    return initialDatabase;
  }
}

let dbCache: DatabaseSchema = initDb();

function getDb(): DatabaseSchema {
  return dbCache;
}

function saveDb(data: DatabaseSchema): void {
  dbCache = data;
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

function recordAudit(userName: string, userRole: string, action: string, entity: string, entityId: string, details: string) {
  const currentDb = getDb();
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userName: userName || 'Admin User',
    userRole: userRole || 'Super Admin',
    action,
    entity,
    entityId,
    details,
    timestamp: new Date().toISOString()
  };
  currentDb.auditLogs = [log, ...(currentDb.auditLogs || [])].slice(0, 100);
  saveDb(currentDb);
}

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ------------------------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------------------------

// Combined bootstrap public data endpoint
app.get('/api/public-data', (_req: Request, res: Response) => {
  const db = getDb();
  res.json({
    companySettings: db.companySettings,
    homepageConfig: db.homepageConfig,
    financingContent: db.financingContent,
    projects: db.projects.filter(p => p.published),
    services: db.services.filter(s => s.published),
    testimonials: db.testimonials.filter(t => t.published),
    faqs: db.faqs.filter(f => f.published),
    serviceAreas: db.serviceAreas.filter(a => a.published),
    processSteps: db.processSteps.filter(p => p.published),
    teamMembers: db.teamMembers.filter(t => t.published)
  });
});

// PROJECTS
app.get('/api/projects', (req: Request, res: Response) => {
  const db = getDb();
  const includeUnpublished = req.query.all === 'true';
  const projects = includeUnpublished ? db.projects : db.projects.filter(p => p.published);
  res.json(projects);
});

app.get('/api/projects/:slug', (req: Request, res: Response) => {
  const db = getDb();
  const project = db.projects.find(p => p.slug === req.params.slug || p.id === req.params.slug);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  const relatedProjects = db.projects
    .filter(p => p.id !== project.id && (p.category === project.category || p.published))
    .slice(0, 3);
  res.json({ project, relatedProjects });
});

app.post('/api/projects', (req: Request, res: Response) => {
  const db = getDb();
  const newProj = {
    ...req.body,
    id: `proj-${Date.now()}`,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.projects.push(newProj);
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Created Project', 'projects', newProj.id, `Created ${newProj.title}`);
  res.status(201).json(newProj);
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const db = getDb();
  const index = db.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  db.projects[index] = {
    ...db.projects[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Updated Project', 'projects', req.params.id, `Updated ${db.projects[index].title}`);
  res.json(db.projects[index]);
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const db = getDb();
  const target = db.projects.find(p => p.id === req.params.id);
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  saveDb(db);
  if (target) {
    recordAudit((req.query.adminName as string), (req.query.adminRole as string), 'Deleted Project', 'projects', req.params.id, `Deleted ${target.title}`);
  }
  res.json({ success: true });
});

// SERVICES
app.get('/api/services', (_req: Request, res: Response) => {
  const db = getDb();
  res.json(db.services);
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const db = getDb();
  const service = db.services.find(s => s.slug === req.params.slug || s.id === req.params.slug);
  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  const relatedProjects = db.projects.filter(p => p.category.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]) || p.published).slice(0, 3);
  res.json({ service, relatedProjects });
});

app.post('/api/services', (req: Request, res: Response) => {
  const db = getDb();
  const newService = {
    ...req.body,
    id: `srv-${Date.now()}`,
    slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.services.push(newService);
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Created Service', 'services', newService.id, `Created service ${newService.name}`);
  res.status(201).json(newService);
});

app.put('/api/services/:id', (req: Request, res: Response) => {
  const db = getDb();
  const index = db.services.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  db.services[index] = {
    ...db.services[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Updated Service', 'services', req.params.id, `Updated service ${db.services[index].name}`);
  res.json(db.services[index]);
});

app.delete('/api/services/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.services = db.services.filter(s => s.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// TESTIMONIALS
app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json(getDb().testimonials);
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const db = getDb();
  const item = {
    ...req.body,
    id: `t-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.testimonials.push(item);
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Added Testimonial', 'testimonials', item.id, `Review by ${item.name}`);
  res.status(201).json(item);
});

app.put('/api/testimonials/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.testimonials.findIndex(t => t.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Testimonial not found' });
    return;
  }
  db.testimonials[idx] = { ...db.testimonials[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json(db.testimonials[idx]);
});

app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// FAQS
app.get('/api/faqs', (_req: Request, res: Response) => {
  res.json(getDb().faqs);
});

app.post('/api/faqs', (req: Request, res: Response) => {
  const db = getDb();
  const item = {
    ...req.body,
    id: `faq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.faqs.push(item);
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Created FAQ', 'faqs', item.id, item.question);
  res.status(201).json(item);
});

app.put('/api/faqs/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.faqs.findIndex(f => f.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'FAQ not found' });
    return;
  }
  db.faqs[idx] = { ...db.faqs[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json(db.faqs[idx]);
});

app.delete('/api/faqs/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.faqs = db.faqs.filter(f => f.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// SERVICE AREAS
app.get('/api/service-areas', (_req: Request, res: Response) => {
  res.json(getDb().serviceAreas);
});

app.post('/api/service-areas', (req: Request, res: Response) => {
  const db = getDb();
  const item = {
    ...req.body,
    id: `area-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.serviceAreas.push(item);
  saveDb(db);
  res.status(201).json(item);
});

app.put('/api/service-areas/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.serviceAreas.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  db.serviceAreas[idx] = { ...db.serviceAreas[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json(db.serviceAreas[idx]);
});

app.delete('/api/service-areas/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.serviceAreas = db.serviceAreas.filter(a => a.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// PROCESS STEPS
app.get('/api/process-steps', (_req: Request, res: Response) => {
  res.json(getDb().processSteps);
});

app.put('/api/process-steps/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.processSteps.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  db.processSteps[idx] = { ...db.processSteps[idx], ...req.body };
  saveDb(db);
  res.json(db.processSteps[idx]);
});

// TEAM MEMBERS
app.get('/api/team-members', (_req: Request, res: Response) => {
  res.json(getDb().teamMembers);
});

app.put('/api/team-members/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.teamMembers.findIndex(m => m.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  db.teamMembers[idx] = { ...db.teamMembers[idx], ...req.body };
  saveDb(db);
  res.json(db.teamMembers[idx]);
});

// COMPANY SETTINGS & HOMEPAGE CONFIG
app.get('/api/company-settings', (_req: Request, res: Response) => {
  res.json(getDb().companySettings);
});

app.put('/api/company-settings', (req: Request, res: Response) => {
  const db = getDb();
  db.companySettings = {
    ...db.companySettings,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Updated Company Settings', 'companySettings', 'company-singleton', 'Updated business profile & contact');
  res.json(db.companySettings);
});

app.get('/api/homepage-config', (_req: Request, res: Response) => {
  res.json(getDb().homepageConfig);
});

app.put('/api/homepage-config', (req: Request, res: Response) => {
  const db = getDb();
  db.homepageConfig = {
    ...db.homepageConfig,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Updated Homepage Content', 'homepageConfig', 'homepage-singleton', 'Updated hero or why section');
  res.json(db.homepageConfig);
});

// FINANCING CONTENT
app.get('/api/financing-content', (_req: Request, res: Response) => {
  res.json(getDb().financingContent);
});

app.put('/api/financing-content', (req: Request, res: Response) => {
  const db = getDb();
  db.financingContent = {
    ...db.financingContent,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Updated Financing Content', 'financingContent', 'financing-singleton', 'Updated financing terms');
  res.json(db.financingContent);
});

// CONSULTATION REQUESTS (LEADS)
app.post('/api/consultation-requests', (req: Request, res: Response) => {
  // Anti-spam Honeypot Check
  if (req.body.hp_website) {
    res.status(200).json({ success: true });
    return;
  }

  const {
    fullName,
    email,
    phone,
    zipCode,
    projectType,
    propertyType,
    estimatedBudget,
    preferredTimeline,
    projectDetails,
    address,
    preferredContactMethod
  } = req.body;

  if (!fullName || !email || !phone || !zipCode || !projectType || !propertyType || !estimatedBudget || !preferredTimeline || !projectDetails) {
    res.status(400).json({ error: 'Please fill in all required project fields.' });
    return;
  }

  const db = getDb();
  const newLead: ConsultationRequest = {
    id: `lead-${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    zipCode: zipCode.trim(),
    address: address?.trim() || '',
    projectType,
    propertyType,
    estimatedBudget,
    preferredTimeline,
    projectDetails: projectDetails.trim(),
    preferredContactMethod: preferredContactMethod || 'email',
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.consultationRequests = [newLead, ...(db.consultationRequests || [])];
  saveDb(db);
  res.status(201).json({ success: true, lead: newLead });
});

app.get('/api/consultation-requests', (_req: Request, res: Response) => {
  res.json(getDb().consultationRequests || []);
});

app.patch('/api/consultation-requests/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.consultationRequests.findIndex(l => l.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Lead not found' });
    return;
  }
  const oldStatus = db.consultationRequests[idx].status;
  db.consultationRequests[idx] = {
    ...db.consultationRequests[idx],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  if (req.body.status && req.body.status !== oldStatus) {
    recordAudit(req.body._adminName, req.body._adminRole, 'Changed Lead Status', 'consultationRequests', req.params.id, `Status from ${oldStatus} to ${req.body.status}`);
  }
  res.json(db.consultationRequests[idx]);
});

app.delete('/api/consultation-requests/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.consultationRequests = db.consultationRequests.filter(l => l.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// CONTACT MESSAGES
app.post('/api/contact-messages', (req: Request, res: Response) => {
  if (req.body.hp_website) {
    res.status(200).json({ success: true });
    return;
  }
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Please provide name, email, and message.' });
    return;
  }
  const db = getDb();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    message: message.trim(),
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.contactMessages = [newMsg, ...(db.contactMessages || [])];
  saveDb(db);
  res.status(201).json({ success: true, message: newMsg });
});

app.get('/api/contact-messages', (_req: Request, res: Response) => {
  res.json(getDb().contactMessages || []);
});

app.patch('/api/contact-messages/:id', (req: Request, res: Response) => {
  const db = getDb();
  const idx = db.contactMessages.findIndex(m => m.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  db.contactMessages[idx] = {
    ...db.contactMessages[idx],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  res.json(db.contactMessages[idx]);
});

app.delete('/api/contact-messages/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.contactMessages = db.contactMessages.filter(m => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// MEDIA LIBRARY
app.get('/api/media', (_req: Request, res: Response) => {
  res.json(getDb().mediaItems || []);
});

app.post('/api/media', (req: Request, res: Response) => {
  const { name, url, category } = req.body;
  if (!name || !url) {
    res.status(400).json({ error: 'Media name and URL are required' });
    return;
  }
  const db = getDb();
  const newMedia = {
    id: `med-${Date.now()}`,
    name,
    url,
    category: category || 'projects',
    createdAt: new Date().toISOString()
  };
  db.mediaItems = [newMedia, ...(db.mediaItems || [])];
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Uploaded Media', 'media', newMedia.id, name);
  res.status(201).json(newMedia);
});

app.delete('/api/media/:id', (req: Request, res: Response) => {
  const db = getDb();
  db.mediaItems = db.mediaItems.filter(m => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// AUDIT LOGS
app.get('/api/audit-logs', (_req: Request, res: Response) => {
  res.json(getDb().auditLogs || []);
});

// ADMIN AUTH & USERS
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.adminUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
  
  // For demo/development, any password of at least 6 characters or "admin123" logs in
  if (user && password && password.length >= 6) {
    user.lastLogin = new Date().toISOString();
    saveDb(db);
    recordAudit(user.name, user.role, 'Admin Login', 'adminUsers', user.id, `User logged in from ${req.ip || 'remote'}`);
    res.json({
      success: true,
      user,
      token: `token-${user.id}-${Date.now()}`
    });
    return;
  }
  
  // If user doesn't exist yet but email is admin@banlgarghor.com, allow login as default Super Admin
  if (email === 'admin@banlgarghor.com' || email === 'admin@example.com') {
    const defaultUser = db.adminUsers[0];
    defaultUser.lastLogin = new Date().toISOString();
    saveDb(db);
    res.json({
      success: true,
      user: defaultUser,
      token: `token-${defaultUser.id}-${Date.now()}`
    });
    return;
  }

  res.status(401).json({ error: 'Invalid email or password. Use admin@banlgarghor.com (pass: admin123)' });
});

app.get('/api/admin/users', (_req: Request, res: Response) => {
  res.json(getDb().adminUsers);
});

app.post('/api/admin/users', (req: Request, res: Response) => {
  const db = getDb();
  const newUser = {
    ...req.body,
    id: `usr-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isActive: true
  };
  db.adminUsers.push(newUser);
  saveDb(db);
  recordAudit(req.body._adminName, req.body._adminRole, 'Created Admin User', 'adminUsers', newUser.id, `Added user ${newUser.name}`);
  res.status(201).json(newUser);
});

// ------------------------------------------------------------------------------
// DEV / PROD SERVER MOUNT
// ------------------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Banlgar Ghor Remodeling] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
