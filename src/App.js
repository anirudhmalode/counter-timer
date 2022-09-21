import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function App() {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [stop, setStop] = useState(true);
  let timer = useRef(null);

  const timerFunction = useCallback(() => {
    timer.current = setTimeout(() => {
      if (secs === 59 && mins !== mins + 1) {
        setMins(mins + 1);
        setSecs(0);
      } else if (mins === 59 && hrs !== hrs + 1) {
        setHrs(hrs + 1);
        setMins(0);
        setSecs(0);
      } else {
        setSecs(secs + 1);
      }
    }, 1000);
  }, [hrs, mins, secs]);

  const handleStartTimer = () => {
    timerFunction();
    setStop(!stop);
  };

  const handleReset = () => {
    setHrs(0);
    setMins(0);
    setSecs(0);
    clearTimeout(timer);
    setStop(true)
  };

  const handleStopTimer = () => {
    clearTimeout(timer);
    setStop(!stop);
  };

  useEffect(() => {
    !stop && timerFunction();
  }, [timerFunction, stop]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {hrs < 10 ? "0" + hrs : hrs} : {mins < 10 ? "0" + mins : mins} : {secs < 10 ? "0" + secs : secs}
        </h1>
        <ButtonGroup
          disableElevation
          variant="outlined"
          size="large"
          aria-label="Disabled elevation buttons"
        >
          <Button onClick={handleReset}>RESET</Button>
          <Button onClick={stop ? handleStartTimer : handleStopTimer}>
            {stop ? "START" : "STOP"}
          </Button>
        </ButtonGroup>
      </header>
    </div>
  );
}

export default App;
