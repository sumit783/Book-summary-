import { Sparkles, BookOpenCheck, BookmarkCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    title: "Concise Summaries",
    desc: "Get the key ideas from top books in minutes, not hours.",
  },
  {
    icon: <BookOpenCheck className="w-8 h-8 text-pink-400" />,
    title: "Curated Selection",
    desc: "Handpicked, high-impact books across genres and topics.",
  },
  {
    icon: <BookmarkCheck className="w-8 h-8 text-indigo-400" />,
    title: "Save & Track Progress",
    desc: "Bookmark favorites and track your reading journey.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-purple-300" />,
    title: "Audio Summaries",
    desc: "Listen on the go with high-quality audio versions.",
  },
];

const AboutFeatures = () => (
  <div className="w-full max-w-5xl mx-auto mb-16 relative z-10">
    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
      Why EchoBooks?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 dark:border-white/20 transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="mb-4">{f.icon}</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center">{f.title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-center text-sm">{f.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AboutFeatures; 