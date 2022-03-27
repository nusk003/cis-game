import { MatchStickOperationType } from "@src/components/molecules";
import { Equation } from "@src/components/organisms";
import { GameComplexity } from "@src/components/templates/home-settings-modal-general.component";
import _ from "lodash";
import {
  DigitBuildProps,
  getMatchStickParts,
  getNumberFromParts,
} from "@src/utils/helper";
import { v4 as uuid } from "uuid";

export interface GameQuestion {
  id: string;
  wrong: Equation;
  correct: Equation;
  answered: boolean;
}

export class GameEngine {
  _steps = 10;
  static gameEngine: GameEngine | undefined;

  static get instance() {
    if (!this.gameEngine) {
      this.gameEngine = new GameEngine();
    }
    return this.gameEngine;
  }

  checkEquation(equation: Equation) {
    let realOutput = 0;
    equation.inputs.forEach((input, index) => {
      if (index === 0) realOutput += input;
      else if (equation.operators[index - 1] === MatchStickOperationType.Plus)
        realOutput += input;
      else realOutput -= input;
    });

    if (realOutput === equation.output) {
      return true;
    }
    return false;
  }

  getLostNumber(number: number) {
    const matchStickParts = getMatchStickParts(number);
    const availableKeys = Object.keys(matchStickParts)
      .map((key) => {
        if (matchStickParts[key as keyof DigitBuildProps]) {
          return key;
        }
      })
      .filter(Boolean);
    for (const key of availableKeys) {
      const lostNumber = getNumberFromParts({
        ...matchStickParts,
        [key as keyof DigitBuildProps]: false,
      });
      if (lostNumber) {
        return lostNumber;
      }
    }
  }

  getSelfExchangedNumber(number: number) {
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
          return newNumber;
        }
      }
    }
  }

  getGainNumber(number: number) {
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

  generateEquation(complexity: GameComplexity) {
    let randomNumber1: number;
    let randomNumber2: number;
    let randomNumber3: number;
    let operation1: MatchStickOperationType;
    let operation2: MatchStickOperationType;

    let outputNumber: number;

    do {
      randomNumber1 = Math.floor(Math.random() * 10);
      randomNumber2 = Math.floor(Math.random() * 10);
      randomNumber3 = Math.floor(Math.random() * 10);

      const operation1Identifier = Math.random() * 10;
      const operation2Identifier = Math.random() * 10;

      operation1 =
        operation1Identifier > 5
          ? MatchStickOperationType.Plus
          : MatchStickOperationType.Minus;

      operation2 =
        operation2Identifier > 5
          ? MatchStickOperationType.Plus
          : MatchStickOperationType.Minus;

      outputNumber =
        operation1Identifier > 5
          ? randomNumber1 + randomNumber2
          : randomNumber1 - randomNumber2;

      if (complexity === GameComplexity.Intermediate)
        outputNumber =
          operation2Identifier > 5
            ? outputNumber + randomNumber3
            : outputNumber - randomNumber3;
    } while (outputNumber < 0 || outputNumber >= 10);

    const equation: Equation = {
      inputs: [
        randomNumber1,
        randomNumber2,
        ...(complexity === GameComplexity.Intermediate ? [randomNumber3] : []),
      ],
      operators: [
        operation1,
        ...(complexity === GameComplexity.Intermediate ? [operation2] : []),
      ],
      output: outputNumber,
    };

    const wrongEquation: Equation = {
      inputs: [...equation.inputs],
      operators: [...equation.operators],
      output: outputNumber,
    };
    const lossNumber1 = this.getLostNumber(randomNumber1);
    const lossNumber2 = this.getLostNumber(randomNumber2);
    const lossNumber3 = this.getLostNumber(randomNumber3);
    const lossNumberOutput = this.getLostNumber(outputNumber);
    if (lossNumber1 && lossNumber1 !== randomNumber1) {
      wrongEquation.inputs[0] = lossNumber1;
      const gainNumber2 = this.getGainNumber(randomNumber2);
      const gainNumber3 = this.getGainNumber(randomNumber3);
      const gainOutputNumber = this.getGainNumber(outputNumber);

      if (gainNumber2 && randomNumber2 !== gainNumber2) {
        wrongEquation.inputs[1] = gainNumber2;
      } else if (
        complexity === GameComplexity.Intermediate &&
        gainNumber3 &&
        randomNumber3 !== gainNumber3
      ) {
        wrongEquation.inputs[2] = gainNumber3;
      } else if (gainOutputNumber && outputNumber !== gainOutputNumber) {
        wrongEquation.output = gainOutputNumber;
      } else {
        const selfExchangeNumber1 = this.getSelfExchangedNumber(randomNumber1);
        if (selfExchangeNumber1 && selfExchangeNumber1 !== randomNumber1) {
          wrongEquation.inputs[0] = selfExchangeNumber1;
        } else {
          return undefined;
        }
      }
    } else if (lossNumber2 && lossNumber2 !== randomNumber2) {
      wrongEquation.inputs[1] = lossNumber2;
      const gainNumber1 = this.getGainNumber(randomNumber1);
      const gainNumber3 = this.getGainNumber(randomNumber3);
      const gainOutputNumber = this.getGainNumber(outputNumber);

      if (gainNumber1 && randomNumber1 !== gainNumber1) {
        wrongEquation.inputs[0] = gainNumber1;
      } else if (
        complexity === GameComplexity.Intermediate &&
        gainNumber3 &&
        randomNumber3 !== gainNumber3
      ) {
        wrongEquation.inputs[2] = gainNumber3;
      } else if (gainOutputNumber && outputNumber !== gainOutputNumber) {
        wrongEquation.output = gainOutputNumber;
      } else {
        const selfExchangeNumber2 = this.getSelfExchangedNumber(randomNumber2);
        if (selfExchangeNumber2 && selfExchangeNumber2 !== randomNumber2) {
          wrongEquation.inputs[1] = selfExchangeNumber2;
        } else {
          return undefined;
        }
      }
    } else if (
      lossNumber3 &&
      complexity === GameComplexity.Intermediate &&
      lossNumber3 !== randomNumber3
    ) {
      wrongEquation.inputs[2] = lossNumber3;
      const gainNumber1 = this.getGainNumber(randomNumber1);
      const gainNumber2 = this.getGainNumber(randomNumber2);
      const gainOutputNumber = this.getGainNumber(outputNumber);

      if (gainNumber1 && randomNumber1 !== gainNumber1) {
        wrongEquation.inputs[0] = gainNumber1;
      } else if (gainNumber2 && randomNumber2 !== gainNumber2) {
        wrongEquation.inputs[1] = gainNumber2;
      } else if (gainOutputNumber && outputNumber !== gainOutputNumber) {
        wrongEquation.output = gainOutputNumber;
      } else {
        const selfExchangeNumber3 = this.getSelfExchangedNumber(randomNumber3);
        if (selfExchangeNumber3 && selfExchangeNumber3 !== randomNumber3) {
          wrongEquation.inputs[2] = selfExchangeNumber3;
        } else {
          return undefined;
        }
      }
    } else if (lossNumberOutput && lossNumberOutput !== outputNumber) {
      wrongEquation.output = lossNumberOutput;
      const gainNumber1 = this.getGainNumber(randomNumber1);
      const gainNumber2 = this.getGainNumber(randomNumber2);
      const gainNumber3 = this.getGainNumber(randomNumber3);

      if (gainNumber1 && randomNumber1 !== gainNumber1) {
        wrongEquation.inputs[0] = gainNumber1;
      } else if (gainNumber2 && randomNumber2 !== gainNumber2) {
        wrongEquation.inputs[1] = gainNumber2;
      } else if (
        complexity === GameComplexity.Intermediate &&
        gainNumber3 &&
        randomNumber3 !== gainNumber3
      ) {
        wrongEquation.inputs[2] = gainNumber3;
      } else {
        const selfExchangeOutput = this.getSelfExchangedNumber(outputNumber);
        if (selfExchangeOutput && selfExchangeOutput !== outputNumber) {
          wrongEquation.output = selfExchangeOutput;
        } else {
          return undefined;
        }
      }
    } else {
      return undefined;
    }

    if (this.checkEquation(wrongEquation)) {
      return undefined;
    }

    return {
      id: uuid(),
      correct: equation,
      wrong: wrongEquation,
      answered: false,
    };
  }
  generateEquations(complexity: GameComplexity) {
    const equations: GameQuestion[] = [];
    let i = 0;
    while (i < 10) {
      const equation = this.generateEquation(complexity);
      if (!equation) {
        continue;
      }
      const checkDuplicate = equations.find((eq) =>
        _.isEqual(equation.wrong, eq.wrong)
      );

      if (!checkDuplicate) {
        equations.push(equation!);
        i++;
      }
    }

    return equations;
  }
}
