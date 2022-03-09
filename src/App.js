import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("click me");
  const handleClick = () => {
    setText(Math.random());
  };
  return <button onClick={handleClick}>{text}</button>;
}

export default App;
