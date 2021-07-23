import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { todayFinalAtom, counterFinalAtom } from "../stores/counter.js";

function TimerCountdownFinal() {
  const [countdownDate, setCountdownDate] = useRecoilState(todayFinalAtom);
  const [state, setState] = useRecoilState(counterFinalAtom);

  useEffect(() => {
    updateCountdown();
    setInterval(() => updateCountdown(), 1000);
  }, []);

  const updateCountdown = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      if (distanceToDate < 0) {
        setState({ days: "0", hours: "0", minutes: "0", seconds: "0" });
      } else {
        let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor(
          (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

        setState({ days, hours, minutes, seconds });
      }
    }
  };

  return (
    <div className="fw-bold">
      <span className="fs-4">{state.days}</span>h{" "}
      <span className="fs-4">{state.hours}</span>j{" "}
      <span className="fs-4">{state.minutes}</span>m{" "}
      <span className="fs-4">{state.seconds}</span>s
    </div>
  );
}

export default TimerCountdownFinal;
