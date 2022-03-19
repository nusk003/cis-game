import { Button, Input } from "@src/components/atoms";
import { Form } from "@src/components/organisms";
import { useStore } from "@src/store";
import React, { useCallback } from "react";

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
