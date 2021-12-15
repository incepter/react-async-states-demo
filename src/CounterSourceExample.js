import React from "react";
import {
  useAsyncState,
  AsyncStateProvider,
  createReducerProducer,
  createSourceAsyncState
} from "react-async-states";
import Counter from "./Counter";

const counterSource = createSourceAsyncState("counter", null, {
  initialValue: 0
});

export function CounterSourceExample1() {
  const { state, run } = useAsyncState(counterSource);

  return (
    <Counter
      value={state.data}
      label="counterSource example 1"
      increment={() => run((old) => old.data + 1)}
      decrement={() => run((old) => old.data - 1)}
    />
  );
}

export function CounterSourceExample2() {
  const { state, run } = useAsyncState(counterSource);

  return (
    <Counter
      value={state.data}
      label="counterSource example 2"
      increment={() => run((old) => old.data + 1)}
      decrement={() => run((old) => old.data - 1)}
    />
  );
}
