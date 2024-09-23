import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-green-900 underline text-2xl">Hello world</div>
    </>
  );
}

export default App;
