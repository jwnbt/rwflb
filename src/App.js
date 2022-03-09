import { useEffect, useState } from "react";
import "./App.css";

function TimeInput(props) {
  const [time, setTime] = useState("");
  const [rest, setRest] = useState("");
  const [rounds, setRounds] = useState("");
  const handleSubmit = (e) => {
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
    <form onSubmit={handleSubmit}>
      <input type="number" value={time} onChange={handleTimeChange} placeholder="start time" />
      <input type="number" value={rest} onChange={handleRestChange} placeholder="rest time" />
      <input type="number" value={rounds} onChange={handleRoundsChange} placeholder="how many rounds?" />
      <input type="submit" />
    </form>
  );
}

function TimerContainer() {
  const [settings, setSettings] = useState({});
  const handleStart = (timerSettings) => {
    setSettings(timerSettings);
  };
  return (
    <>
      <Timer settings={settings} />
      <TimeInput onStart={handleStart} />
    </>
  );
}

function Timer({ settings }) {
  const [startTime, setStartTime] = useState(settings.time);
  const [restTime, setRessTime] = useState(settings.rest);
  const [rounds, setRounds] = useState(settings.rounds);
  useEffect(() => {
    const intervalID = setInterval(() => {
      setStartTime(startTime - 1);
    }, 1000);
    return () => clearInterval(intervalID);
  });
  return (
    <>
      {console.log(settings)}
      {settings.time}
      {startTime}
      {rounds}
    </>
  );
}

function App() {
  return <TimerContainer />;
}

export default App;
