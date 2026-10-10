import { useEffect } from "react";
import { Workspace } from "./components/Workspace";

/** /app: the pay-report story, loaded only when visited. Workspace draws its own header (it owns the wallet). */
export default function AppPage() {
  useEffect(() => {
    document.title = "Try it · Equilux";
  }, []);

  return (
    <div className="min-h-dvh bg-night-deep">
      <Workspace />
    </div>
  );
}
