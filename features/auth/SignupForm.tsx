import * as z from "zod";
import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type SignupValues = {
  email: string;
  password: string;
};

type SignupFormProps = {
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
};

export const SignupForm = ({ onSubmit, isSubmitting }: SignupFormProps) => {
  return (
    <Box>
      <Form<SignupValues, typeof schema> onSubmit={onSubmit} schema={schema}>
        {({ register, formState }) => (
          <>
            <FieldWrapper
              required
              label="Email"
              error={formState.errors["email"]}
            >
              <Input type="email" {...register("email")} />
            </FieldWrapper>

            <FieldWrapper
              required
              label="Password"
              error={formState.errors["password"]}
            >
              <Input type="password" {...register("password")} />
            </FieldWrapper>

            <Button loading={isSubmitting} type="submit">
              Sign up
            </Button>
          </>
        )}
      </Form>
    </Box>
  );
};
