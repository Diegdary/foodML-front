"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function MePage() {
  const { user, fetchWithAuth } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchWithAuth("http://localhost:8000/api/users/me/");
      setData(res);
    };
    load();
  }, [fetchWithAuth]);

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}