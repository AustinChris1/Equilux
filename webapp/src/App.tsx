import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Mandate } from "./components/Mandate";
import { Protocol } from "./components/Protocol";
import { Demo } from "./components/Demo";
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
        <Workspace />
        <Mandate />
        <Protocol />
        <Demo />
        <Guarantees />
        <Scope />
        <Roles />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
