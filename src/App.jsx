
import { useState } from "react";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

import Hero from "./sections/Hero";
import Showroom from "./sections/Showroom";
import Collection from "./sections/Collection";
import Performance from "./sections/Performance";
import RaceMode from "./sections/RaceMode";
import Gallery from "./sections/Gallery";
import Footer from "./sections/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <Navbar />

          <main id="main-content">
            <Hero />
            <Showroom />
            <Collection />
            <Performance />
            <RaceMode />
            <Gallery />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
