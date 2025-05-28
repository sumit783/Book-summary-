export interface Book {
    id: string;
    title: string;
    categories: string[];
    author: string;
    coverImage: string;
    summary: string;
    audioUrl?: string;
    duration: number;
    paragraphs: string[];
    publishedDate: string;
    featured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  }