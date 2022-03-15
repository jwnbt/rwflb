import { useState } from "react";
import "./AddAGoal.css";

function AddAGoal({ onAdd }) {
  const [goal, setGoal] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    goal !== "" && onAdd({ pkey: Math.random(), name: goal, done: false, date: null });
    setGoal("");
  };
  const handleChange = (event) => setGoal(event.target.value);
  return (
    <form onSubmit={handleSubmit}>
      <input className="input" type="text" value={goal} placeholder="enter a goal to track" onChange={handleChange} />
      <input className="submit-btn" type="submit" value="add" />
    </form>
  );
}

export default AddAGoal;
