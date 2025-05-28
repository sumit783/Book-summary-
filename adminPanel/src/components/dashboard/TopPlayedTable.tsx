import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const topSummaries = [
    {
      title: "Atomic Habits",
      plays: "12,453",
      genre: "Self-Help",
      dateAdded: "Dec 15",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Deep Work",
      plays: "9,234",
      genre: "Productivity",
      dateAdded: "Dec 12",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Think Again",
      plays: "8,876",
      genre: "Psychology",
      dateAdded: "Dec 10",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "The Psychology of Money",
      plays: "7,654",
      genre: "Finance",
      dateAdded: "Dec 8",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Zero to One",
      plays: "6,543",
      genre: "Business",
      dateAdded: "Dec 5",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

export function TopPlayedTable() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Top Played Summaries</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cover</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Plays</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topSummaries.map((book, index) => (
            <TableRow key={index}>
                <TableCell className="w-[100px]">
                <img src={book.image} alt={book.title} className="w-10 h-10 rounded-md object-cover" />
                </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  <span className="font-medium">{book.title}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{book.plays}</TableCell>
              <TableCell>
                <Badge variant="secondary">{book.genre}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{book.dateAdded}</TableCell>
                <TableCell className="text-right">
                    
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}

export default TopPlayedTable