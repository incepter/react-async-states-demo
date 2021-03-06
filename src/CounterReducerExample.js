import React from "react";
import { useAsyncState, createReducerProducer } from "react-async-states";
import Counter from "./Counter";

function counterReducer(oldValue, action) {
  console.log("action", action, oldValue);
  return (oldValue || 0) + (action === "increment" ? 1 : -1);
}

// you can create a source by this producer and share it at module level
const counterReducerProducer = createReducerProducer(counterReducer);

export default function CounterReducerExample() {
  const { state, run } = useAsyncState.hoist({
    key: "reducerCounter",
    producer: counterReducerProducer
  });

  return (
    <Counter
      value={state.data || 0}
      label="counterReducer example, this component hoists this state"
      increment={() => run("increment")}
      decrement={() => run("decrement")}
    />
  );
}

export function CounterReducerExampleSub() {
  const { state, run } = useAsyncState("reducerCounter");

  if (!state) {
    return (
      <>
        <hr />
        "waiting..."
      </>
    );
  }
  return (
    <Counter
      value={state?.data || 0}
      label="counterReducer example, this component will wait for the state"
      increment={() => run("increment")}
      decrement={() => run("decrement")}
    />
  );
}

export function CounterReducerExampleFork() {
  const { key, state, run } = useAsyncState.fork("reducerCounter");

  if (!state) {
    return (
      <>
        <hr />
        "waiting..."
      </>
    );
  }
  return (
    <>
      <ForkedCounterByKey counterKey={key} />
      <Counter
        value={state.data || 0}
        label="counterReducer example, this component forks the counterReducer state"
        increment={() => run("increment")}
        decrement={() => run("decrement")}
      />
    </>
  );
}
