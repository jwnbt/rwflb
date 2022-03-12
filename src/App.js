import { useState } from "react";
import "./App.css";

function AddGoal({ onAdd }) {
  const [goal, setGoal] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    goal !== "" && onAdd({ name: goal });
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

function Goals() {
  const [goals, setGoals] = useState([]);
  const handleAdd = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };
  return (
    <div className="console">
      <AddGoal onAdd={handleAdd} />
      <div className="cur-goal-label">{"Current Goals Tracking"}</div>
      <GoalsTable goals={goals} />
    </div>
  );
}

function Goal(props) {
  return <div>{props.goalName}</div>;
}

function GoalsTable({ goals }) {
  return (
    <table className="goal">
      <tbody>
        {goals.map((goal, index) => {
          return (
            <tr key={index}>
              <td style={{ width: "100%", fontSize: "20px" }}>
                <Goal goalName={goal.name} />
              </td>
              <td style={{ width: "100%", fontSize: "20px" }}>
                <button type="button">{"done"}</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div className="app">
      <Goals />
    </div>
  );
}

export default App;
