import { Text, Button } from "@src/components/atoms";
import { useState } from "react";
import styled from "styled-components";
import { LoginForm, RegisterForm } from "@src/components/templates";

const SContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

enum Step {
  Login = "Login",
  Register = "Register",
}

export const Account = () => {
  const [step, setStep] = useState(Step.Login);
  return (
    <SContainer>
      <SWrapper>
        <Text.H1 textAlign="center">{step}</Text.H1>
        {step === Step.Login ? <LoginForm /> : <RegisterForm />}
        <Button
          buttonStyle="link"
          onClick={() => {
            setStep(step === Step.Login ? Step.Register : Step.Login);
          }}
          mt="16px"
        >
          If you {step === Step.Login ? "don't" : "already"} have an account
        </Button>
      </SWrapper>
    </SContainer>
  );
};
