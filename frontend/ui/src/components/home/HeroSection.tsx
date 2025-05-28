import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BookOpen, Book } from "lucide-react"
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision"

function HeroSection() {
  return (
    <BackgroundBeamsWithCollision>
    <section className="pt-32 pb-20 px-4 relative z-20">
    <div className="container mx-auto text-center max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
        Books that Speak to You
      </h1>
      <p className="text-xl md:text-2xl mb-10 text-white/80">
        Discover insightful summaries of today's most impactful books with synchronized audio narration.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/books">
          <Button size="lg" className="gap-2 bg-purple-400 hover:bg-purple-500 text-white hover:text-white shadow-lg hover:shadow-xl">
            <BookOpen size={18} /> Browse Library
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="outline" size="lg" className="gap-2 bg-black/10 hover:bg-black/20 text-white hover:text-white border-white/20 hover:border-white/30 hover:shadow-lg">
            <Book size={18} /> Learn More
          </Button>
        </Link>
      </div>
    </div>
  </section>
    </BackgroundBeamsWithCollision>
  )
}

export default HeroSection