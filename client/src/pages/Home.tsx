import HeroSection from "@/components/HomePage/HeroSection"
import NewReleases from "@/components/HomePage/NewReleases"
import StatusCards from "@/components/HomePage/StatusCards"
import TrendingBooks from "@/components/HomePage/TrendingBooks"


function Home() {
  return (
    <div className=" min-h-screen">
      <HeroSection />
      <TrendingBooks />
      <NewReleases />
      <StatusCards />
    </div>
  )
}

export default Home