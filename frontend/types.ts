export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  tags: string[];
}

export interface VideoResult {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string; // Caption
  tags?: string[]; // Hashtags
  duration: string;
  quality: string;
  type: 'Reel' | 'Video' | 'Story';
  downloadUrl: string;
  previewUrl: string; // New field for inline preview
  timestamp: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DownloadHistoryItem extends VideoResult { }