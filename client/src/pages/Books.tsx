import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

function Books() {
  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 py-8">
        {/* search books */}
      <div className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search any books..."
                className="pl-4 pr-4 py-3 text-lg bg-white/90 backdrop-blur-sm border-white/20 shadow-sm"
              />
            </div>
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm border-white/20 shadow-sm">
              <Filter className="w-4 h-4 md:mr-2" />
              <p className="hidden md:block">Filter</p>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 px-6 shadow-sm">
              <Search className="w-4 h-4 md:mr-2" />
              <p className="hidden md:block">SEARCH</p>
            </Button>
          </div>
        </div>
        {/* books list */}
        <div className="lg:w-4/5 w-full mx-auto bg-card rounded-lg shadow-lg p-6">
        </div>
      </div>
    </div>
  )
}

export default Books