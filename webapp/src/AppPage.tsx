import { useEffect } from "react";
import { AppHeader } from "./components/AppHeader";
import { Workspace } from "./components/Workspace";

/** /app — the four-party workspace on its own page, loaded only when visited. */
export default function AppPage() {
  useEffect(() => {
    document.title = "Workspace · Equilux";
  }, []);

  return (
    <div className="min-h-dvh bg-night-deep">
      <AppHeader current="app" />
      <main>
        <Workspace />
      </main>
    </div>
  );
}
