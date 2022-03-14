import { useState } from "react";
import "./App.css";

const data = [
  { pkey: 1, name: "workout", done: false, data: null },
  { pkey: 2, name: "eat", done: false, data: null },
  { pkey: 3, name: "study", done: false, data: null },
  { pkey: 4, name: "clean", done: true, data: "20220313" },
  { pkey: 5, name: "play", done: true, data: "20220313" },
  { pkey: 6, name: "read", done: true, data: "20220313" }
];

function AddAGoal({ onAdd }) {
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
  const handleClick = (goal) => {
    goal.done = !goal.done;
    setGoals([...goals.filter((g) => g.pkey !== goal.pkey), goal]);
  };
  return (
    <div className="console">
      <AddAGoal onAdd={handleAdd} />
      <div className="label">{"not done goals"}</div>
      <NotDoneGoalTable notDoneGoals={goals.filter((goal) => !goal.done)} onAction={handleClick} />
      <div className="label">{"done goals"}</div>
      <DoneGoalTable doneGoals={goals.filter((goal) => goal.done)} onAction={handleClick} />
    </div>
  );
}

function NotDoneGoalTable({ notDoneGoals, onAction }) {
  return <GoalsTable goals={notDoneGoals.filter((goal) => !goal.done)} onAction={onAction} />;
}
function DoneGoalTable({ doneGoals, onAction }) {
  return <GoalsTable goals={doneGoals.filter((goal) => goal.done)} onAction={onAction} />;
}

function GoalRow({ goal, onAction }) {
  return (
    <tr className="goal-row ">
      <td>{goal.name}</td>
      <td>
        {!goal.done && (
          <button className="done-btn" onClick={() => onAction(goal)}>
            {"done"}
          </button>
        )}
        {goal.done && (
          <button className="undo-btn" onClick={() => onAction(goal)}>
            {"undo"}
          </button>
        )}
      </td>
    </tr>
  );
}

function GoalsTable({ goals, onAction }) {
  return (
    <table className="goal-tbl">
      <tbody>
        {goals.map((g, id) => {
          return <GoalRow key={id} goal={g} onAction={onAction} />;
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
