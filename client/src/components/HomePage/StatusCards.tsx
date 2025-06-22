import { BookOpen, Headphones, Star, TrendingUp } from 'lucide-react';

function StatusCards() {
    const stats = [
        { label: 'Books Available', value: '500+', icon: BookOpen },
        { label: 'Audio Hours', value: '2,000+', icon: Headphones },
        { label: 'Average Rating', value: '4.8', icon: Star },
        { label: 'Active Users', value: '10K+', icon: TrendingUp },
      ];
  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 " />
              </div>
              <div className="text-2xl font-bold  mb-1">{stat.value}</div>
              <div className="text-sm ">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  )
}

export default StatusCards