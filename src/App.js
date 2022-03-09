import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("click me");
  const handleClick = () => {
    setText(Math.random());
  };
  return <div onClick={handleClick}>{text}</div>;
}

export default App;
