import { Button, Input } from "@src/components/atoms";
import { Form } from "@src/components/organisms";
import { useAuth } from "@src/utils/hooks";
import { Auth } from "aws-amplify";
import React, { useCallback, useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password);
    },
    [login, email, password]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        mt="16px"
        required
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        mt="16px"
        required
      />
      <Button type="submit" mt="16px">
        Login
      </Button>
    </Form>
  );
};
