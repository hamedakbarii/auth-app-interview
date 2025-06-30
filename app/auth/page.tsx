"use client";

import styles from "./auth.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const isValid = /^(\+98|0)?9\d{9}$/.test(phone);

    if (!isValid) {
      setError("شماره موبایل معتبر نیست");
      return;
    }

    setError("");

    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    // console.log(data.results[0]);

    const user = data.results[0];
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-4xl">Auth App</h1>

      <div className={styles.container}>
        <h1>ورود</h1>
        <Input
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button onClick={handleLogin}>ورود</Button>
      </div>
    </div>
  );
};

export default AuthPage;
