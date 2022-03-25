import { Button, Input } from "@src/components/atoms";
import { Form, Equation } from "@src/components/organisms";
import { useStore } from "@src/store";
import React, { useCallback, useEffect } from "react";
import { MatchStickOperationType } from "@src/components/molecules";
import {
  DigitBuildProps,
  getMatchStickParts,
  getNumberFromParts,
} from "@src/utils/helper";
import _ from "lodash";

export const LoginForm = () => {
  const { setLoggedIn } = useStore(
    useCallback(({ setLoggedIn }) => ({ setLoggedIn }), [])
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setLoggedIn(true);
    },
    [setLoggedIn]
  );

  useEffect(() => {
    function generateEquation() {
      let randomNumber1: number;
      let randomNumber2: number;
      let operation1: MatchStickOperationType;

      let outputNumber: number;

      do {
        randomNumber1 = Math.floor(Math.random() * 10);
        randomNumber2 = Math.floor(Math.random() * 10);

        const operation1Identifier = Math.random() * 10;

        operation1 =
          operation1Identifier > 5
            ? MatchStickOperationType.Plus
            : MatchStickOperationType.Minus;

        outputNumber =
          operation1Identifier > 5
            ? randomNumber1 + randomNumber2
            : randomNumber1 - randomNumber2;
      } while (outputNumber < 0 || outputNumber >= 10);

      function getLossNumber(number: number) {
        let lossNumber: number;
        const matchStickParts = getMatchStickParts(number);
        const lossA = getNumberFromParts({ ...matchStickParts, a: false });
        const lossB = getNumberFromParts({ ...matchStickParts, b: false });
        const lossC = getNumberFromParts({ ...matchStickParts, c: false });
        const lossD = getNumberFromParts({ ...matchStickParts, d: false });
        const lossE = getNumberFromParts({ ...matchStickParts, e: false });
        const lossF = getNumberFromParts({ ...matchStickParts, f: false });
        const lossG = getNumberFromParts({ ...matchStickParts, g: false });
        if (lossA) lossNumber = lossA;
        else if (lossB) lossNumber = lossB;
        else if (lossC) lossNumber = lossC;
        else if (lossD) lossNumber = lossD;
        else if (lossE) lossNumber = lossE;
        else if (lossF) lossNumber = lossF;
        else if (lossG) lossNumber = lossG;
        else lossNumber = number;

        return lossNumber;
      }

      function getSelfExchangedNumber(number: number) {
        let selfExchangedNumber: number | undefined;
        const parts = getMatchStickParts(number);
        const availableKeys: string[] = [];
        const unavailableKeys: string[] = [];
        Object.keys(parts).forEach((key) => {
          const objKey = key as keyof DigitBuildProps;
          if (parts[objKey]) {
            availableKeys.push(key);
          } else {
            unavailableKeys.push(key);
          }
        });

        for (const availableKey of availableKeys) {
          for (const unavailableKey of unavailableKeys) {
            const newNumber = getNumberFromParts({
              ...parts,
              [availableKey]: false,
              [unavailableKey]: true,
            });
            if (newNumber) {
              selfExchangedNumber = newNumber;
              break;
            }
          }
        }

        return selfExchangedNumber;
      }

      function getGainNumber(number: number) {
        const parts = getMatchStickParts(number);
        const unavailableParts = Object.keys(parts)
          .map((key) => {
            const objKey = key as keyof DigitBuildProps;
            if (!parts[objKey]) {
              return objKey;
            }
          })
          .filter(Boolean);
        for (const unavailablePart of unavailableParts) {
          const addNumber = getNumberFromParts({
            ...parts,
            [unavailablePart as string]: true,
          });
          if (addNumber) {
            return addNumber;
          }
        }
      }

      //randomNumber1
      const equation: Equation = {
        inputs: [randomNumber1, randomNumber2],
        operators: [operation1],
        output: outputNumber,
      };

      const wrongEquation = {
        ...equation,
        inputs: [...equation.inputs],
        operators: [...equation.operators],
      };
      const lossNumber1 = getLossNumber(randomNumber1);
      const lossNumber2 = getLossNumber(randomNumber2);
      const lossNumberOutput = getLossNumber(outputNumber);
      if (lossNumber1 !== randomNumber1) {
        wrongEquation.inputs[0] = lossNumber1;
        const gainNumber2 = getGainNumber(randomNumber2);
        const gainOutputNumber = getGainNumber(outputNumber);

        if (gainNumber2 && randomNumber2 !== gainNumber2) {
          wrongEquation.inputs[1] = gainNumber2;
        } else if (gainOutputNumber && outputNumber !== gainOutputNumber) {
          wrongEquation.output = gainOutputNumber;
        }
      } else if (lossNumber2 !== randomNumber2) {
        wrongEquation.inputs[1] = lossNumber2;
        const gainNumber1 = getGainNumber(randomNumber1);
        const gainOutputNumber = getGainNumber(outputNumber);

        if (gainNumber1 && randomNumber1 !== gainNumber1) {
          wrongEquation.inputs[0] = gainNumber1;
        } else if (gainOutputNumber && outputNumber !== gainOutputNumber) {
          wrongEquation.output = gainOutputNumber;
        }
      } else if (lossNumberOutput !== outputNumber) {
        wrongEquation.output = outputNumber;
        const gainNumber1 = getGainNumber(randomNumber1);
        const gainNumber2 = getGainNumber(randomNumber2);

        if (gainNumber1 && randomNumber1 !== gainNumber1) {
          wrongEquation.inputs[0] = gainNumber1;
        } else if (gainNumber2 && randomNumber2 !== gainNumber2) {
          wrongEquation.inputs[1] = gainNumber2;
        }
      } else {
        const selfExchangeNumber1 = getSelfExchangedNumber(randomNumber1);
        const selfExchangeNumber2 = getSelfExchangedNumber(randomNumber2);
        const selfExchangeOutput = getSelfExchangedNumber(outputNumber);

        if (selfExchangeNumber1 && selfExchangeNumber1 !== randomNumber1) {
          wrongEquation.inputs[0] = selfExchangeNumber1;
        } else if (
          selfExchangeNumber2 &&
          selfExchangeNumber2 !== randomNumber2
        ) {
          wrongEquation.inputs[1] = selfExchangeNumber2;
        } else if (selfExchangeOutput && selfExchangeOutput !== outputNumber) {
          wrongEquation.output = selfExchangeOutput;
        }
      }

      return { correct: equation, wrong: wrongEquation };
    }

    const equations: { correct: Equation; wrong: Equation }[] = [];
    let i = 0;
    while (i < 10) {
      const equation = generateEquation();
      const checkDuplicate = equations.find((eq) =>
        _.isEqual(equation.wrong, eq.wrong)
      );

      if (!checkDuplicate) {
        equations.push(equation);
        i++;
      }
    }

    equations.map((equation) => {
      console.log(
        "Correct",
        equation.correct.inputs[0],
        equation.correct.operators[0],
        equation.correct.inputs[1],
        " = ",
        equation.wrong.output
      );
      console.log(
        equation.wrong.inputs[0],
        equation.wrong.operators[0],
        equation.wrong.inputs[1],
        " = ",
        equation.wrong.output
      );
    });
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Input type="email" placeholder="Email" mt="16px" required />
      <Input type="password" placeholder="Password" mt="16px" required />
      <Button type="submit" mt="16px">
        Login
      </Button>
    </Form>
  );
};
