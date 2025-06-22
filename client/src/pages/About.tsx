import AboutHeader from "@/components/about/AboutHeader";
import AboutMission from "@/components/about/AboutMission";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutTeam from "@/components/about/AboutTeam";
import AboutContactCTA from "@/components/about/AboutContactCTA";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      {/* Animated gradient blobs background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-400 opacity-30 rounded-full filter blur-3xl animate-blob1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-gradient-to-tr from-pink-400 via-indigo-300 to-purple-400 opacity-20 rounded-full filter blur-2xl animate-blob2" />
      </div>
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
      <AboutTeam />
      <AboutContactCTA />
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.05); }
          66% { transform: translate(20px, -25px) scale(0.9); }
        }
        .animate-blob1 { animation: blob1 16s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 18s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

export default About; 