'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'; // Use your existing CSS module

const API_BASE_URL = 'https://gdsc-fullstack-training.onrender.com';

export default function LoginPage() {
  // const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  // const [name, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const endpoint = isLogin ? '/auth/login' : '/auth/register';
  //   try {
  //     console.log('Submitting:', {name, password});
  //     const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
  //       name: name,
  //       password,
  //     });

  //     if (isLogin) {
  //       // Save JWT Token to cookies
  //       console.log('Login Successful:', response.data);
  //       Cookies.set('token', response.data.token, { expires: 1 }); // 1 day expiry
  //       Cookies.set('name', response.data.name, { expires: 1 });
  //       router.push('/'); // Redirect to Todo List page
  //     } else {
  //       alert('Registration successful! Please log in.');
  //       setIsLogin(true); // Switch back to login form
  //     }
  //   } catch (error) {
  //     console.error('API Error:', error.response?.data || error.message);
  //     alert(error.response?.data?.error || 'Something went wrong.');
  //   }
  // };

  // return (
  //   <div className={styles.container}>
  //     <h1 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         value={name}
  //         onChange={(e) => setUsername(e.target.value)}
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
  //     </form>
  //     <button onClick={() => setIsLogin(!isLogin)}>
  //       {isLogin ? 'Create an Account' : 'Already have an account? Login'}
  //     </button>
  //   </div>
  // );
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login (Temporarily Disabled)</h1>
      <button onClick={() => router.push('/')}>Skip Login & Go to Todo List</button>
    </div>
  );
}
