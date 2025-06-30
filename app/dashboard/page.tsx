"use client";

import styles from "./dashboard.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/auth");
    } else {
      const parsed = JSON.parse(user);
      const name = parsed.name?.first || "User";
      setUsername(name);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <div className={styles.container}>
      {username && <h1>Welcome to the Dashboard, {username}!</h1>}

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
