export interface PersonalProfile {
  name: string;
  fullNameWithTitle: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  avatarUrl: string;
}

export interface Milestone {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
  highlight?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'networking' | 'software' | 'other';
  credentialUrl?: string;
  imageUrl?: string;
}

export interface TeamCollaborator {
  name: string;
  role: string;
  degree?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  coverImage: string;
  screenshots: string[];
  collaborators?: TeamCollaborator[];
}

export interface JournalArticle {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnail: string;
  styleTag: 'analog' | 'cctv' | 'grainy';
}

export interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface SiteContent {
  profile: PersonalProfile;
  milestones: Milestone[];
  certifications: Certification[];
  projects: Project[];
  journalArticles: JournalArticle[];
  defaultMusicFavorites: string[];
}
