import React, { useState } from "react";
import { useAsyncState, AsyncStateProvider } from "react-async-states";
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
        <hr />
        <UsernameInlineFns userId="1" />
        <br />
        <UsernameObjConfig userId="2" />
        <br />
        <UsernameGenerator userId="3" />
        <br />
      </AsyncStateProvider>
    </div>
  );
}

function usernamePromiseProducer(props) {
  const controller = new AbortController();
  props.onAbort(() => controller.abort());
  return fetch(
    "https://jsonplaceholder.typicode.com/users/" + props.payload.userId,
    { signal: controller.signal }
  ).then((res) => res.json());
}

function UsernameInlineFns({ userId }) {
  const { state } = useAsyncState
    .payload({ userId })
    .condition(!!userId)
    .auto({ key: "user-" + userId, producer: usernamePromiseProducer }, [
      userId
    ]);
  return state.data?.name || null;
}

async function usernameAwaitProducer(props) {
  const controller = new AbortController();
  props.onAbort(() => controller.abort());
  return await fetch(
    "https://jsonplaceholder.typicode.com/users/" + props.payload.userId,
    { signal: controller.signal }
  ).then((res) => res.json());
}

function UsernameObjConfig({ userId }) {
  const { state } = useAsyncState(
    {
      lazy: false,
      condition: !!userId,
      payload: { userId },
      producer: usernameAwaitProducer
    },
    [userId]
  );
  return state.data?.name || null;
}

function* usernameProducerGen(props) {
  const controller = new AbortController();
  props.onAbort(() => controller.abort());
  return yield fetch(
    "https://jsonplaceholder.typicode.com/users/" + props.payload.userId,
    { signal: controller.signal }
  ).then((res) => res.json());
}
function UsernameGenerator({ userId }) {
  const { state } = useAsyncState(
    {
      lazy: false,
      condition: !!userId,
      payload: { userId },
      producer: usernameProducerGen
    },
    [userId]
  );
  return state.data?.name || null;
}
