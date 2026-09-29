export interface Project {
  id: number;
  title: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  advantageGained: string;
  image: string;
  coverImage: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
  year: string;
  color: string;
  slug: string;
  website?: string;
  services: string[];
}

export const SERVICE_MAP: Record<string, { label: string; icon: string; slug: string }> = {
  gtm: { label: 'Go-To-Market Launchpad', icon: 'ri-rocket-line', slug: 'gtm-launchpad' },
  seg: { label: 'SEG Framework', icon: 'ri-line-chart-line', slug: 'seg-framework' },
  performance: { label: 'Performance Marketing', icon: 'ri-bar-chart-box-line', slug: 'performance-marketing' },
  audit: { label: 'Marketing Audit', icon: 'ri-search-line', slug: 'marketing-audit' },
};

export const PROJECTS_STORAGE_KEY = 'brandstack_projects';
export const COVER_STORAGE_KEY = 'brandstack_project_covers';

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Tonivia Makeup',
    category: 'Brand Launch & GTM',
    tagline: 'Launching a makeup brand that moves beauty forward.',
    description:
      'Tonivia Makeup is a bold makeup brand redefining beauty standards. We launched a comprehensive go-to-market strategy that drove product awareness, built an engaged community, and delivered exceptional sales growth from day one.',
    challenge:
      'Breaking into the saturated beauty market requires more than great products. It demands a launch strategy that creates instant momentum, builds community trust, and converts attention into sales.',
    solution:
      'We crafted a community-first GTM strategy that prioritized authentic experiences over transactions. Through strategic partnerships, curated event experiences, and a focus on sustainability, we built a platform people trust and love.',
    advantageGained:
      'Tonivia Makeup launched to a sold-out first collection within 48 hours. The brand built a community of 8K+ engaged followers and achieved 320% ROI on launch campaigns. Repeat purchase rate hit 42% within the first 90 days.',
    image: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/1f5a3fb7-9f7e-40f1-bf8c-dbaa3638b1cd_compressed_BZBG6902.webp',
    coverImage: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/1f5a3fb7-9f7e-40f1-bf8c-dbaa3638b1cd_compressed_BZBG6902.webp',
    tags: ['GTM Strategy', 'Community Building', 'Product Launch', 'Sales Growth'],
    metrics: [
      { label: 'First Collection', value: 'Sold Out' },
      { label: 'Community Growth', value: '8K+' },
      { label: 'Launch ROI', value: '320%' },
      { label: 'Repeat Purchase', value: '42%' },
    ],
    year: '2024',
    color: '#E91E63',
    slug: 'tonivia',
    website: 'https://www.toniviamakeup.com',
    services: ['gtm', 'performance'],
  },
  {
    id: 3,
    title: 'Bobl App',
    category: 'Social Platform GTM',
    tagline: 'Creating 100K+ moments of connection.',
    description:
      'Bobl is a next-generation social networking platform. We executed a 3-month GTM strategy that generated 100K+ in-app engagements, built an active community of 800+ members, and created a waitlist of 500+ eager users.',
    challenge:
      'Social platforms live or die by engagement. Bobl needed a launch strategy that would drive immediate adoption, create viral moments, and build a core community that would fuel organic growth.',
    solution:
      'We designed a phased GTM approach focused on exclusivity and FOMO. By creating a waitlist-driven launch, fostering early adopter communities, and gamifying engagement, we turned Bobl into the app everyone wanted access to.',
    advantageGained:
      'Bobl achieved 100K+ in-app engagements within 3 months. The platform built an active community of 800+ daily users and generated a waitlist of 500+ people. Average session time exceeded 18 minutes, that\'s 3x the industry average.',
    image: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/4d2fcdf1-8d98-4248-a571-d771fb73056a_compressed_u8132877994_Do_a_set_of_9_emotions_of_black_female_memoji_i_w_baebf7a1-ed0f-4531-8ff6-5e99c2a4a406_1.webp',
    coverImage: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/4d2fcdf1-8d98-4248-a571-d771fb73056a_compressed_u8132877994_Do_a_set_of_9_emotions_of_black_female_memoji_i_w_baebf7a1-ed0f-4531-8ff6-5e99c2a4a406_1.webp',
    tags: ['GTM Strategy', 'Community Building', 'App Launch', 'Engagement'],
    metrics: [
      { label: 'In-App Engagement', value: '100K+' },
      { label: 'Active Members', value: '800+' },
      { label: 'Waitlist', value: '500+' },
      { label: 'Avg Session Time', value: '18min' },
    ],
    year: '2024',
    color: '#00897B',
    slug: 'bobl',
    website: 'https://www.webobl.com',
    services: ['gtm', 'seg'],
  },
  {
    id: 5,
    title: 'H06 Rental',
    category: 'Luxury Ride Service',
    tagline: 'Driving 45% sales growth through creative storytelling.',
    description:
      'H06 Rental is a luxury ride service that needed to stand out in a crowded market. We created a creative brand storytelling identity and launched multiple campaigns, including the viral "Thank You H06" during Detty December, driving 45% sales growth through performance marketing.',
    challenge:
      'Luxury ride services compete on price and availability. H06 needed a brand identity that would create emotional connection, drive word-of-mouth, and convert attention into bookings during peak seasons.',
    solution:
      'We crafted a storytelling-first brand identity that positioned H06 as more than transportation, it\'s part of the experience. The "Thank You H06" campaign celebrated customer moments, while performance marketing ensured we captured demand at the right time.',
    advantageGained:
      'H06 Rental achieved 45% sales growth during the campaign period. The "Thank You H06" campaign generated 1.2M+ impressions and became a cultural moment during Detty December. Customer retention increased by 38%, with referrals accounting for 32% of new bookings.',
    image: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/f2855560-43d0-4a7b-9930-f536af8c841f_compressed__NAS8302.webp',
    coverImage: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/f2855560-43d0-4a7b-9930-f536af8c841f_compressed__NAS8302.webp',
    tags: ['Brand Storytelling', 'Campaign Strategy', 'Performance Marketing', 'Sales Growth'],
    metrics: [
      { label: 'Sales Growth', value: '+45%' },
      { label: 'Campaign Reach', value: '1.2M+' },
      { label: 'Retention Increase', value: '+38%' },
      { label: 'Referral Rate', value: '32%' },
    ],
    year: '2024',
    color: '#1A1A1A',
    slug: 'h06',
    services: ['seg', 'performance'],
  },
  {
    id: 9,
    title: 'Savor Restaurant',
    category: 'Restaurant & Bar',
    tagline: 'Igniting the dining experience with fire and flavor.',
    description:
      'Savor Restaurant is an upscale dining and cocktail destination where every dish and drink is a performance. We crafted a brand identity and launch strategy that turned Savor into the go-to spot for unforgettable nights out.',
    challenge:
      'In a city full of dining options, Savor needed to stand out not just for great food, but for an experience people could not stop talking about. The brand needed fire. Literally and figuratively.',
    solution:
      'We built Savor\'s brand around the spectacle of the kitchen and bar. From flaming cocktails to curated social content, every touchpoint was designed to be shared. We launched with a VIP preview series and influencer dinner experiences that created instant buzz.',
    advantageGained:
      'Savor Restaurant achieved sold-out reservations for the first 30 days. Social impressions hit 500K+ within the launch month. The brand became a top-trending dining destination locally, with a waitlist that extended into the second month.',
    image: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/b2ba1c47-1c6d-4f5f-9bc7-c08ffe988f5b_compressed_DSCF1009-1.webp',
    coverImage: 'https://storage.readdy-site.link/project_files/36bc3db0-4578-4b5d-9aaa-bca6fb64e784/b2ba1c47-1c6d-4f5f-9bc7-c08ffe988f5b_compressed_DSCF1009-1.webp',
    tags: ['Brand Launch', 'Experiential Marketing', 'Content Creation', 'Social Strategy'],
    metrics: [
      { label: 'Launch Month', value: 'Sold Out' },
      { label: 'Social Reach', value: '500K+' },
      { label: 'Waitlist', value: '30+ days' },
      { label: 'Trending Rank', value: '#1' },
    ],
    year: '2025',
    color: '#D4A017',
    slug: 'savor',
    services: ['gtm', 'seg'],
  },
  {
    id: 2,
    title: 'Announce Africa',
    category: 'Event Platform GTM',
    tagline: 'Building Africa\'s premier event ticketing experience.',
    description:
      'Announce Africa is revolutionizing event ticketing across the continent. We launched a 2025 GTM strategy that built a thriving community, coordinated 20+ unforgettable events, and established sustainable partnerships with event organizers.',
    challenge:
      'Event ticketing platforms struggle with trust, discovery, and community engagement. Announce Africa needed a strategy that would position them as the go-to platform while building genuine relationships with both organizers and attendees.',
    solution:
      'We developed a community-first GTM approach that prioritized authentic experiences over transactions. Through strategic partnerships, curated event experiences, and a focus on sustainability, we built a platform people trust and love.',
    advantageGained:
      'Announce Africa grew to 5K+ active community members within 6 months. The platform coordinated 20+ successful events, established partnerships with 15+ major event organizers, and increased ticket sales by 280% year-over-year.',
    image: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/announce-africa-event.jpg',
    coverImage: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/announce-cover.jpg',
    tags: ['GTM Strategy', 'Community Building', 'Event Coordination', 'Partnerships'],
    metrics: [
      { label: 'Community Members', value: '5K+' },
      { label: 'Events Coordinated', value: '20+' },
      { label: 'Organizer Partners', value: '15+' },
      { label: 'Sales Growth', value: '+280%' },
    ],
    year: '2025',
    color: '#FF5722',
    slug: 'announce-africa',
    website: 'https://www.announce.africa',
    services: ['gtm', 'seg'],
  },
  {
    id: 4,
    title: 'JuliRose Hotel',
    category: 'Hospitality Brand Launch',
    tagline: 'Redefining luxury hospitality in Port Harcourt.',
    description:
      'JuliRose Hotel is a 120+ room luxury hospitality brand with restaurant and café. We created a comprehensive launch strategy that secured premium partnerships with Singleton, Hennessy, Don Julio, and Moët & Chandon, while executing a PR campaign that dominated traditional and digital media.',
    challenge:
      'Launching a luxury hotel requires more than great facilities. It demands instant credibility, premium partnerships, and a brand identity that commands attention in a competitive hospitality market.',
    solution:
      'We developed a multi-layered launch strategy combining high-profile brand partnerships, traditional PR with major publications (The Sun, Vanguard, Guardian, BusinessDay), and a UGC/influencer amplification campaign. We also created a cohesive brand identity system for JuliRose and all sub-brands.',
    advantageGained:
      'JuliRose Hotel launched with partnerships from 4 premium spirits brands. The PR campaign generated coverage in 4+ major publications and reached 2M+ people. Occupancy rates hit 78% within the first 60 days, with the restaurant becoming a top dining destination.',
    image: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/julirose-hotel-luxury.jpg',
    coverImage: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/julirose-cover.jpg',
    tags: ['Brand Launch', 'PR Strategy', 'Partnerships', 'Brand Identity'],
    metrics: [
      { label: 'Premium Partners', value: '4' },
      { label: 'Media Reach', value: '2M+' },
      { label: 'Occupancy Rate', value: '78%' },
      { label: 'Days to Target', value: '60' },
    ],
    year: '2024',
    color: '#C9A84C',
    slug: 'julirose',
    website: 'https://www.julirosehotel.com',
    services: ['gtm', 'seg', 'performance'],
  },
  {
    id: 6,
    title: 'Jazzy Burger',
    category: 'Food Brand Experience',
    tagline: 'Creating unforgettable burger experiences on Lagos streets.',
    description:
      'Jazzy Burger, founded by Don Jazzy, needed more than great burgers, it needed cultural relevance. We created "Jazzy Burger on the Street," an experiential activation featuring voxpop interviews across Lagos and a standout presence at GTCO Food Festival.',
    challenge:
      'Celebrity-backed food brands often struggle to move beyond the founder\'s fame. Jazzy Burger needed authentic street credibility and experiences that would make it a cultural staple, not just a celebrity endorsement.',
    solution:
      'We took Jazzy Burger directly to the people with street activations, voxpop interviews that captured real reactions, and a memorable GTCO Food Festival presence. Every activation was designed to create shareable moments and genuine connections.',
    advantageGained:
      'The "Jazzy Burger on the Street" campaign generated 3.5M+ social impressions and 850K+ video views. The GTCO Food Festival activation resulted in 2K+ direct sales and 15K+ new social followers. Brand awareness in Lagos increased by 67%.',
    image: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/jazzy-burger-food.jpg',
    coverImage: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/jazzy-cover.jpg',
    tags: ['Experiential Marketing', 'Brand Activation', 'Content Creation', 'Cultural Strategy'],
    metrics: [
      { label: 'Social Impressions', value: '3.5M+' },
      { label: 'Video Views', value: '850K+' },
      { label: 'Festival Sales', value: '2K+' },
      { label: 'Awareness Growth', value: '+67%' },
    ],
    year: '2024',
    color: '#FF9800',
    slug: 'jazzy-burger',
    website: 'https://www.jazzyburger.com',
    services: ['seg', 'performance'],
  },
  {
    id: 7,
    title: 'Eve After Dark',
    category: 'Cloud Kitchen Growth',
    tagline: 'Amplifying sales through smart marketing promotions.',
    description:
      'Eve After Dark is a Lagos cloud kitchen that needed to cut through the noise of food delivery apps. We amplified sales through strategic marketing promotions, discount campaigns, UGC content, influencer partnerships, and a unique content series that built brand personality.',
    challenge:
      'Cloud kitchens face intense competition and thin margins. Eve After Dark needed a marketing strategy that would drive immediate sales while building long-term brand recognition, all without a physical storefront.',
    solution:
      'We created a promotion-driven growth strategy combining limited-time discounts, UGC campaigns that showcased real customer experiences, influencer partnerships for reach, and a content series that gave the brand a distinct voice and personality.',
    advantageGained:
      'Eve After Dark achieved 180% sales growth during the campaign period. The UGC campaign generated 500+ customer posts and 2.2M+ impressions. Average order value increased by 28%, and the brand became a top-rated cloud kitchen on delivery platforms.',
    image: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/eve-after-dark-food.jpg',
    coverImage: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/eve-cover.jpg',
    tags: ['Marketing Promotions', 'UGC Strategy', 'Influencer Marketing', 'Content Series'],
    metrics: [
      { label: 'Sales Growth', value: '+180%' },
      { label: 'UGC Posts', value: '500+' },
      { label: 'Campaign Reach', value: '2.2M+' },
      { label: 'AOV Increase', value: '+28%' },
    ],
    year: '2024',
    color: '#BF360C',
    slug: 'eve-after-dark',
    website: 'https://www.eveafterdark.com',
    services: ['seg', 'performance'],
  },
  {
    id: 8,
    title: 'Elite Stans',
    category: 'Creator Platform Rebrand',
    tagline: 'Connecting creators with their most passionate fans.',
    description:
      'Elite Stans is a subscription-based creator platform that needed to reconnect with its target audience. We reimagined the branding and brand identity to resonate with creators and fans, built a robust creator network, and championed partnerships with brands like Quidax and Amazon.',
    challenge:
      'Creator platforms must balance creator needs with fan experience while maintaining platform credibility. Elite Stans needed a rebrand that would attract premium creators and engaged fans, plus partnerships that would add value to both sides.',
    solution:
      'We developed a sophisticated brand identity that signals exclusivity. The creator network strategy focused on quality over quantity, while strategic partnerships with Quidax and Amazon provided creators with monetization tools and fans with premium perks.',
    advantageGained:
      'Elite Stans onboarded 120+ verified creators within 6 months. The platform grew to 25K+ active subscribers with an average subscription value of ₦3,500. Partnerships with Quidax and Amazon added ₦15M+ in creator earnings. Retention rate hit 72%.',
    image: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/elite-stans-platform.jpg',
    coverImage: 'https://static.readdy.ai/image/f4a2a26b11f27f3319c3aa0e3efbc59d/elite-cover.jpg',
    tags: ['Brand Rebrand', 'Creator Network', 'Partnerships', 'Platform Strategy'],
    metrics: [
      { label: 'Verified Creators', value: '120+' },
      { label: 'Active Subscribers', value: '25K+' },
      { label: 'Creator Earnings', value: '₦15M+' },
      { label: 'Retention Rate', value: '72%' },
    ],
    year: '2024',
    color: '#8B6914',
    slug: 'elite-stans',
    website: 'https://www.elitestans.com',
    services: ['audit', 'seg'],
  },
];

// Helper to get project data with localStorage overrides
export function getProjectData(projectId: number): Project | undefined {
  const project = defaultProjects.find((p) => p.id === projectId);
  if (!project) return undefined;

  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    const overrides = stored ? JSON.parse(stored) : {};
    const projectOverrides = overrides[projectId] || {};

    return {
      ...project,
      ...projectOverrides,
      metrics: projectOverrides.metrics || project.metrics,
    };
  } catch {
    return project;
  }
}

// Helper to get all projects with localStorage overrides
export function getAllProjects(): Project[] {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    const overrides = stored ? JSON.parse(stored) : {};

    return defaultProjects.map((project) => {
      const projectOverrides = overrides[project.id] || {};
      return {
        ...project,
        ...projectOverrides,
        metrics: projectOverrides.metrics || project.metrics,
      };
    });
  } catch {
    return defaultProjects;
  }
}

// Helper to get brand logo
export function getBrandLogo(projectSlug: string): string {
  try {
    return localStorage.getItem(`brand-logo-${projectSlug}`) || '';
  } catch {
    return '';
  }
}

// Helper to get cover image
export function getCoverImage(projectId: number, defaultImage: string): string {
  try {
    const stored = localStorage.getItem(COVER_STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : {};
    return data[projectId] ?? defaultImage;
  } catch {
    return defaultImage;
  }
}