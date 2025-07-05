import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
      <div className="w-full md:max-w-3xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-primary drop-shadow tracking-tight text-center">Settings</h1>
        <div className="bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg p-6 border border-primary/10">
          {/* Add your settings content here */}
        </div>
      </div>
    </div>
  );
};

export default Settings;