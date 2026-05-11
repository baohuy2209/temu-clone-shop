import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignUp from "@/components/auth/SignUp";
import { redirect } from "next/navigation";

import { z } from "zod";
const SignUpSchema = z.object({
  email: z.email(),
  password: z.string().min(5),
});
const SignUpPage = async () => {
  const { user } = await getCurrentSession();
  if (user) {
    return redirect("/");
  }
  const action = async (prevState: any, form: FormData) => {
    "use server";
    const parsed = SignUpSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);
    if (error) {
      return { success: false, message: error };
    } else if (user) {
      await loginUser(email, password);
      console.log(user);
      return redirect("/");
    }
  };
  return <SignUp action={action} />;
};
export default SignUpPage;
