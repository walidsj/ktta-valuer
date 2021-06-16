import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todayAtom, counterAtom } from "../stores/counter.js"

function TimerCountdown() {
  const [countdownDate, setCountdownDate] = useRecoilState(todayAtom);
  const [state, setState] = useRecoilState(counterAtom);

  useEffect(() => {
    setInterval(() => updateCountdown(), 1000);
  }, []);

  const updateCountdown = () => {
    if (countdownDate) {
      
    const currentTime = new Date().getTime();

    const distanceToDate = countdownDate - currentTime;

    let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor(
      (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
    );
    let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

    setState({ days: days, hours: hours, minutes, seconds });
  }
  };

  return (
    <div>
      {!state ? (
          <div>
            <i className="fa fa-spinner fa-spin me-2" />
            Loading...
          </div>
        ) : 
        (
          <div className="fw-bold text-primary">
            <span className="fs-4">{state.days}</span>h <span className="fs-4">{state.hours}</span>j <span className="fs-4">{state.minutes}</span>m <span className="fs-4">{state.seconds}</span>s
          </div>
        )
      }
    </div>
  )
}

export default TimerCountdown
