import { useState } from "react";
import "./App.css";
//test
function AddGoal({ onAdd }) {
  const [goal, setGoal] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    goal !== "" && onAdd({ name: goal });
    setGoal("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={goal}
        placeholder="enter a goal to track"
        onChange={(e) => setGoal(e.target.value)}
      />
      <input className="submitbtn" type="submit" value="add" />
    </form>
  );
}

function Goal(props) {
  return <div>{props.goalName}</div>;
}

function Goals() {
  const [goals, setGoals] = useState([]);
  const handleAdd = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };
  const handleClick = (goalId) => {};

  return (
    <div className="console">
      <AddGoal onAdd={handleAdd} />
      <div className="cur-goal-label">{"Current Goals Tracking"}</div>
      <table className="goal">
        <tbody>
          {goals.map((goal, index) => {
            return (
              <tr key={index}>
                <td style={{ width: "100%", fontSize: "20px" }}>
                  <Goal goalName={goal.name} />
                </td>
                <td style={{ width: "100%", fontSize: "20px" }}>
                  <button type="button" onClick={handleClick(index)}>
                    done
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
