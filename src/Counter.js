export default function Counter({ label, value, increment, decrement }) {
  return (
    <div>
      <h3>{label}</h3>
      <button onClick={decrement}>-</button>
      <span>{value}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
