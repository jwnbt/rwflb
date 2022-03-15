import { useState } from "react";
import "./App.css";

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

function GoalsConsole() {
  const [goals, setGoals] = useState([]);
  const handleAdd = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };
  const handleClick = (goal) => {
    goal.done = !goal.done;
    setGoals((prevGoals) => [...prevGoals.filter((g) => g.pkey !== goal.pkey), goal]);
  };
  const notDoneGoals = goals.filter((g) => !g.done);
  const doneGoals = goals.filter((g) => g.done);
  return (
    <div className="console">
      {"rwflb"}
      <AddAGoal onAdd={handleAdd} />
      <div className="label">
        {notDoneGoals.length === 0 && doneGoals.length === 0 && "Strat tracking some daily goals!"}
        {notDoneGoals.length === 0 ? "" : "Complete these goals to change your life!"}
      </div>
      <NotDoneGoalTable goals={notDoneGoals} onAction={handleClick} />
      <div className="label">{doneGoals.length === 0 ? "" : "You're life is slowly changing, great work!"}</div>
      <DoneGoalTable goals={doneGoals} onAction={handleClick} />
    </div>
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

function NotDoneGoalTable({ goals, onAction }) {
  return <GoalsTable goals={goals.filter((g) => !g.done)} onAction={onAction} />;
}
function DoneGoalTable({ goals, onAction }) {
  return <GoalsTable goals={goals.filter((g) => g.done)} onAction={onAction} />;
}

function GoalRow({ goal, onAction }) {
  const handleClick = () => {
    onAction(goal);
  };
  return (
    <tr className="goal-row ">
      <td>{goal.name}</td>
      <td>
        {!goal.done && <GoalActionButton type="done" onClick={handleClick} />}
        {goal.done && <GoalActionButton type="undo" onClick={handleClick} />}
      </td>
    </tr>
  );
}

function GoalActionButton({ type, onClick }) {
  return (
    <>
      <button className={`${type}-btn`} onClick={onClick}>
        {type}
      </button>
    </>
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
