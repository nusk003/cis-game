import { Input, Button } from "@src/components/atoms";
import { Form } from "@src/components/organisms";

export const HomeSettingsModalProfile = () => {
  return (
    <Form>
      <Input defaultValue="Nusky" type="text" placeholder="First Name" />
      <Input
        defaultValue="Ahamed"
        mt="16px"
        type="text"
        placeholder="Last Name"
      />
      <Input
        defaultValue="nusk003@gmail.com"
        disabled
        mt="16px"
        type="email"
        placeholder="Email"
      />
      <Input
        defaultValue="0772191987"
        mt="16px"
        type="password"
        placeholder="Password"
      />
      <Button mt="24px">Update</Button>
    </Form>
  );
};
