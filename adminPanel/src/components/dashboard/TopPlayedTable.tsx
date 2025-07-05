import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import BookTable from '../books/BookTable';
import { bookData } from '@/data/bookData';

// Map bookData to AdminBook[]
const adminBooks = bookData.map((b) => ({
  ...b,
  plays: b.reviews || Math.floor(Math.random() * 10000) + 1000,
  createdBy: 'System',
  active: true
}));

const top3Books = adminBooks.slice(0, 3);

export function TopPlayedTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-foreground">Top Played Summaries</CardTitle>
                <p className="text-sm text-muted-foreground">Most popular book summaries this week</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <BookTable books={top3Books} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TopPlayedTable