import React, { SyntheticEvent } from "react";
import style from "./style.scss";
import Welcome from "./welcome.gif";
import useState from "Hooks/useState";

interface State {
  inputString: string;
  correctAnswer: string;
}

const Dashboard = () => {
  const [state, setState] = useState<State>({
    inputString: "",
    correctAnswer: "RPIS",
  });

  const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
    setState({ inputString: event.currentTarget.value });
  };

  const isCorrect =
    state.inputString === state.correctAnswer ||
    state.inputString === state.correctAnswer.toLowerCase();

  return (
    <div className={style.dashboard}>
      <h1 className={style.dashboardTitle}>Hello, Bubu</h1>
      <img src={Welcome} />

      <h2 className={style.dashboardTitle}>Enter first four characters</h2>
      {!isCorrect && (
        <input maxLength={4} value={state.inputString} onInput={handleInput} />
      )}
      {isCorrect && (
        <span className={style.answer}>{"Spicy date-night teddy"}</span>
      )}
    </div>
  );
};

export default Dashboard;
