import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TryIt } from "./components/TryIt";
import { Mandate } from "./components/Mandate";
import { Protocol } from "./components/Protocol";
import { Guarantees } from "./components/Guarantees";
import { Scope } from "./components/Scope";
import { Roles } from "./components/Roles";
import { Roadmap } from "./components/Roadmap";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TryIt />
        <Mandate />
        <Protocol />
        <Guarantees />
        <Scope />
        <Roles />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
