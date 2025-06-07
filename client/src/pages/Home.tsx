import HeroSection from "@/components/HomePage/HeroSection"
import NewReleases from "@/components/HomePage/NewReleases"
import TrendingBooks from "@/components/HomePage/TrendingBooks"


function Home() {
  return (
    <>
    <HeroSection />
    <TrendingBooks />
    <NewReleases />
    </>
  )
}

export default Home