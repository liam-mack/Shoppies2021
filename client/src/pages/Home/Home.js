/* eslint-disable */
import React from "react";
import PrimaryComponent from "../../components/PrimaryComponent/PrimaryComponent";
import BannerImage from "../../components/BannerImage/BannerImage";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/NavTabs/NavTabs";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive} from "./HomeData";

// Home page component, rendering code page components and descriptions/links to other pages
function Home() {
  return (
    <div>
      <ScrollToTopOnMount />
      <Nav />
      <BannerImage banner="HomeBanner" alt="Home banner" title="Welcome!" desc="" name=""/>
      <PrimaryComponent {...homeObjOne} />
      <PrimaryComponent {...homeObjTwo} />
      <PrimaryComponent {...homeObjThree} />
      <PrimaryComponent {...homeObjFour} />
      <PrimaryComponent {...homeObjFive} />
      <Footer />
    </div>
  );
}

export default Home;