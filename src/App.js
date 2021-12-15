import React from "react";
import {
  useAsyncState,
  AsyncStateProvider,
  createReducerProducer,
  createSourceAsyncState
} from "react-async-states";
import Counter from "./Counter";
import {
  CounterSourceExample1,
  CounterSourceExample2
} from "./CounterSourceExample";
import CounterReducerExample, {
  CounterReducerExampleSub
} from "./CounterReducerExample";

export default function App() {
  return (
    <div className="App">
      <CounterSourceExample1 />
      <CounterSourceExample2 />
      <AsyncStateProvider>
        <h2>From Here we are inside the provider</h2>
        <CounterReducerExample />
        <CounterReducerExampleSub />
      </AsyncStateProvider>
    </div>
  );
}
