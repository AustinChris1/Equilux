import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Equinox } from "./components/landing/Equinox";
import { Indicators } from "./components/landing/Indicators";
import { Cheats } from "./components/landing/Cheats";
import { Scale } from "./components/landing/Scale";
import { WhoSees } from "./components/landing/WhoSees";
import { Mandate } from "./components/Mandate";
import { Scope } from "./components/Scope";
import { Roadmap } from "./components/Roadmap";
import { TryIt } from "./components/TryIt";
import { Footer } from "./components/Footer";

// Equinox: one scroll from a sealed night (salaries hidden) to a proven, equal day.
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Equinox />
        <Indicators />
        <Scale />
        <Cheats />
        <WhoSees />
        <Mandate />
        <Scope />
        <Roadmap />
        <TryIt />
      </main>
      <Footer />
    </>
  );
}
