import { Input, Button } from "@src/components/atoms";
import { Form } from "@src/components/organisms";
import { useAuth } from "@src/utils/hooks";
import React, { useCallback, useEffect, useState } from "react";

export const HomeSettingsModalProfile = () => {
  const { currentUser, updateUser } = useAuth();
  const [name, setName] = useState(currentUser?.attributes?.name);

  useEffect(() => {
    if (currentUser?.attributes?.name) {
      setName(currentUser.attributes.name);
    }
  }, [currentUser?.attributes]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const email = currentUser?.attributes?.email;
      if (name && email) updateUser(name, email);
    },
    [currentUser, name]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Input
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <Input
        defaultValue={currentUser?.attributes?.email}
        disabled
        mt="16px"
        type="email"
        placeholder="Email"
      />
      <Button mt="24px">Update</Button>
    </Form>
  );
};
