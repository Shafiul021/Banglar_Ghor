import { DatabaseSchema } from '../types';

export const initialDatabase: DatabaseSchema = {
  companySettings: {
    id: 'company-singleton',
    name: 'Banlgar Ghor Remodeling',
    tagline: 'Spaces Designed for the Way You Live.',
    positioning: 'Thoughtful renovations. Exceptional craftsmanship. Homes designed around the way you live.',
    phone: '+1 (212) 555-0198',
    email: 'inquiries@banlgarghor.com',
    address: '450 Lexington Avenue, Suite 1400',
    city: 'New York',
    state: 'NY',
    zip: '10017',
    hours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: By Appointment',
    licenseInfo: 'NYC DCA Home Improvement Contractor License #2049182 | EPA Lead-Safe Certified Firm',
    insuranceInfo: '$5,000,000 Commercial General Liability & Full Worker’s Compensation Coverage',
    socials: {
      instagram: 'https://instagram.com/banlgarghorremodeling',
      houzz: 'https://houzz.com/pro/banlgarghorremodeling',
      architecturalDigest: 'https://architecturaldigest.com',
      pinterest: 'https://pinterest.com/banlgarghor',
      facebook: 'https://facebook.com/banlgarghor'
    },
    serviceAreasSummary: 'Manhattan, Brooklyn, Queens, Bronx, Staten Island & Westchester County',
    footerDescription: 'Banlgar Ghor Remodeling is a premier residential design and renovation studio crafting bespoke architectural residences across New York City and Westchester.',
    copyrightText: '© 2026 Banlgar Ghor Remodeling LLC. All rights reserved. Registered Home Improvement Contractor in New York State.',
    updatedAt: new Date().toISOString()
  },

  homepageConfig: {
    heroEyebrow: 'NEW YORK RESIDENTIAL REMODELING',
    heroHeading: 'Spaces Designed for the Way You Live.',
    heroSupportingText: 'Banlgar Ghor Remodeling transforms New York homes through thoughtful design, meticulous craftsmanship, and an architectural renovation process built around your vision.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    heroPrimaryCtaText: 'Request a Free Consultation',
    heroSecondaryCtaText: 'Explore Our Projects',
    introHeading: 'Thoughtful renovations. Exceptional craftsmanship.',
    introText: 'From landmark Brooklyn brownstones to pre-war Manhattan co-ops and Westchester estates, we unite architectural rigor with quiet luxury construction. We manage co-op boards, landmark preservation, DOB permitting, and custom fabrication under one unified atelier.',
    whyHeading: 'Why Banlgar Ghor',
    whyDescription: 'Renovating in New York demands unmatched precision, regulatory mastery, and absolute respect for your living environment.',
    whyPoints: [
      {
        title: 'Design-Focused Approach',
        description: 'Every line, millwork detail, and stone selection is harmonized before construction commences, avoiding costly on-site compromises.'
      },
      {
        title: 'Experienced Craftsmanship',
        description: 'Our in-house master carpenters, stonemasons, and licensed MEP teams uphold the highest standards of New York architectural finishes.'
      },
      {
        title: 'Transparent Communication',
        description: 'Weekly scheduled walkthroughs, milestone progress documentation, and fixed line-item pricing guarantee total clarity.'
      },
      {
        title: 'Detailed Project Planning',
        description: 'Comprehensive 3D BIM coordination, landmark approvals, and DOB expeditor filings eliminate scheduling friction.'
      },
      {
        title: 'Licensed & Fully Insured',
        description: 'Carrying $5M NYC umbrella liability and full statutory workers compensation to protect co-op and condo buildings seamlessly.'
      },
      {
        title: 'Quality Natural Materials',
        description: 'Direct relationships with Italian quarries, Belgian timber mills, and bespoke architectural hardware artisans.'
      }
    ],
    finalCtaHeading: 'Let’s Build a Home You’ll Love Coming Back To.',
    finalCtaText: 'Tell us what you’re envisioning, and let’s explore what’s possible for your New York residence.',
    finalCtaButtonText: 'Request a Free Consultation',
    updatedAt: new Date().toISOString()
  },

  financingContent: {
    headline: 'Structured Financing for Luxury Renovations',
    subheadline: 'Flexible, transparent funding solutions tailored to your project timeline and wealth management goals.',
    introParagraph: 'A major residential renovation is an investment in both your daily wellbeing and the enduring asset value of your New York property. Banlgar Ghor Remodeling partners with leading premier home improvement lending platforms and private banking relationships to offer unsecured and secured financing solutions with transparent milestone disbursements.',
    disclaimer: 'Financing solutions are subject to credit approval and underwriting criteria by third-party lending partners. Banlgar Ghor Remodeling is not a lender or financial advisor. APR rates, loan terms, and eligibility vary based on applicant financial profile and project scope.',
    features: [
      {
        title: 'Project Milestones Tied to Funding',
        description: 'Funds disbursed in sync with project stages—demolition, rough plumbing/electrical, millwork, and final punchlist.'
      },
      {
        title: 'Unsecured Loans up to $250,000',
        description: 'No home equity appraisal required, zero liens against your co-op shares or real estate title, and rapid 24-hour pre-qualification.'
      },
      {
        title: 'Fixed Interest Rates & Predictable Terms',
        description: 'Terms ranging from 3 to 12 years with competitive fixed APRs and no prepayment penalties.'
      },
      {
        title: 'Dedicated Banking Concierge',
        description: 'A personal lending advisor coordinates directly with our project management team to ensure zero construction delays.'
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Initial Project Scope & Estimate',
        description: 'During our consultation, we develop an architectural scope and preliminary line-item investment range.'
      },
      {
        step: 2,
        title: 'Soft Credit Pre-Qualification',
        description: 'Review personalized financing options without impacting your credit score through our secure partner portal.'
      },
      {
        step: 3,
        title: 'Direct Construction Draws',
        description: 'Approved loan proceeds align smoothly with Banlgar Ghor contract milestones as work progresses.'
      }
    ],
    faqs: [
      {
        question: 'Does applying for financing affect my credit score?',
        answer: 'Pre-qualification uses a soft credit check that does not impact your credit score. A hard inquiry only occurs if you accept an offer.'
      },
      {
        question: 'Can I finance a co-op or condo renovation in New York?',
        answer: 'Yes. Our lending partners specialize in unsecured home renovation loans that do not require building board approval or property liens.'
      },
      {
        question: 'Can I pay off my loan early?',
        answer: 'All loan options through our network feature zero prepayment penalties, allowing you to pay down principal anytime.'
      }
    ],
    updatedAt: new Date().toISOString()
  },

  projects: [
    {
      id: 'proj-1',
      title: 'Chelsea Modern Kitchen',
      slug: 'chelsea-modern-kitchen',
      location: 'Chelsea, Manhattan',
      neighborhood: 'Chelsea',
      category: 'Kitchen Remodeling',
      shortDescription: 'A refined kitchen renovation balancing warm rift-cut white oak, honed Calacatta marble, and integrated Gaggenau appliances in a classic Chelsea loft.',
      fullDescription: 'Set within an historic pre-war industrial loft in West Chelsea, this kitchen was completely reimagined to create an intuitive culinary centerpiece. The client, an avid home chef and collector of contemporary art, sought a composition that felt simultaneously sculptural and hardworking. We removed partition walls to double the natural light footprint, relocated the gas infrastructure, and framed a bespoke monolithic island in honed Calacatta Vagli marble. Concealed acoustic pocket doors hide the scullery pantry, while rift-cut white oak tall units integrate full-height refrigeration, wine preservation, and touch-to-open storage.',
      designApproach: 'Clean volumetric geometry with rich textural dialogue between warm wood grains, cold natural stone, and patinated unlacquered brass.',
      materials: [
        'Rift-cut white oak architectural cabinetry with fluted detailing',
        'Honed Calacatta Vagli Italian marble slab with bookmatched waterfall edges',
        'Waterworks Henry unlacquered brass gooseneck tapware',
        'Wide-plank 9-inch Belgian white oak flooring with ultra-matte hardwax finish',
        'Handmade Japanese ceramic tile backsplash in ivory glaze',
        'Gaggenau 400 Series induction cooktop and downdraft ventilation'
      ],
      budgetMin: 95000,
      budgetMax: 135000,
      timeline: '12 weeks',
      propertyType: 'Pre-war Loft Co-op',
      yearCompleted: 2025,
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: true,
      published: true,
      sortOrder: 1,
      createdAt: '2025-01-15T10:00:00Z',
      updatedAt: '2025-01-15T10:00:00Z'
    },
    {
      id: 'proj-2',
      title: 'Park Slope Brownstone Renovation',
      slug: 'park-slope-brownstone-renovation',
      location: 'Park Slope, Brooklyn',
      neighborhood: 'Park Slope',
      category: 'Whole-Home Renovation',
      shortDescription: 'Comprehensive restoration of an 1890s landmark brownstone triplex marrying original plaster moldings with contemporary open living.',
      fullDescription: 'A landmarked four-story brownstone off Prospect Park West received a full gut renovation spanning all mechanical, electrical, and structural systems. We preserved and painstakingly restored the ornate parlor floor ceiling medallions, original pocket doors, and mahogany banisters while opening the garden and parlor levels to flood the core with natural daylight. The rear parlor wall was replaced with a custom black steel glass curtain wall opening onto an architecturally landscaped bluestone garden. Modern climate control is provided by zoned variable refrigerant flow (VRF) units completely recessed within custom architectural ceiling coves.',
      designApproach: 'A sensitive dialogue between historical preservation and contemporary Scandinavian minimalism.',
      materials: [
        'Restored original 1890s lath-and-plaster decorative crown moldings',
        'Custom blackened steel structural curtain wall by Crittall',
        'Herringbone French white oak floors throughout the parlor level',
        'Monolithic Nero Marquina fireplace mantels',
        'Dornbracht Tara architectural black matte fixtures'
      ],
      budgetMin: 280000,
      budgetMax: 420000,
      timeline: '8 months',
      propertyType: 'Landmarked Historic Brownstone',
      yearCompleted: 2024,
      heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: true,
      published: true,
      sortOrder: 2,
      createdAt: '2024-11-10T10:00:00Z',
      updatedAt: '2024-11-10T10:00:00Z'
    },
    {
      id: 'proj-3',
      title: 'Upper West Side Primary Bath',
      slug: 'upper-west-side-primary-bath',
      location: 'Upper West Side, Manhattan',
      neighborhood: 'Upper West Side',
      category: 'Bathroom Remodeling',
      shortDescription: 'Spa sanctuary featuring floor-to-ceiling bookmatched travertine, fluted glass walk-in wet room, and radiant-heated stone flooring.',
      fullDescription: 'Located in an elegant Central Park West co-op, this primary en-suite was transformed from a cramped 1970s bath into an expansive wet room and sanctuary. The layout was re-engineered by capturing underutilized hall closet square footage. We specified floor-to-ceiling Roman travertine slabs with precision mitered seams, a freestanding matte resin oval soaking tub positioned beside custom privacy shutters, and dual floating vanities crafted from smoked oak with integrated basin sinks.',
      designApproach: 'Sensory quietude characterized by monolithic stone surfaces, acoustic dampening, and shadowline reveals.',
      materials: [
        'Bookmatched Roman Navona Travertine full slabs',
        'Custom floating vanity in smoked European oak',
        'Agape spoon matte resin soaking tub',
        'Thermasol steam shower system with aromatherapy and chromotherapy',
        'NuHeat radiant in-floor warming under natural honed stone'
      ],
      budgetMin: 55000,
      budgetMax: 85000,
      timeline: '8 weeks',
      propertyType: 'Pre-war Co-op Apartment',
      yearCompleted: 2025,
      heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: true,
      published: true,
      sortOrder: 3,
      createdAt: '2025-02-01T10:00:00Z',
      updatedAt: '2025-02-01T10:00:00Z'
    },
    {
      id: 'proj-4',
      title: 'Astoria Family Basement Retreat',
      slug: 'astoria-family-basement',
      location: 'Astoria, Queens',
      neighborhood: 'Astoria',
      category: 'Basement Finishing',
      shortDescription: 'Lower-level transformation into a luminous media lounge, temperature-controlled wine cellar, and integrated guest suite with sub-grade waterproofing.',
      fullDescription: 'This two-family Queens brick home had a damp, low-ceilinged cellar with exposed utility piping. We underpinned the perimeter foundation to gain 14 inches of finished ceiling height, installed closed-cell polyurethane spray insulation and an interior perimeter French drain with battery-backed sump redundancy. The resulting space is a bright, warm living level with a Dolby Atmos surround sound screening area, custom glass-enclosed 400-bottle wine room, laundry suite, and a modern guest bath.',
      designApproach: 'Overcoming subterranean constraints through architectural cove lighting, light-reflective mineral plaster walls, and rich walnut casework.',
      materials: [
        'Delta-MS sub-slab drainage membrane with dual sump pumps',
        'Custom white oak slatted ceiling baffles for acoustic damping',
        'Microcement heated flooring in warm sand tone',
        'Custom climate-controlled glass wine display casework',
        'Concealed magnetic architectural access panels for utility isolation'
      ],
      budgetMin: 90000,
      budgetMax: 140000,
      timeline: '14 weeks',
      propertyType: 'Brick Rowhouse Cellar',
      yearCompleted: 2025,
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: false,
      published: true,
      sortOrder: 4,
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z'
    },
    {
      id: 'proj-5',
      title: 'Westchester Glass & Timber Addition',
      slug: 'westchester-modern-addition',
      location: 'Scarsdale, Westchester County',
      neighborhood: 'Westchester',
      category: 'Home Addition',
      shortDescription: 'A two-story architectural extension introducing a sun-drenched garden pavilion, primary suite cantilever, and indoor-outdoor terrace integration.',
      fullDescription: 'Designed for a 1950s modernist residence on a wooded one-acre lot in Scarsdale, this 1,400 sq. ft. addition extends from the rear elevation with floor-to-ceiling structural triple-glazed sliding glass panels and charred Japanese cedar (Shou Sugi Ban) exterior cladding. The ground floor accommodates an expansive casual entertaining pavilion and scullery, while the upper cantilevered volume houses an executive study and private yoga terrace overlooking the forest.',
      designApproach: 'Cantilevered geometric volumes with minimal thermal bridges and panoramic woodland sightlines.',
      materials: [
        'Shou Sugi Ban charred Accoya wood cladding with natural oil finish',
        'Sky-Frame motorized frameless sliding glass facade systems',
        'Radiant heated limestone terrace paving extending indoors and outdoors',
        'Glue-laminated Douglas fir exposed structural timber beams',
        'Custom zinc standing seam roof with integrated concealed gutters'
      ],
      budgetMin: 350000,
      budgetMax: 550000,
      timeline: '9–12 months',
      propertyType: 'Modern Single-Family Residence',
      yearCompleted: 2024,
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: true,
      published: true,
      sortOrder: 5,
      createdAt: '2024-09-01T10:00:00Z',
      updatedAt: '2024-09-01T10:00:00Z'
    },
    {
      id: 'proj-6',
      title: 'Tribeca Custom Penthouse Millwork',
      slug: 'tribeca-custom-penthouse-renovation',
      location: 'Tribeca, Manhattan',
      neighborhood: 'Tribeca',
      category: 'Custom Renovation',
      shortDescription: 'Bespoke architectural woodworking, integrated library walls, concealed pivot doors, and custom steel-and-glass acoustic partition screens.',
      fullDescription: 'In this 3,200 sq. ft. cast-iron historic building loft, we performed bespoke architectural reconfigurations tailored to an art-collecting family. The challenge was articulating distinct intimate zones—formal study, dining alcove, gallery hall—without compromising the monumental open loft volume. We fabricated floor-to-ceiling fluted walnut wall paneling with integrated magnetic secret doors, custom bronze-framed display vitrines with museum-grade LED illumination, and acoustic blackened-steel atelier screens.',
      designApproach: 'Architectural joinery functioning as structural dividing art furniture rather than conventional drywall partitions.',
      materials: [
        'Hand-finished American Black Walnut architectural veneers',
        'Solid patinated bronze reveals and custom door hardware',
        'Museum-grade Lutron Ketra tunable natural light fixtures',
        'Italian Fior di Bosco honed gray marble bespoke fire surround',
        'Loro Piana wool-cashmere upholstered acoustic wall insets'
      ],
      budgetMin: 180000,
      budgetMax: 275000,
      timeline: '16 weeks',
      propertyType: 'Cast-Iron Historic Loft',
      yearCompleted: 2025,
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85'
      ],
      featured: true,
      published: true,
      sortOrder: 6,
      createdAt: '2025-02-18T10:00:00Z',
      updatedAt: '2025-02-18T10:00:00Z'
    }
  ],

  services: [
    {
      id: 'srv-1',
      name: 'Kitchen Remodeling',
      slug: 'kitchen-remodeling',
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      tagline: 'The heart of your home, elevated through architectural craftsmanship.',
      shortDescription: 'Custom cabinetry, precision bookmatched stone islands, ergonomic workflow planning, and integrated appliance suites tailored for culinary living.',
      fullDescription: 'At Banlgar Ghor Remodeling, we approach kitchen renovation not as mere cabinetry replacement, but as comprehensive architectural spatial reinvention. In New York apartments and residences, kitchens must perform with flawless efficiency while serving as the emotional core of dinner parties and family mornings. We handle gas-to-induction infrastructure conversions, co-op building riser coordination, custom architectural millwork, and museum-grade finishes.',
      benefits: [
        'Custom furniture-grade cabinetry built to exact millimeter tolerances',
        'Hand-selected natural stone slabs sourced from premier quarry importers',
        'Complete plumbing, electrical, and HVAC infrastructure modernization',
        'Zero-compromise appliance integration with Sub-Zero, Wolf, Gaggenau, and Miele',
        'Full DOB expediting and co-op/condo architectural review management'
      ],
      typicalScope: [
        'Spatial layout reconfiguration and load-bearing wall modifications',
        'Custom floor-to-ceiling cabinet design, fabrication, and precision installation',
        'Solid stone countertop and waterfall island fabrication with bookmatched veining',
        'Architectural lighting schemes with layered task, ambient, and accent controls',
        'Sub-floor leveling, acoustic isolation membranes, and custom hardwood or stone flooring',
        'Designer tapware, filtration systems, and bespoke architectural hardware'
      ],
      materials: [
        'Rift-sawn white oak, European smoked oak, and walnut veneers',
        'Calacatta Gold, Roman Navona Travertine, and Montclair Danby marble',
        'Unlacquered architectural brass, bronze, and blackened stainless steel',
        'Zellige handcrafted ceramic and fluted artisan tile surfaces'
      ],
      process: [
        { step: 1, title: 'Architectural Discovery', description: 'Comprehensive site survey, culinary habit audit, and laser 3D point cloud measurement.' },
        { step: 2, title: 'Material & Joinery Design', description: 'Cabinet door profiles, finish samples, stone slab visits, and 3D realistic renderings.' },
        { step: 3, title: 'Pre-Construction & Board Filings', description: 'Co-op board architectural packet preparation, DOB permits, and insurance filings.' },
        { step: 4, title: 'Precision Execution', description: 'Dust-contained demolition, MEP infrastructure rough-in, and master millwork install.' }
      ],
      faqs: [
        {
          question: 'How long does a typical luxury kitchen remodel take in NYC?',
          answer: 'Construction typically spans 8 to 14 weeks on site, preceded by 6 to 10 weeks of cabinetry fabrication and co-op board approvals.'
        },
        {
          question: 'Can you work with strict New York co-op and condo alterations agreements?',
          answer: 'Yes. We have navigated hundreds of co-op alteration agreements across Manhattan and Brooklyn, coordinating building supers, elevator bookings, and stringent working hours.'
        },
        {
          question: 'Do you help source and select appliances?',
          answer: 'Our design team creates complete specification books with detailed electrical, plumbing, and ventilation cut sheets to ensure seamless integration.'
        }
      ],
      seoTitle: 'Kitchen Remodeling New York City | Luxury Custom Kitchens | Banlgar Ghor',
      seoDescription: 'Transform your NYC home with Banlgar Ghor Remodeling. Architectural cabinetry, bookmatched stone, and meticulous co-op compliant construction.',
      sortOrder: 1,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'srv-2',
      name: 'Bathroom Remodeling',
      slug: 'bathroom-remodeling',
      heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
      tagline: 'Quiet luxury sanctuaries crafted with timeless natural materials.',
      shortDescription: 'Primary en-suites, wet rooms, curbless walk-in showers, radiant-heated floors, and custom floating vanities engineered for restorative living.',
      fullDescription: 'A luxury bathroom is your private sanctuary from the kinetic energy of New York City. Banlgar Ghor designs and executes spa-grade primary en-suites, guest bathrooms, and jewel-box powder rooms. We implement advanced Schluter waterproofing protocols, curbless transitions, concealed in-wall carrier systems, and multi-zone ambient lighting.',
      benefits: [
        'Commercial-grade waterproofing systems with full lifetime warranty standards',
        'Custom floating vanity millwork with hidden organizers and integrated charging',
        'Curbless European walk-in wet rooms with linear flush drains',
        'NuHeat programmable radiant floor warming under natural stone and tile',
        'Thermasol and Mr. Steam custom residential steam room integration'
      ],
      typicalScope: [
        'Full strip to studs and subfloor reinforcement',
        'Plumbing stack repositioning and pressure-balancing rough-ins',
        'Floor-to-ceiling stone slab or large-format tile precision miter work',
        'Custom frameless starphire glass enclosures and architectural crittall screens',
        'Bespoke mirror medicine cabinets with defoggers and dimmable Kelvin-selectable lighting'
      ],
      materials: [
        'Roman Navona Travertine, Statuario Marble, and honed Ceppo di Gré stone',
        'Waterworks, Dornbracht, and Fantini architectural brassware',
        'Smoked oak and matte lacquer moisture-resistant cabinetry',
        'Fluted cast glass and architectural Starphire low-iron glazing'
      ],
      process: [
        { step: 1, title: 'Sanctuary Visioning', description: 'Spatial layout optimization, plumbing feasibility analysis, and fixture selection.' },
        { step: 2, title: 'Finish & Stone Curation', description: 'Selecting matching stone slabs, dry-lay tile mockups, and hardware finishes.' },
        { step: 3, title: 'Waterproof Infrastructure', description: 'Schluter-KERDI continuous membrane installation and 24-hour flood testing.' },
        { step: 4, title: 'Artisanal Tile & Glazing', description: 'Stone installation, mitered edges, zero-grout transitions, and fixture trim.' }
      ],
      faqs: [
        {
          question: 'Is it possible to add a walk-in shower in a pre-war NYC apartment?',
          answer: 'In most buildings, yes. We evaluate the existing plumbing stack and floor joist depth to design elegant curbless or low-profile shower pans.'
        },
        {
          question: 'How do you prevent moisture damage in windowless bathrooms?',
          answer: 'We engineer ultra-quiet high-CFM remote inline exhaust fans, humidity-sensing switches, and waterproof vapor-barrier membranes.'
        }
      ],
      seoTitle: 'Luxury Bathroom Remodeling NYC | Spa En-Suites | Banlgar Ghor',
      seoDescription: 'Create a private sanctuary with Banlgar Ghor. Bespoke marble baths, curbless wet rooms, and radiant stone floors in New York.',
      sortOrder: 2,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'srv-3',
      name: 'Basement Finishing',
      slug: 'basement-finishing',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      tagline: 'Transforming subterranean spaces into luminous living environments.',
      shortDescription: 'Engineered sub-grade waterproofing, underpinning for ceiling height, climate-controlled wine cellars, home theaters, and luxury guest quarters.',
      fullDescription: 'The lower level of a Brooklyn brownstone, Queens rowhouse, or Westchester home holds immense untapped value. Banlgar Ghor specializes in converting damp cellars into pristine, code-compliant living spaces. We address moisture at the root through exterior or interior perimeter drainage, closed-cell spray foam insulation, and subfloor vapor barriers before framing luxurious media suites, wine libraries, and private wellness gyms.',
      benefits: [
        'Comprehensive sub-grade water management with sump backup systems',
        'Foundation underpinning and slab lowering to achieve generous ceiling heights',
        'Acoustic ceiling baffling and sound-dampening insulation between floors',
        'Custom lightwells and egress window installations to bring in daylight',
        'Zoned mini-split heat pump climate control for year-round comfort'
      ],
      typicalScope: [
        'Structural assessment, underpinning engineering, and excavation',
        'Delta-MS dimpled drainage matting and interior French drain piping',
        'Moisture-resistant mold-proof drywall assemblies and metal stud framing',
        'Custom temperature and humidity-controlled wine storage construction',
        'Home cinema acoustic treatment, wiring, and high-performance lighting'
      ],
      materials: [
        'Microcement and heated engineered hardwood flooring',
        'Closed-cell polyurethane spray foam thermal insulation',
        'Custom acoustic wall paneling with acoustic felt and wood slats',
        'Triple-glazed walk-out glass egress doors and lightwell windows'
      ],
      process: [
        { step: 1, title: 'Moisture & Structural Audit', description: 'Thermal imaging, moisture meters, and structural slab depth inspection.' },
        { step: 2, title: 'Engineering & Permitting', description: 'Underpinning plans, DOB filings, and legal ceiling height verification.' },
        { step: 3, title: 'Waterproofing & Rough-In', description: 'Dual pump systems, vapor encapsulation, and electrical distribution.' },
        { step: 4, title: 'Bespoke Interior Finishes', description: 'Flooring, custom cabinetry, wet bar installation, and smart lighting.' }
      ],
      faqs: [
        {
          question: 'Can you legally convert a cellar into living space in NYC?',
          answer: 'Yes, depending on building classification and egress requirements. We handle all DOB architectural filings for recreation rooms and code-compliant spaces.'
        },
        {
          question: 'How do you guarantee the basement will stay dry?',
          answer: 'We employ multi-layered moisture protection: vapor barriers, sub-slab drainage channels, and redundant dual sump pumps with battery backups.'
        }
      ],
      seoTitle: 'Basement Finishing NYC & Brooklyn | Luxury Lower Levels | Banlgar Ghor',
      seoDescription: 'Transform your Brooklyn brownstone or NYC home basement into a luxury media room, wine cellar, or guest retreat with Banlgar Ghor.',
      sortOrder: 3,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'srv-4',
      name: 'Whole-Home Renovation',
      slug: 'whole-home-renovation',
      heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      tagline: 'Comprehensive architectural transformations delivered with singular vision.',
      shortDescription: 'Complete gut renovations, historic brownstone restorations, structural reconfigurations, and full MEP modernization under unified management.',
      fullDescription: 'When embarking on a whole-home renovation in New York, coordinating multiple trades, building boards, and regulatory bodies can be daunting. Banlgar Ghor Remodeling acts as your single point of accountability. From initial architectural planning and landmark preservation through rough framing, millwork, and white-glove turnover, our team manages every detail with precision and grace.',
      benefits: [
        'One dedicated project executive overseeing design, expediting, and construction',
        'Preservation of historical architectural assets combined with modern infrastructure',
        'State-of-the-art Lutron lighting automation and zoned VRF climate systems',
        'Rigorous quality control inspections at every trade milestone',
        'Detailed schedule tracking with transparent weekly executive reports'
      ],
      typicalScope: [
        'Complete interior demolition and structural steel installation for open layouts',
        'All-new copper plumbing, electrical panels, and central HVAC distributions',
        'Kitchen, multiple bathrooms, primary suites, and secondary bedrooms',
        'Historic plaster restoration, custom baseboards, casing, and interior doors',
        'High-performance soundproofing between floors and party walls'
      ],
      materials: [
        'Belgian wide-plank white oak flooring and chevron parquet',
        'Crittall architectural steel partitions and exterior French doors',
        'Solid plaster crown moldings hand-cast to match historic profiles',
        'Bespoke architectural joinery throughout living, dressing, and culinary areas'
      ],
      process: [
        { step: 1, title: 'Master Concept & Feasibility', description: 'Holistic spatial programming, structural feasibility, and budget alignment.' },
        { step: 2, title: 'Drawings & Regulatory Filings', description: 'Architectural documentation, NYC DOB filings, and LPC approvals.' },
        { step: 3, title: 'Structural & MEP Phase', description: 'Demolition, steel framing, electrical, plumbing, and HVAC infrastructure.' },
        { step: 4, title: 'Finishes & Final Walkthrough', description: 'Stone installation, paint, millwork, and zero-defect punch list turnover.' }
      ],
      faqs: [
        {
          question: 'Can we live in our home during a whole-home renovation?',
          answer: 'For a comprehensive whole-home gut renovation, we strongly advise relocating during construction to ensure safety, speed of execution, and quality control.'
        },
        {
          question: 'Do you manage LPC (Landmarks Preservation Commission) approvals?',
          answer: 'Yes. We have extensive experience with historic brownstones in Park Slope, Brooklyn Heights, Greenwich Village, and the Upper West Side.'
        }
      ],
      seoTitle: 'Whole-Home Renovation New York City | Brownstone Remodeling | Banlgar Ghor',
      seoDescription: 'End-to-end full home gut renovations for NYC brownstones, townhomes, and luxury apartments. Architectural design and master craftsmanship.',
      sortOrder: 4,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'srv-5',
      name: 'Home Additions',
      slug: 'home-additions',
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      tagline: 'Expanding your living footprint with architectural continuity.',
      shortDescription: 'Rear extensions, second-story vertical additions, sun-drenched garden pavilions, and structural integrations harmonizing with existing architecture.',
      fullDescription: 'Expanding an existing home requires deep structural intuition and aesthetic sensitivity. Whether designing a modern glass-and-timber rear extension on a Brooklyn townhouse or adding a second-story primary wing in Westchester, Banlgar Ghor ensures the new volume feels like an organic evolution of the property. We manage zoning floor area ratio (FAR) calculations, structural foundation engineering, and weather-tight building envelopes.',
      benefits: [
        'Zoning and FAR analysis to maximize your allowable building envelope',
        'Seamless architectural continuity between existing structures and new construction',
        'High-performance building envelopes with triple glazing and continuous insulation',
        'Structural foundation engineering including micro-piles and concrete underpinning',
        'Turnkey execution from civil filings to final Certificate of Occupancy'
      ],
      typicalScope: [
        'Site survey, geotechnical soil borings, and structural engineering',
        'Excavation, foundation pour, and structural steel or timber framing',
        'Exterior envelope construction (brick, stone, metal panels, high-end glazing)',
        'Full interior buildout including electrical, plumbing, and HVAC integration',
        'Roofline tie-ins, flashings, waterproofing, and drainage infrastructure'
      ],
      materials: [
        'Structural steel moment frames and glue-laminated timber beams',
        'Custom thermal-break architectural glass curtain wall systems',
        'Hand-struck bricks matched to historic masonry or natural cedar siding',
        'Zinc, copper, or slate roofing materials with long-life guarantees'
      ],
      process: [
        { step: 1, title: 'Zoning & Envelope Audit', description: 'FAR calculations, property setbacks, and architectural massing study.' },
        { step: 2, title: 'Structural Engineering', description: 'Foundation design, load calculations, and DOB plan submission.' },
        { step: 3, title: 'Excavation & Superstructure', description: 'Concrete foundation, steel erection, and weather-tight envelope closure.' },
        { step: 4, title: 'Seamless Interior Tie-In', description: 'Marrying existing rooms with new volumes, continuous flooring and finishes.' }
      ],
      faqs: [
        {
          question: 'What is the zoning process for adding a rear extension in NYC?',
          answer: 'We review your property’s zoning district, lot coverage limits, and rear-yard depth requirements to determine the allowable square footage before filing plans.'
        },
        {
          question: 'How long does a home addition take to construct?',
          answer: 'Typically 6 to 12 months depending on foundation complexity, weather conditions, and structural scope.'
        }
      ],
      seoTitle: 'Home Additions NYC & Westchester | Brownstone Rear Extensions | Banlgar Ghor',
      seoDescription: 'Expand your living space with custom home additions. Rear garden extensions, second-story additions, and structural expansions by Banlgar Ghor.',
      sortOrder: 5,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'srv-6',
      name: 'Custom Renovations',
      slug: 'custom-renovations',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      tagline: 'Artisanal architectural woodwork and bespoke residential spaces.',
      shortDescription: 'Custom architectural millwork, historic brownstone preservation, integrated library walls, secret pivot doors, and specialized luxury installations.',
      fullDescription: 'Distinctive homes often call for specialized craft that defies standard categories. Banlgar Ghor’s custom renovation division specializes in bespoke architectural woodwork, secret doors, historic landmark moldings, sculptural metalwork, and tailored interior adaptations. We collaborate closely with homeowners, interior architects, and artisanal suppliers to fabricate one-of-a-kind living environments.',
      benefits: [
        'Dedicated custom millwork atelier with master joiners and finish artisans',
        'Bespoke architectural solutions engineered for unique spatial challenges',
        'Historic preservation techniques honoring authentic New York craftsmanship',
        'Seamless integration of concealed audiovisual, smart home, and lighting tech',
        'White-glove installation with laser-guided precision and silent hardware'
      ],
      typicalScope: [
        'Floor-to-ceiling library casework with integrated ladders and concealed storage',
        'Architectural wall paneling in walnut, white oak, or hand-applied lime plaster',
        'Custom pivot doors with concealed FritsJurgens architectural hinges',
        'Bespoke fireplace mantels and hearths in hand-carved stone or blackened steel',
        'Custom wine vaults, cigar lounges, and private wellness rooms'
      ],
      materials: [
        'Rare hardwood burls, quartersawn European oak, and fluted walnut',
        'Hand-patinated metals: bronze, blackened steel, and brass',
        'Natural mineral plasters, tadelakt, and Venetian marble finishes',
        'Specialty acoustic fabrics and leather upholstery paneling'
      ],
      process: [
        { step: 1, title: 'Concept Sketching & Shop Drawings', description: 'Detailed CAD joinery drawings, joint details, and 1:1 material samples.' },
        { step: 2, title: 'Atelier Fabrication', description: 'Precision CNC cutting combined with master hand-tool joinery and finishing.' },
        { step: 3, title: 'Site Preparation & Laser Leveling', description: 'Wall leveling, blocking, and concealed electrical conduit runs.' },
        { step: 4, title: 'Master Installation', description: 'Silent scribing, hidden fastening, and flawless on-site touchups.' }
      ],
      faqs: [
        {
          question: 'Can you match historic moldings from an 1800s brownstone?',
          answer: 'Yes. We take physical plaster impressions or laser profiles of original wood profiles to custom-knife new blades and replicate profiles identically.'
        },
        {
          question: 'Do you fabricate the millwork locally?',
          answer: 'Our architectural millwork is crafted in regional specialist ateliers, ensuring rapid turnaround, sample verification, and uncompromising quality.'
        }
      ],
      seoTitle: 'Custom Renovations & Architectural Millwork NYC | Banlgar Ghor',
      seoDescription: 'Bespoke architectural woodworking, historic preservation, and luxury finish packages across New York City and Westchester.',
      sortOrder: 6,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    }
  ],

  testimonials: [
    {
      id: 't-1',
      name: 'Julian & Claire Montgomery',
      location: 'Chelsea, Manhattan',
      projectType: 'Kitchen Remodeling',
      rating: 5,
      quote: 'Banlgar Ghor transformed our pre-war loft into an architectural masterpiece. Their reverence for natural stone, flawless millwork, and respectful handling of our co-op board made the entire renovation an effortless journey.',
      fullReview: 'Having renovated twice before in Manhattan with other contractors, our experience with Banlgar Ghor was in a completely different tier. From our initial meeting to the final walkthrough, their team treated our home with extraordinary respect. The custom white oak kitchen and waterfall Calacatta island are beyond our wildest dreams.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      featured: true,
      published: true,
      sortOrder: 1,
      createdAt: '2025-02-10T10:00:00Z',
      updatedAt: '2025-02-10T10:00:00Z'
    },
    {
      id: 't-2',
      name: 'David Sterling',
      location: 'Park Slope, Brooklyn',
      projectType: 'Whole-Home Renovation',
      rating: 5,
      quote: 'Restoring an 1890s brownstone requires artisans, not just builders. Banlgar Ghor preserved our historic plasterwork while introducing clean modern architectural elements and seamless climate control. Truly world-class.',
      fullReview: 'We interviewed four premier design-build firms in New York. Banlgar Ghor stood out immediately for their structural knowledge and historic preservation acumen. They navigated Landmarks with zero delays and delivered our triplex on time and within our agreed budget envelope.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      featured: true,
      published: true,
      sortOrder: 2,
      createdAt: '2024-12-05T10:00:00Z',
      updatedAt: '2024-12-05T10:00:00Z'
    },
    {
      id: 't-3',
      name: 'Elena Rostova',
      location: 'Upper West Side, Manhattan',
      projectType: 'Bathroom Remodeling',
      rating: 5,
      quote: 'Our primary bathroom now feels like an Aman resort. The bookmatched travertine and steam shower were executed with laser perfection. No shortcuts, total transparency, and immaculate site cleanliness every single evening.',
      fullReview: 'In a strict pre-war co-op on Central Park West, contractor etiquette is everything. The building superintendent commented to me that Banlgar Ghor’s protection of the hallways and elevators was the most thorough he had ever witnessed. The result is pure quiet luxury.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      featured: true,
      published: true,
      sortOrder: 3,
      createdAt: '2025-01-25T10:00:00Z',
      updatedAt: '2025-01-25T10:00:00Z'
    },
    {
      id: 't-4',
      name: 'Marcus & Sophie Chen',
      location: 'Scarsdale, Westchester',
      projectType: 'Home Addition',
      rating: 5,
      quote: 'The glass and timber addition Banlgar Ghor created for our Scarsdale home completely transformed how our family lives. The natural daylight and seamless transition between indoors and outdoors is breathtaking.',
      fullReview: 'From foundation engineering through framing the custom sliding glass facade, every craftsman who stepped onto our property was courteous, skilled, and professional. Banlgar Ghor handled all local municipal building permits without a single hiccup.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      featured: true,
      published: true,
      sortOrder: 4,
      createdAt: '2024-10-18T10:00:00Z',
      updatedAt: '2024-10-18T10:00:00Z'
    },
    {
      id: 't-5',
      name: 'Nadia & Omar Khan',
      location: 'Astoria, Queens',
      projectType: 'Basement Finishing',
      rating: 5,
      quote: 'We gained over 1,000 square feet of gorgeous, bone-dry living space. What was once a dark cellar is now our favorite room in the house—complete with an acoustic cinema and wine storage. Outstanding work.',
      fullReview: 'We had been anxious about moisture issues for years. Banlgar Ghor came in with an engineering mindset, installed comprehensive drainage, and lowered our concrete floor to achieve lofty 9-foot ceilings. Exceptional craftsmanship.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      featured: false,
      published: true,
      sortOrder: 5,
      createdAt: '2025-02-02T10:00:00Z',
      updatedAt: '2025-02-02T10:00:00Z'
    }
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'How does the initial consultation process work?',
      answer: 'Our consultation begins with an in-depth conversation regarding your lifestyle, aesthetic goals, property details, and target investment range. We then conduct an on-site architectural evaluation to inspect existing conditions, MEP infrastructure, and structural possibilities. Following this visit, we present a preliminary scope outline and roadmap.',
      category: 'General',
      sortOrder: 1,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-2',
      question: 'How much does high-end residential remodeling cost in New York?',
      answer: 'High-end remodeling in New York City typically ranges from $250 to $650+ per square foot depending on property type, structural modifications, and finish selections. Primary kitchen renovations typically range from $75,000 to $180,000+, luxury bathrooms from $45,000 to $95,000+, and whole-home gut renovations from $250,000 to $750,000+. During planning, we provide detailed line-item budgets with fixed allowances.',
      category: 'Pricing',
      sortOrder: 2,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-3',
      question: 'How long does a luxury renovation typically take?',
      answer: 'Timelines depend on project scope and regulatory approvals. A kitchen or primary bathroom renovation typically takes 8 to 14 weeks of active construction. A whole-home or brownstone renovation spans 6 to 10 months. Prior to construction, planning, design, and co-op/DOB approvals typically require 6 to 12 weeks. We provide a detailed weekly Gantt chart before breaking ground.',
      category: 'Timeline',
      sortOrder: 3,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-4',
      question: 'Do you handle architectural design and drawings in-house?',
      answer: 'Yes. Banlgar Ghor operates as a unified design-build atelier. We handle architectural space planning, 3D visualizations, material specification, lighting design, and construction documents. If you are already working with an independent architect or interior designer, we partner collaboratively with their studio.',
      category: 'Design',
      sortOrder: 4,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-5',
      question: 'Do you manage NYC Department of Buildings (DOB) and Landmark permits?',
      answer: 'Yes. We manage all regulatory filings through our dedicated New York expediters, licensed professional engineers, and architects. This includes DOB work permits, asbestos surveys, electrical and plumbing inspections, LPC landmark authorizations, and final Letters of Completion.',
      category: 'Process',
      sortOrder: 5,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-6',
      question: 'Can I live in my home during the renovation?',
      answer: 'For single-room projects (such as a guest bath or secondary space), homeowners often remain in their residence with strict dust-barrier containment (HEPA air scrubbers and ZipWall enclosures). For full kitchens or whole-home gut renovations, we strongly advise off-site living for your comfort, well-being, and to accelerate the construction schedule.',
      category: 'Construction',
      sortOrder: 6,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-7',
      question: 'How are unforeseen site conditions and change orders handled?',
      answer: 'We mitigate surprises during pre-construction through invasive testing and probe openings whenever permitted. If an unforeseen condition arises (such as concealed pre-war pipe corrosion), we document the issue with photographs, present clear engineering solutions, and provide a fixed-price written change order before executing any extra work.',
      category: 'Process',
      sortOrder: 7,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-8',
      question: 'What geographic areas do you serve?',
      answer: 'We serve all five boroughs of New York City (Manhattan, Brooklyn, Queens, the Bronx, and Staten Island) as well as Westchester County (including Scarsdale, Rye, White Plains, Bronxville, and Chappaqua). If your project is located in an adjacent community, please contact us to discuss feasibility.',
      category: 'General',
      sortOrder: 8,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-9',
      question: 'Do you offer financing options for remodeling projects?',
      answer: 'Yes. Through our premier home improvement lending partners, clients can explore unsecured financing up to $250,000 as well as custom draw schedules. We provide simple pre-qualification with soft credit inquiries that do not affect your credit score.',
      category: 'Financing',
      sortOrder: 9,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'faq-10',
      question: 'How do I get started with Banlgar Ghor Remodeling?',
      answer: 'The first step is completing our online Consultation Request form or calling our studio directly at (212) 555-0198. We will discuss your project parameters, schedule an architectural walkthrough, and begin crafting a tailored proposal for your residence.',
      category: 'General',
      sortOrder: 10,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    }
  ],

  serviceAreas: [
    {
      id: 'area-1',
      name: 'Manhattan',
      region: 'New York, NY',
      description: 'Serving premier residential neighborhoods across Manhattan, from Upper East Side pre-war co-ops and Tribeca cast-iron lofts to West Village brownstones and Chelsea penthouses. We specialize in navigating strict alteration agreements, freight elevator restrictions, and white-glove building standards.',
      highlights: ['Tribeca', 'SoHo', 'West Village', 'Chelsea', 'Upper East Side', 'Upper West Side', 'Gramercy Park', 'Flatiron'],
      imageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Pre-war co-op gut renovations', 'Custom kitchen architecture', 'Primary spa en-suites', 'Architectural loft millwork'],
      sortOrder: 1,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'area-2',
      name: 'Brooklyn',
      region: 'Kings County, NY',
      description: 'Renowned for our brownstone restoration and modern architectural extensions across Brooklyn’s landmark historic districts. We balance meticulous preservation of historic plasterwork and woodwork with contemporary open layouts and glass curtain walls.',
      highlights: ['Park Slope', 'Brooklyn Heights', 'Cobble Hill', 'DUMBO', 'Carroll Gardens', 'Fort Greene', 'Williamsburg', 'Prospect Heights'],
      imageUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Landmark brownstone restorations', 'Rear garden additions', 'Finished cellar wellness suites', 'Historic woodwork restoration'],
      sortOrder: 2,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'area-3',
      name: 'Queens',
      region: 'Queens County, NY',
      description: 'Bringing architectural remodeling to Queens’ vibrant residential enclaves. From rowhouse basement transformations in Astoria to whole-home renovations in Long Island City, Forest Hills Gardens, and Sunnyside Gardens.',
      highlights: ['Astoria', 'Long Island City', 'Forest Hills Gardens', 'Sunnyside Gardens', 'Bayside', 'Whitestone'],
      imageUrl: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Sub-grade basement finishing', 'Multi-level home remodeling', 'Chef’s kitchen expansions', 'Open concept living'],
      sortOrder: 3,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'area-4',
      name: 'Westchester County',
      region: 'Westchester, NY',
      description: 'Creating custom architectural estates, primary suite additions, and luxury renovations throughout Westchester County’s premier suburban enclaves. We provide full civil permitting, foundation construction, and modern timber-glass additions.',
      highlights: ['Scarsdale', 'Rye', 'Bronxville', 'White Plains', 'Chappaqua', 'Pelham', 'Bedford', 'Larchmont'],
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Two-story home additions', 'Outdoor terrace integrations', 'Master wing expansions', 'Custom wine cellars'],
      sortOrder: 4,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'area-5',
      name: 'The Bronx',
      region: 'Bronx County, NY',
      description: 'Serving distinctive residential communities including Riverdale and Fieldston with luxury renovations, historic home updates, and expansive additions that honor authentic architectural character.',
      highlights: ['Riverdale', 'Fieldston', 'Country Club', 'Pelham Bay', 'Spuyten Duyvil'],
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Riverdale estate updates', 'Custom kitchen designs', 'Historic masonry repair', 'Luxury bath suites'],
      sortOrder: 5,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 'area-6',
      name: 'Staten Island',
      region: 'Richmond County, NY',
      description: 'Delivering high-end residential remodeling, custom additions, and whole-home transformations for prominent estates in Todt Hill, Emerson Hill, and Grymes Hill.',
      highlights: ['Todt Hill', 'Emerson Hill', 'Grymes Hill', 'Light-house Hill', 'Richmondtown'],
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      popularProjects: ['Estate whole-home renovations', 'Custom kitchen islands', 'Basement entertainment suites'],
      sortOrder: 6,
      published: true,
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    }
  ],

  processSteps: [
    {
      id: 'proc-1',
      stepNumber: 1,
      title: 'Consultation & Discovery',
      subtitle: 'Understanding your goals, property, and investment parameters',
      description: 'We meet at your residence to conduct an exhaustive spatial audit, review building alteration rules, examine mechanical stacks, and discuss your lifestyle vision and aesthetic preferences.',
      deliverables: ['Detailed site inspection checklist', 'Existing condition photographic survey', 'Preliminary budget range & timeline overview'],
      duration: '1–2 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      sortOrder: 1,
      published: true
    },
    {
      id: 'proc-2',
      stepNumber: 2,
      title: 'Planning & Architectural Design',
      subtitle: 'Developing concepts, materials, and comprehensive 3D models',
      description: 'Our design team develops comprehensive architectural plans, 3D renderings, and precise joinery shop drawings. We accompany you to stone quarries and artisan tile showrooms to curate your finish palette.',
      deliverables: ['Full architectural 3D renderings', 'Comprehensive material & finish specification schedule', 'Joinery millwork shop drawings'],
      duration: '3–6 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
      sortOrder: 2,
      published: true
    },
    {
      id: 'proc-3',
      stepNumber: 3,
      title: 'Detailed Proposal & Agreement',
      subtitle: 'Fixed line-item scope, transparent pricing, and clear milestones',
      description: 'We generate an itemized, line-by-line contract proposal. Every fixture, stone miter, plumbing valve, and paint sheen is specified in black and white—eliminating hidden allowances and unexpected surprises.',
      deliverables: ['Guaranteed line-item contract scope', 'Clear milestone draw schedule', 'Detailed critical path Gantt schedule'],
      duration: '1–2 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      sortOrder: 3,
      published: true
    },
    {
      id: 'proc-4',
      stepNumber: 4,
      title: 'Pre-Construction & Permitting',
      subtitle: 'Board approvals, DOB permits, and procurement coordination',
      description: 'Our project managers handle all building management requirements, including co-op alteration packets, DOB work permits, asbestos testing, and elevator protection schedules. Materials are ordered in advance to ensure zero on-site idle time.',
      deliverables: ['Approved NYC DOB work permits', 'Co-op/Condo alteration agreement sign-off', '100% procured material tracking log'],
      duration: '4–8 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      sortOrder: 4,
      published: true
    },
    {
      id: 'proc-5',
      stepNumber: 5,
      title: 'Construction & Execution',
      subtitle: 'Master craftsmanship with continuous project management',
      description: 'Our in-house master carpenters and licensed trades execute with meticulous care. Your dedicated project superintendent is on-site daily, conducting weekly scheduled walkthroughs and sharing digital progress logs.',
      deliverables: ['Daily superintendent site oversight', 'Weekly photo progress documentation', 'Strict dust-containment protocol enforcement'],
      duration: '8–24 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      sortOrder: 5,
      published: true
    },
    {
      id: 'proc-6',
      stepNumber: 6,
      title: 'Final Walkthrough & Turnover',
      subtitle: 'Zero-defect punch list completion and white-glove handover',
      description: 'Before handover, we conduct an exhaustive quality inspection, completing every minor detail to perfection. We present a custom Owner’s Manual detailing care instructions for all stone, wood, and appliances alongside our comprehensive warranty.',
      deliverables: ['Completed zero-item punch list sign-off', 'Custom Home Care & Warranty Manual', 'Full Certificate of Capital Improvement & DOB closeout'],
      duration: '1–2 weeks',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      sortOrder: 6,
      published: true
    }
  ],

  teamMembers: [
    {
      id: 'tm-1',
      name: 'Farhan Kabir',
      role: 'Principal & Managing Director',
      bio: 'With over eighteen years leading luxury residential renovations across Manhattan and Brooklyn, Farhan founded Banlgar Ghor Remodeling to bridge architectural design rigor with transparent general contracting.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      credentials: 'B.Arch Pratt Institute | Licensed NYC General Contractor',
      sortOrder: 1,
      published: true
    },
    {
      id: 'tm-2',
      name: 'Victoria Vance, AIA',
      role: 'Head of Architecture & Design',
      bio: 'Victoria leads spatial planning and finish curation. Formerly with premier NYC architecture studios, she specializes in pre-war co-op layouts, landmark preservation, and bespoke cabinetry detailing.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      credentials: 'M.Arch Columbia GSAPP | AIA Member',
      sortOrder: 2,
      published: true
    },
    {
      id: 'tm-3',
      name: 'Matteo Bellini',
      role: 'Master Superintendent & Joinery Lead',
      bio: 'Third-generation Italian stonemason and master finish carpenter. Matteo supervises all on-site trade execution, ensuring every mitered stone seam and wood joint meets perfectionist tolerances.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      credentials: 'Master Craft Guild European Certification | 22 Years Field Experience',
      sortOrder: 3,
      published: true
    },
    {
      id: 'tm-4',
      name: 'Sarah Chen-Delgado',
      role: 'Director of Project Management',
      bio: 'Sarah coordinates municipal DOB expediting, co-op board submissions, and procurement logistics. Her rigorous scheduling methodology ensures projects progress with zero downtime.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      credentials: 'PMP Certified | B.S. Construction Management NYU Tandon',
      sortOrder: 4,
      published: true
    }
  ],

  consultationRequests: [
    {
      id: 'lead-1',
      fullName: 'Harrison Sterling',
      email: 'harrison.sterling@gmail.com',
      phone: '+1 (212) 555-7123',
      zipCode: '10011',
      address: '220 W 21st St, Apt 4B, New York, NY',
      projectType: 'Kitchen Remodeling',
      propertyType: 'Pre-war Co-op',
      estimatedBudget: '$100k–$250k',
      preferredTimeline: '1–3 Months',
      projectDetails: 'We are looking to completely renovate our 350 sq ft kitchen in Chelsea. Would love to open the wall into the formal dining room, add a marble island, and install custom rift-oak cabinetry.',
      preferredContactMethod: 'email',
      status: 'Qualified',
      internalNotes: 'Client has alteration agreement in hand. Board review takes ~4 weeks. Scheduled discovery call for next Tuesday.',
      createdAt: '2025-02-14T14:30:00Z',
      updatedAt: '2025-02-15T09:12:00Z'
    },
    {
      id: 'lead-2',
      fullName: 'Genevieve Dupond',
      email: 'g.dupond@nyu.edu',
      phone: '+1 (917) 555-8841',
      zipCode: '11215',
      address: '412 8th Ave, Brooklyn, NY',
      projectType: 'Whole-Home Renovation',
      propertyType: 'Brownstone',
      estimatedBudget: '$250k–$500k',
      preferredTimeline: '3–6 Months',
      projectDetails: 'Acquired a 4-story landmark brownstone in Park Slope. Needs complete mechanical update, parlor level restoration, and new kitchen and 3 baths.',
      preferredContactMethod: 'phone',
      status: 'Consultation Scheduled',
      internalNotes: 'Site walkthrough scheduled with Farhan and Victoria on Friday at 2:00 PM.',
      createdAt: '2025-02-16T18:45:00Z',
      updatedAt: '2025-02-17T11:00:00Z'
    },
    {
      id: 'lead-3',
      fullName: 'Andrew Marcus',
      email: 'amarcus@capitalpartners.com',
      phone: '+1 (646) 555-4921',
      zipCode: '10024',
      address: 'Central Park West, New York, NY',
      projectType: 'Bathroom Remodeling',
      propertyType: 'Condo',
      estimatedBudget: '$50k–$100k',
      preferredTimeline: 'ASAP',
      projectDetails: 'Primary bathroom renovation. We want a curbless Roman travertine shower with steam integration and heated floors.',
      preferredContactMethod: 'email',
      status: 'New',
      internalNotes: 'Received via website consultation form. Fast responder needed.',
      createdAt: '2025-02-18T08:15:00Z',
      updatedAt: '2025-02-18T08:15:00Z'
    }
  ],

  contactMessages: [
    {
      id: 'msg-1',
      name: 'Catherine Ross',
      email: 'catherine.ross@designstudio.nyc',
      phone: '+1 (212) 555-9012',
      message: 'Hello, I am an interior designer representing a client on Fifth Avenue with an upcoming 2,800 sq ft renovation. We are looking for a general contracting partner with high-end millwork experience.',
      status: 'Read',
      internalNotes: 'Responded with portfolio and request for drawing set.',
      createdAt: '2025-02-15T11:20:00Z',
      updatedAt: '2025-02-15T13:40:00Z'
    },
    {
      id: 'msg-2',
      name: 'Robert Hastings',
      email: 'rhastings@hastingslaw.com',
      phone: '+1 (914) 555-3210',
      message: 'Inquiring whether you handle exterior glass home additions in Scarsdale, Westchester? Our property is on a 1-acre lot.',
      status: 'New',
      internalNotes: 'Forwarded to Westchester project coordinator.',
      createdAt: '2025-02-17T16:05:00Z',
      updatedAt: '2025-02-17T16:05:00Z'
    }
  ],

  mediaItems: [
    {
      id: 'med-1',
      name: 'Chelsea Kitchen Island Calacatta',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      category: 'projects',
      sizeBytes: 1420000,
      createdAt: '2025-01-15T10:00:00Z'
    },
    {
      id: 'med-2',
      name: 'Park Slope Brownstone Parlor',
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      category: 'projects',
      sizeBytes: 1650000,
      createdAt: '2024-11-10T10:00:00Z'
    },
    {
      id: 'med-3',
      name: 'Upper West Side Travertine Bath',
      url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
      category: 'projects',
      sizeBytes: 1380000,
      createdAt: '2025-02-01T10:00:00Z'
    },
    {
      id: 'med-4',
      name: 'Hero Architectural Living Room',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      category: 'site',
      sizeBytes: 2100000,
      createdAt: '2025-01-01T10:00:00Z'
    }
  ],

  adminUsers: [
    {
      id: 'usr-1',
      name: 'Farhan Kabir',
      email: 'admin@banlgarghor.com',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 'usr-2',
      name: 'Victoria Vance',
      email: 'victoria@banlgarghor.com',
      role: 'Content Manager',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isActive: true,
      createdAt: '2025-01-05T00:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: 'usr-3',
      name: 'Sarah Delgado',
      email: 'sarah@banlgarghor.com',
      role: 'Sales',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      isActive: true,
      createdAt: '2025-01-10T00:00:00Z',
      lastLogin: new Date().toISOString()
    }
  ],

  auditLogs: [
    {
      id: 'log-1',
      userName: 'Farhan Kabir',
      userRole: 'Super Admin',
      action: 'Updated Company Settings',
      entity: 'companySettings',
      entityId: 'company-singleton',
      details: 'Updated insurance policy limits and NYC DCA license numbers',
      timestamp: '2025-02-18T10:15:00Z'
    },
    {
      id: 'log-2',
      userName: 'Victoria Vance',
      userRole: 'Content Manager',
      action: 'Published Project',
      entity: 'projects',
      entityId: 'proj-1',
      details: 'Published Chelsea Modern Kitchen case study with before/after imagery',
      timestamp: '2025-02-18T11:22:00Z'
    },
    {
      id: 'log-3',
      userName: 'Sarah Delgado',
      userRole: 'Sales',
      action: 'Updated Lead Status',
      entity: 'consultationRequests',
      entityId: 'lead-1',
      details: 'Changed status from New to Qualified for Harrison Sterling',
      timestamp: '2025-02-18T12:05:00Z'
    }
  ]
};
