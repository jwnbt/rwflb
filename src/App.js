import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const handleClick = () => {
    setText(Math.random());
  };
  return <div onclick={handleClick}>{text}</div>;
}

export default App;
