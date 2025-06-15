import React, { useState } from "react";
import Shortener from "./components/Shortener";
import Analytics from "./components/Analytics";
import "./App.css";

export const servicebaseurl = 'https://url-shortner-api-sw4a.onrender.com/';

function App() {
  return (
    <div className="container">
      <Analytics />
      <Shortener />
    </div>
  )
}

export default App;
