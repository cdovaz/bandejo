"use client";
import { useState } from "react";
import HomeScreen from "../src/screens/HomeScreen";
import LoginScreen from "../src/screens/LoginScreen";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <HomeScreen /> : <LoginScreen onLogin={handleLogin} />;
}
