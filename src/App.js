import { useState } from "react";
import "./App.css";

const data = [
  { name: "workout", done: false, data: null },
  { name: "eat", done: false, data: null },
  { name: "study", done: false, data: null },
  { name: "clean", done: true, data: "20220313" },
  { name: "play", done: true, data: "20220313" },
  { name: "read", done: true, data: "20220313" }
];

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

function GoalsConsole() {
  const [goals, setGoals] = useState(data);
  const handleAdd = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };
  const handleAction = (goal) => {
    goal.done = !goal.done;
  };
  return (
    <div className="console">
      <AddGoal onAdd={handleAdd} />
      <div className="label">{"not done goals"}</div>
      <GoalsTable goals={goals.filter((goal) => !goal.done)} onAction={handleAction} />
      <div className="label">{"done goals"}</div>
      <GoalsTable goals={goals.filter((goal) => goal.done)} />
    </div>
  );
}

function GoalRow({ goal }) {
  return (
    <tr>
      <td>{goal.name}</td>
      <td>
        {!goal.done && <button className="done-btn">{"done"}</button>}
        {goal.done && <button className="undo-btn">{"undo"}</button>}
      </td>
    </tr>
  );
}

function GoalsTable({ goals }) {
  return (
    <table className="goal-tbl">
      <tbody>
        {goals.map((g, id) => {
          return <GoalRow key={id} goal={g} />;
        })}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div className="app">
      <GoalsConsole />
    </div>
  );
}

export default App;
