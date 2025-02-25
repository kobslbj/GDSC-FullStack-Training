"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("https://gdsc-fullstack-training.onrender.com/auth/login", {
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
                throw new Error(errorData.error);
            }

            const {token} = await res.json();
            localStorage.setItem("token", token);
            router.push("/mainpage");
        } catch (err) {
            setError(err.message);
        }
    };


return (
    <div className={styles.container}>
      <h2>登入</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleLogin}>
        <input className={styles.input}type="text" placeholder="使用者名稱" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className={styles.input} type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className={styles.button} type="submit">登入</button>
      </form>
      <p>沒有帳號？<a href="/signup">註冊</a></p>
    </div>
  );
};