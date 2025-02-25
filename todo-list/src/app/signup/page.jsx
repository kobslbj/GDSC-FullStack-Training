"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== checkPassword) {
            setError("密碼確認不符");
            return;
        }
        try {
            const res = await fetch("https://gdsc-fullstack-training.onrender.com/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error);
            }
            router.push("/login");

        } catch (err) {
            setError(err.message);
        }

    }

    return (
        <div className={styles.container}>
          <h2>Signup</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSignup}>
            <input className={styles.input} type="text" placeholder="使用者名稱" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={styles.input} type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className={styles.input} type="password" placeholder="確認密碼" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} required />
            <button className={styles.button} type="submit">註冊</button>
          </form>
          <p>已有帳號？<a href="/login">登入</a></p>
        </div>
      );
}