"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  let [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-lg px-4 md:px-0">
      <p className="text-left text-xl text-gray-400">Choose a number:</p>
      <div className="mt-4 flex w-full">
        <div className="flex w-1/2">
          <div className="flex-col">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={count}
              min={0}
              onChange={(e) => setCount(+e.target.value)}
              className="w-full bg-gray-800 p-2 text-xl focus:border-gray-300 focus:ring-0 md:hidden"
            />
            <input
              type="number"
              value={count}
              min={0}
              onChange={(e) => setCount(+e.target.value)}
              className="hidden w-full bg-gray-800 p-2 text-xl focus:border-gray-300 focus:ring-0 md:block"
            />
          </div>
        </div>
        <div className="flex w-1/2 justify-end">
          <Counter value={count} />
        </div>
      </div>
    </div>
  );
}

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

function Counter({ value }: { value: number }) {
  return (
    <div
      style={{ fontSize }}
      className="flex space-x-3 overflow-hidden rounded bg-white px-2 leading-none text-gray-900"
    >
      <Digit place={100} value={value} />
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {Array.from(Array(10).keys()).map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
