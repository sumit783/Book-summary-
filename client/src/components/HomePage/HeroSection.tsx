import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BookOpen, Book } from "lucide-react"
import { motion } from "motion/react";
import { ImagesSlider } from "../ui/images-slider"

function HeroSection() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <ImagesSlider className="h-[30rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
    <section className="pt-32 pb-20 px-4 relative z-20 ">
    <div className="container mx-auto text-center max-w-3xl">
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
        Books that Speak to You
      </h1>
      <p className="text-white text-xl md:text-2xl mb-10">
        Discover insightful summaries of today's most impactful books with synchronized audio narration.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/books">
          <Button size="lg" className="gap-2 text-white hover:text-white shadow-lg hover:shadow-xl">
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
      </motion.div>
  </ImagesSlider>
  )
}

export default HeroSection