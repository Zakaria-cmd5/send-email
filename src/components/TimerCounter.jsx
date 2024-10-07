import { useEffect, useRef, useState } from "react";

const TimerCounter = () => {
  const [milliSec, setMilliSec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const intervalRef = useRef(null);

  const startTimerHandler = (e) => {
    e.preventDefault();

    intervalRef.current = setInterval(() => {
      setMilliSec((prevMilliSec) => {
        if (prevMilliSec === 999) {
          setSec((prevSec) => {
            if (prevSec === 59) {
              setMin((prevMin) => prevMin + 1);
              return 0;
            }
            return prevSec + 1;
          });
          return 0;
        }
        return prevMilliSec + 1;
      });
    }, 1);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <form onSubmit={startTimerHandler}>
        <h1>
          {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}:
          {milliSec < 100
            ? milliSec < 10
              ? `00${milliSec}`
              : `0${milliSec}`
            : milliSec}
        </h1>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default TimerCounter;
