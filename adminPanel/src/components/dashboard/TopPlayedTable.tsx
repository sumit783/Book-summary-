import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { motion } from 'motion/react';
import { Eye, Play, Heart, TrendingUp, MoreHorizontal } from 'lucide-react';

const topSummaries = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      plays: "12,453",
      genre: "Self-Help",
      dateAdded: "Dec 15",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+15%",
      rating: 4.8,
      duration: "45 min"
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      plays: "9,234",
      genre: "Productivity",
      dateAdded: "Dec 12",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+8%",
      rating: 4.6,
      duration: "38 min"
    },
    {
      title: "Think Again",
      author: "Adam Grant",
      plays: "8,876",
      genre: "Psychology",
      dateAdded: "Dec 10",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+12%",
      rating: 4.7,
      duration: "42 min"
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      plays: "7,654",
      genre: "Finance",
      dateAdded: "Dec 8",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+5%",
      rating: 4.5,
      duration: "35 min"
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      plays: "6,543",
      genre: "Business",
      dateAdded: "Dec 5",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+3%",
      rating: 4.4,
      duration: "40 min"
    },
  ]

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
          <div className="overflow-hidden rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30">
                  <TableHead className="w-[100px] text-foreground font-semibold">Cover</TableHead>
                  <TableHead className="text-foreground font-semibold">Book Details</TableHead>
                  <TableHead className="text-foreground font-semibold">Plays</TableHead>
                  <TableHead className="text-foreground font-semibold">Genre</TableHead>
                  <TableHead className="text-foreground font-semibold">Rating</TableHead>
                  <TableHead className="text-foreground font-semibold">Duration</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSummaries.map((book, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-border hover:bg-muted/50 transition-colors duration-200 group"
                  >
                    <TableCell className="w-[100px]">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-12 h-12 rounded-lg object-cover shadow-md" 
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {book.title}
                        </div>
                        <div className="text-sm text-muted-foreground">{book.author}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{book.dateAdded}</span>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            {book.trend}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{book.plays}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {book.genre}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">{book.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-muted-foreground'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{book.duration}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Heart className="h-4 w-4 text-muted-foreground" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </motion.button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">44,760</div>
              <p className="text-sm text-muted-foreground">Total Plays</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">5</div>
              <p className="text-sm text-muted-foreground">Top Books</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">4.6</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TopPlayedTable