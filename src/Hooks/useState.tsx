import { useState as useReactState } from "react";

type NewState<T> = Partial<T> | ((newState: T) => void);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useState = <T extends { [key: string]: any }>(
  defaultState: T,
): [Partial<T>, (newState: NewState<T>) => void] => {
  const [state, setState] = useReactState<T>(defaultState);

  const setNewState = (newState: NewState<T>) => {
    setState((prevState: T) => {
      const mergedState =
        typeof newState === "function" ? newState(prevState) : newState;

      return { ...prevState, ...mergedState };
    });
  };

  return [state, setNewState];
};

export default useState;
