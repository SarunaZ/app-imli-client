import { useState as useReactState } from "react";

type NewState<T> = Partial<T> | ((newState: T) => void);

const useState = <T extends { [key: string]: any }>(
  defaultState: T,
): [T, (newState: NewState<T>) => void] => {
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
