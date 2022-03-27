import { Button, Input } from "@src/components/atoms";
import { Form } from "@src/components/organisms";
import { useAuth } from "@src/utils/hooks";
import { Auth } from "aws-amplify";
import React, { useCallback, useState } from "react";

enum Step {
  Register = "Register",
  Verification = "Verification",
}

export const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState(Step.Register);

  const { registerUser, verifyUser } = useAuth();

  const onSubmitRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await registerUser(name, email, password);
      setStep(Step.Verification);
    },
    [name, email, password, setStep, registerUser]
  );

  const onSubmitVerification = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await verifyUser(code, email, password);
    },
    [code, email, password]
  );

  return step === Step.Register ? (
    <Form onSubmit={onSubmitRegister}>
      <Input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        mt="16px"
        required
      />
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        mt="16px"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        mt="16px"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" mt="16px">
        Register
      </Button>
    </Form>
  ) : (
    <Form onSubmit={onSubmitVerification}>
      <Input
        type="text"
        key="code"
        mt="16px"
        name="code"
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your verfication code"
      />
      <Button type="submit" mt="16px">
        Verify
      </Button>
    </Form>
  );
};
