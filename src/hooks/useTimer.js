import { useEffect, useState } from "react";

function useTimer(time) {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const intervalID = setInterval(() => {
      timer > 0 && setTimer((time) => time - 1);
    }, 1000);
    return () => clearInterval(intervalID);
  });
  return [timer, setTimer];
}

export default useTimer;
