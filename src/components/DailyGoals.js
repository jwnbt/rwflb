import { useEffect, useState } from "react";
import AddAGoal from "./AddAGoal";
import "./DailyGoals.css";

function DailyGoals() {
  const [goals, setGoals] = useState([]);
  const goalsEndPoint = "https://rwflb.herokuapp.com/goals";

  const getGoals = () => {
    fetch(goalsEndPoint)
      .then((res) => res.json())
      .then((data) => setGoals(data));
  };
  const patchGoal = (goal) => {
    fetch(goalsEndPoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goal)
    });
  };

  const deleteGoal = (goal) => {
    fetch(goalsEndPoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goal)
    });
  };

  useEffect(() => {
    getGoals();
  }, []);

  const handleAdd = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  const handleDoneClick = (goal) => {
    goal.done = !goal.done;
    setGoals((prevGoals) => [...prevGoals.filter((g) => g.pkey !== goal.pkey), goal]);
    patchGoal(goal);
  };

  const handleDeleteClick = (goal) => {
    setGoals((prevGoals) => [...prevGoals.filter((g) => g.pkey !== goal.pkey)]);
    deleteGoal(goal);
  };

  const notDoneGoals = goals.filter((g) => !g.done);
  const doneGoals = goals.filter((g) => g.done);

  return (
    <div className="console">
      <AddAGoal onAdd={handleAdd} />
      <div className="label">
        {notDoneGoals.length === 0 && doneGoals.length === 0 && "Start tracking some daily goals!"}
        {notDoneGoals.length === 0 && doneGoals.length > 0 && "Add some more goals!"}
        {notDoneGoals.length === 0 ? "" : "Complete these goals to change your life!"}
      </div>
      <NotDoneGoalTable goals={goals} onAction={handleDoneClick} />
      <div className="label">{doneGoals.length === 0 ? "" : "You're life is slowly changing, great work!"}</div>
      <DoneGoalTable goals={goals} onAction={handleDoneClick} onDelete={handleDeleteClick} />
    </div>
  );
}

function GoalsTable({ goals, onAction, onDelete }) {
  return (
    <table className="goal-tbl">
      <tbody>
        {goals.map((g, id) => {
          return <GoalRow key={id} goal={g} onAction={onAction} onDelete={onDelete} />;
        })}
      </tbody>
    </table>
  );
}

function NotDoneGoalTable({ goals, onAction }) {
  return <GoalsTable goals={goals.filter((g) => !g.done)} onAction={onAction} />;
}

function DoneGoalTable({ goals, onAction, onDelete }) {
  return <GoalsTable goals={goals.filter((g) => g.done)} onAction={onAction} onDelete={onDelete} />;
}

function GoalRow({ goal, onAction, onDelete }) {
  const handleClick = () => {
    onAction(goal);
  };

  const handleDelete = () => {
    onDelete(goal);
  };

  return (
    <tr className="goal-row ">
      <td>{goal.name}</td>
      <td>
        {!goal.done && <GoalActionButton label="done" className="done-btn" onClick={handleClick} />}
        {goal.done && <GoalActionButton label="undo" className="undo-btn" onClick={handleClick} />}
      </td>
      <td>{goal.done && <GoalActionButton label="delete" className="delete-btn" onClick={handleDelete} />}</td>
    </tr>
  );
}

function GoalActionButton({ label, ...restProps }) {
  return (
    <>
      <button {...restProps}>{label}</button>
    </>
  );
}

export default DailyGoals;
