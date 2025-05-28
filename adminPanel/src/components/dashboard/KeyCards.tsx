import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book, Users, Play, Heart } from 'lucide-react';

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default function KeyCards() {
  const [counts, setCounts] = useState({
    books: 0,
    users: 0,
    plays: 0,
    favorites: 0
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

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(counts.books)}</div>
          </CardContent>
        </Card>

        <Card className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(counts.users)}</div>
          </CardContent>
        </Card>

        <Card className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>    
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Plays</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(counts.plays)}</div>
          </CardContent>
        </Card>

        <Card className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(counts.favorites)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}