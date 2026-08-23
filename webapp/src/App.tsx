import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Mandate } from "./components/Mandate";
import { Protocol } from "./components/Protocol";
import { Demo } from "./components/Demo";
import { Guarantees } from "./components/Guarantees";
import { Roles } from "./components/Roles";
import { Roadmap } from "./components/Roadmap";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mandate />
        <Protocol />
        <Demo />
        <Guarantees />
        <Roles />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
