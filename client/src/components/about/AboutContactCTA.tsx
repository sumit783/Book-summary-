const AboutContactCTA = () => (
  <div className="w-full max-w-xl mx-auto mb-20 relative z-10">
    <div className="bg-white/10 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-white/20 flex flex-col items-center">
      <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
        Want to connect or contribute?
      </h3>
      <p className="text-gray-800 dark:text-gray-200 text-center mb-6">
        We love hearing from readers and collaborators. Reach out to us or join our community!
      </p>
      <a
        href="mailto:contact@echobooks.com"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-indigo-700 transition-all duration-200"
      >
        Contact Us
      </a>
    </div>
  </div>
);

export default AboutContactCTA; 