import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book, Users, Play, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const getRandomTrend = () => {
  return Math.random() > 0.5 ? 'up' : 'down';
};

const getRandomPercentage = () => {
  return Math.floor(Math.random() * 20) + 1;
};

export default function KeyCards() {
  const [counts, setCounts] = useState({
    books: 0,
    users: 0,
    plays: 0,
    favorites: 0
  });

  const [trends] = useState({
    books: getRandomTrend(),
    users: getRandomTrend(),
    plays: getRandomTrend(),
    favorites: getRandomTrend()
  });

  const [percentages] = useState({
    books: getRandomPercentage(),
    users: getRandomPercentage(),
    plays: getRandomPercentage(),
    favorites: getRandomPercentage()
  });

  useEffect(() => {
    const targetCounts = {
      books: 2451,
      users: 18200,
      plays: 142800,
      favorites: 8392
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        books: Math.floor(targetCounts.books * progress),
        users: Math.floor(targetCounts.users * progress),
        plays: Math.floor(targetCounts.plays * progress),
        favorites: Math.floor(targetCounts.favorites * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const cardData = [
    {
      title: "Total Books",
      value: counts.books,
      icon: Book,
      trend: trends.books,
      percentage: percentages.books,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      title: "Total Users",
      value: counts.users,
      icon: Users,
      trend: trends.users,
      percentage: percentages.users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600"
    },
    {
      title: "Total Plays",
      value: counts.plays,
      icon: Play,
      trend: trends.plays,
      percentage: percentages.plays,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600"
    },
    {
      title: "Total Favorites",
      value: counts.favorites,
      icon: Heart,
      trend: trends.favorites,
      percentage: percentages.favorites,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500/10",
      iconColor: "text-pink-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Key Metrics</h2>
          <p className="text-muted-foreground">Real-time statistics and performance indicators</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Animated Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite'
              }} />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground group-hover:text-foreground transition-colors">
                    {formatNumber(card.value)}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {card.percentage}%
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full bg-gradient-to-r ${card.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(card.percentage * 5, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Session</p>
              <p className="text-lg font-semibold text-foreground">24.5 min</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Play className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-lg font-semibold text-foreground">87.3%</p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-lg font-semibold text-foreground">1,234</p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}