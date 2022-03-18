import { useState } from "react";
import "./AddAGoal.css";

function AddAGoal() {
  const [goal, setGoal] = useState("");
  const addGoal = () => {
    fetch("https://rwflb.herokuapp.com/goals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: goal,
        done: false,
        date: new Date().toJSON()
      })
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    goal !== "" && addGoal();
    setGoal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={goal}
        placeholder="enter a goal to track"
        onChange={(event) => setGoal(event.target.value)}
      />
      <input className="submit-btn" type="submit" value="add" />
    </form>
  );
}

export default AddAGoal;
