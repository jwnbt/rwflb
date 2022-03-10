import { useEffect, useState } from "react";
import "./App.css";

function TimeInput(props) {
  const [time, setTime] = useState("");
  const [rest, setRest] = useState("");
  const [rounds, setRounds] = useState("");
  const handleSubmit = (e) => {
    if (time === "") {
      e.preventDefault();
      alert("enter a time nitwit");
      return;
    }
    e.preventDefault();
    props.onStart({ time, rest, rounds });
    setTime("");
    setRest("");
    setRounds("");
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleRestChange = (e) => {
    setRest(e.target.value);
  };
  const handleRoundsChange = (e) => {
    setRounds(e.target.value);
  };
  return (
    <form className="timer-form" onSubmit={handleSubmit}>
      <input type="number" value={time} onChange={handleTimeChange} placeholder="start time" />
      <input type="number" value={rest} onChange={handleRestChange} placeholder="rest time" />
      <input type="number" value={rounds} onChange={handleRoundsChange} placeholder="how many rounds?" />
      <input className="submitbtn" type="submit" />
    </form>
  );
}

function TimerContainer() {
  const [settings, setSettings] = useState();
  const [showTimer, setShowTimer] = useState(false);
  const handleStart = (timerSettings) => {
    setSettings(timerSettings);
    setShowTimer(true);
  };
  const handleTimerFinished = (timerHasFinished) => {
    if (timerHasFinished) {
      setShowTimer(false);
    }
  };
  return (
    <div className="container">
      {showTimer ? <Timer settings={settings} onTimerFinished={handleTimerFinished} /> : "Start a timer"}
      <TimeInput onStart={handleStart} />
    </div>
  );
}

function Timer({ settings, onTimerFinished }) {
  const [startTime, setStartTime] = useState(settings.time);
  const [restTime, setRestTime] = useState(settings.rest);
  const [rounds, setRounds] = useState(settings.rounds);
  useEffect(() => {
    const intervalID = setInterval(() => {
      startTime > 0 && setStartTime(startTime - 1);
      startTime === 0 && restTime > 0 && setRestTime(restTime - 1);
      startTime === 0 && restTime === 0 && rounds > 0 && setRounds(rounds - 1);
      startTime === 0 && restTime === 0 && rounds > 0 && setStartTime(settings.time);
      startTime === 0 && restTime === 0 && rounds > 0 && setRestTime(settings.rest);
      onTimerFinished(rounds === 0);
    }, 1000);
    return () => clearInterval(intervalID);
  });
  return (
    <div className="timer">
      <div>start: {startTime}</div>
      <div>rest: {restTime}</div>
      <div>rounds: {rounds}</div>
    </div>
  );
}

function App() {
  return <TimerContainer />;
}

export default App;
