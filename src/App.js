import React from "react";

import "./App.css";
import Forms from "./components/Forms/Forms.js";
import { Header } from "./components/Headers/Header.js";

function App() {
  return (
    <div className="App">
      <div className="form-group">
        <Header />

        <Forms />
      </div>
    </div>
  );
}

export default App;
