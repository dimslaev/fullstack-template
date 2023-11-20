import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import * as z from "zod";

import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type Values = z.infer<typeof schema>;

type Props = {
  onSubmit: (values: Values) => void;
  isSubmitting: boolean;
};

export const SignupForm = ({ onSubmit, isSubmitting }: Props) => {
  return (
    <Box sx={{ mx: "auto", p: 2, maxWidth: 460 }}>
      <Form<Values, typeof schema> onSubmit={onSubmit} schema={schema}>
        {({ register, formState }) => (
          <Stack spacing={2}>
            <FieldWrapper
              required
              label="Email"
              error={formState.errors["email"]}
            >
              <Input type="text" {...register("email")} />
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
          </Stack>
        )}
      </Form>
    </Box>
  );
};
