import { Button, Input } from "@src/components/atoms";
import { Form } from "@src/components/organisms";

export const RegisterForm = () => {
  return (
    <Form>
      <Input type="text" placeholder="First Name" mt="16px" required />
      <Input type="text" placeholder="Last Name" mt="16px" required />
      <Input type="email" placeholder="Email" mt="16px" required />
      <Input type="password" placeholder="Password" mt="16px" required />
      <Button type="submit" mt="16px">
        Register
      </Button>
    </Form>
  );
};
