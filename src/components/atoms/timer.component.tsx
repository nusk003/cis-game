import { useSound } from "@src/utils/hooks";
import React, { useEffect, useState } from "react";
import { SpaceProps } from "styled-system";
import { Text } from ".";

interface Props extends SpaceProps {
  time: number;
}

export const Timer: React.FC<Props> = ({ time, ...rest }) => {
  const [count, setCount] = useState(time);

  useSound("https://cis-game-assets.s3.amazonaws.com/timer-sound.wav");

  useEffect(() => {
    if (count === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Text.H1 {...rest} textAlign="center">
      00:{count.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
    </Text.H1>
  );
};
