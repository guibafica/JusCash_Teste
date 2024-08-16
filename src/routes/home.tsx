import { useState } from "react";

import { Loading } from "../components/Loading";

export function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loading isLoading={loading} />

      <div className="h-screen w-screen flex items-center justify-center">
        <h1>Home</h1>
      </div>
    </>
  );
}
