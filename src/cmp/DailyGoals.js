import { useEffect, useState } from "react";
import AddAGoal from "./AddAGoal";
import "./DailyGoals.css";

function DailyGoals() {
  const [goals, setGoals] = useState([]);
  const getGoals = () => {
    fetch("https://rwflb.herokuapp.com/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  };
  const updateGoal = (goal) => {
    fetch("https://rwflb.herokuapp.com/goals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goal)
    });
  };
  useEffect(() => {
    getGoals();
  }, []);

  const handleClick = (goal) => {
    goal.done = !goal.done;
    // updateGoal(goal);
    setGoals((prevGoals) => [...prevGoals.filter((g) => g.pkey !== goal.pkey), goal]);
  };

  const notDoneGoals = goals.filter((g) => !g.done);
  const doneGoals = goals.filter((g) => g.done);

  return (
    <div className="console">
      <AddAGoal />
      <div className="label">
        {notDoneGoals.length === 0 && doneGoals.length === 0 && "Start tracking some daily goals!"}
        {notDoneGoals.length === 0 && doneGoals.length > 0 && "Add some more goals!"}
        {notDoneGoals.length === 0 ? "" : "Complete these goals to change your life!"}
      </div>
      <NotDoneGoalTable goals={goals} onAction={handleClick} />
      <div className="label">{doneGoals.length === 0 ? "" : "You're life is slowly changing, great work!"}</div>
      <DoneGoalTable goals={goals} onAction={handleClick} />
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

export default DailyGoals;
