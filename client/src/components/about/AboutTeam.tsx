const team = [
  {
    name: "Amit Kumar",
    role: "Founder & Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Content Lead",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const AboutTeam = () => (
  <div className="w-full max-w-4xl mx-auto mb-16 relative z-10">
    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
      Meet the Team
    </h2>
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
      {team.map((member, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 dark:border-white/20 w-64 transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mb-4 shadow-lg border-4 border-white/30 object-cover" />
          <div className="text-lg font-semibold text-gray-800 dark:text-white mb-1 text-center">{member.name}</div>
          <div className="text-purple-700 dark:text-purple-200 text-sm text-center">{member.role}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AboutTeam; 