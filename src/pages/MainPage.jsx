import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import '../App.css';

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
