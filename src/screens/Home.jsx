import React from "react";
// import FeaturedProducts from "../components/Home_Components/FeaturedProducts";
import Main_Section from "../components/Home_Components/Main_Section";
import Our_Approach_Section from "../components/Home_Components/Our_Approach_Section";
import Services_Section from "../components/Home_Components/Services_Section";
import Testimonials_Section from "../components/Home_Components/Testimonials_Section";

const Home = () => {
  return (
    <div>
      {/* MAIN SECTION */}
      <Main_Section />

      {/* OUR APPROACH */}
      <Our_Approach_Section />

      {/* SERVICES */}
      <Services_Section />


      {/* FEATURED PRODUCTS */}
      {/* <div className="bg-emerald-50 space-y-6 p-5">
      <h1 className="text-center text-2xl font-bold">Featured Products</h1>
      <FeaturedProducts />
    </div> */}


      {/* TESTIMONIALS */}
      <Testimonials_Section />


    </div>
  );
};

export default Home;
