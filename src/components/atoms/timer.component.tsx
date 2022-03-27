import { useSound } from "@src/utils/hooks";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SpaceProps } from "styled-system";
import { Text } from ".";

interface Props extends SpaceProps {
  time: number;
  paused: boolean;
  onEnd?: () => void;
}

export type TimerRef = {
  reset: () => void;
  stop: () => void;
};

const CountDown: React.ForwardRefRenderFunction<TimerRef, Props> = (
  { time, onEnd, paused, ...rest },
  ref
) => {
  const [count, setCount] = useState(time);
  const [stop, setStop] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCount(time);
    },
    stop: () => {
      setStop(true);
    },
  }));

  useSound("https://cis-game-assets.s3.amazonaws.com/timer-sound.wav");

  useEffect(() => {
    if (paused || stop) {
      return;
    }
    if (count === 0) {
      onEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count, setCount, paused, stop]);
  return (
    <Text.H1 {...rest} textAlign="center">
      00:{count.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
    </Text.H1>
  );
};

export const Timer = forwardRef(CountDown);
