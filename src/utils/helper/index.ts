export interface DigitBuildProps {
  a?: boolean;
  b?: boolean;
  c?: boolean;
  d?: boolean;
  e?: boolean;
  f?: boolean;
  g?: boolean;
}

export const getMatchStickParts = (number: number): DigitBuildProps => {
  if (number === 0) {
    return {
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: false,
    };
  } else if (number === 1) {
    return {
      a: false,
      b: true,
      c: true,
      d: false,
      e: false,
      f: false,
      g: false,
    };
  } else if (number === 2) {
    return {
      a: true,
      b: true,
      c: false,
      d: true,
      e: true,
      f: false,
      g: true,
    };
  } else if (number === 3) {
    return {
      a: true,
      b: true,
      c: true,
      d: true,
      e: false,
      f: false,
      g: true,
    };
  } else if (number === 4) {
    return {
      a: false,
      b: true,
      c: true,
      d: false,
      e: false,
      f: true,
      g: true,
    };
  } else if (number === 5) {
    return {
      a: true,
      b: false,
      c: true,
      d: true,
      e: false,
      f: true,
      g: true,
    };
  } else if (number === 6) {
    return {
      a: true,
      b: false,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true,
    };
  } else if (number === 7) {
    return {
      a: true,
      b: true,
      c: true,
      d: false,
      e: false,
      f: false,
      g: false,
    };
  } else if (number === 8) {
    return {
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true,
    };
  } else {
    return {
      a: true,
      b: true,
      c: true,
      d: true,
      e: false,
      f: true,
      g: true,
    };
  }
};

export const getNumberFromParts = ({
  a,
  b,
  c,
  d,
  e,
  f,
  g,
}: DigitBuildProps) => {
  if (a && b && c && d && e && f && !g) {
    return 0;
  } else if (!a && b && c && !d && !e && !f && !g) {
    return 1;
  } else if (a && b && !c && d && e && !f && g) {
    return 2;
  } else if (a && b && c && d && !e && !f && g) {
    return 3;
  } else if (!a && b && c && !d && !e && f && g) {
    return 4;
  } else if (a && !b && c && d && !e && f && g) {
    return 5;
  } else if (a && !b && c && d && e && f && g) {
    return 6;
  } else if (a && b && c && !d && !e && !f && !g) {
    return 7;
  } else if (a && b && c && d && e && f && g) {
    return 8;
  } else if (a && b && c && d && !e && f && g) {
    return 9;
  } else {
    undefined;
  }
};
