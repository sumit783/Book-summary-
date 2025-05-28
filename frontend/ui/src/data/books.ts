import type { Book } from "../types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    categories: ["Self-Help", "Personal Development", "Psychology"],
    author: "James Clear",
    coverImage: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    summary: "Tiny Changes, Remarkable Results. An easy and proven way to build good habits and break bad ones.",
    duration: 320, // seconds
    paragraphs: [
      "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      "If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change.",
      "You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.",
      "Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible."
    ],
    publishedDate: "2018-10-16",
    featured: true,
    seoTitle: "Atomic Habits by James Clear - Book Summary",
    seoDescription: "Read or listen to the key insights from Atomic Habits by James Clear. Learn how tiny changes can lead to remarkable results.",
    seoKeywords: ["atomic habits", "james clear", "habit formation", "self improvement"]
  },
  {
    id: "2",
    title: "Deep Work",
    categories: ["Productivity", "Self-Help", "Psychology"],
    author: "Cal Newport",
    coverImage: "https://m.media-amazon.com/images/I/51EQlMnBSxL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    summary: "Rules for Focused Success in a Distracted World",
    duration: 280, // seconds
    paragraphs: [
      "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.",
      "Deep work will make you better at what you do and provide the sense of true fulfillment that comes from craftsmanship. In short, deep work is like a super power in our increasingly competitive twenty-first century economy.",
      "And yet, most people have lost the ability to go deep—spending their days instead in a frantic blur of e-mail and social media, not even realizing there's a better way.",
      "In Deep Work, author and professor Cal Newport flips the narrative on impact in a connected age. Instead of arguing distraction is bad, he instead celebrates the power of its opposite."
    ],
    publishedDate: "2016-01-05",
    featured: true,
    seoTitle: "Deep Work by Cal Newport - Book Summary",
    seoDescription: "Discover the key insights from Deep Work by Cal Newport. Learn how to focus without distraction in our increasingly distracted world.",
    seoKeywords: ["deep work", "cal newport", "focus", "productivity"]
  },
  {
    id: "3",
    title: "The Psychology of Money",
    categories: ["Finance", "Psychology", "Self-Help"],
    author: "Morgan Housel",
    coverImage: "https://m.media-amazon.com/images/I/41vC8m9YJ8L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    summary: "Timeless lessons on wealth, greed, and happiness",
    duration: 310, // seconds
    paragraphs: [
      "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
      "Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.",
      "In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.",
      "The book isn't about what to do with your money. It's about what happens in your head when you try to figure out what to do with your money."
    ],
    publishedDate: "2020-09-08",
    seoTitle: "The Psychology of Money by Morgan Housel - Book Summary",
    seoDescription: "Explore the key insights from The Psychology of Money by Morgan Housel. Learn timeless lessons on wealth, greed, and happiness.",
    seoKeywords: ["psychology of money", "morgan housel", "personal finance", "investing"]
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};
