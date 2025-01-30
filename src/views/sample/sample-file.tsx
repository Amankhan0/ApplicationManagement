import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { increment, decrement, incrementByAmount } from "../../features/sample/sampleSlice";

export default function SampleAppFile() {
  const count = useSelector((state: RootState) => state.sample.count); // ✅ Use sample state
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-green-500">Application Management</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
}
