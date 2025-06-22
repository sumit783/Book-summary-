type BookStoreCategoriesProps = {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const BookStoreCategories = ({ categories, activeCategory, setActiveCategory }: BookStoreCategoriesProps) => (
  <div className="flex overflow-x-auto space-x-2 border-white/20 border-1 py-2 px-4 rounded-lg my-8 custom-scrollbar">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-200 whitespace-nowrap border border-white/20 text-white bg-black hover:bg-slate-900 hover:border-white/30 shadow-lg ${
          activeCategory === category ? "bg-purple-500 hover:bg-purple-600 border-white/30" : ""
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default BookStoreCategories; 