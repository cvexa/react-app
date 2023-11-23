import MainBanner from "./MainBanner.jsx";
import FeaturedSection from "./FeaturedSection.jsx";
import BestDeals from "./BestDeals.jsx";
import ListOfProperties from "./ListOfProperties.jsx";

export default function Home() {
    return (
      <>
          <MainBanner/>
          <FeaturedSection/>
          <BestDeals/>
          <ListOfProperties/>
      </>
    );
}