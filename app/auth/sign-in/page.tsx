import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { redirect } from "next/navigation";

import { z } from "zod";
const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(5),
});
const SignInPage = async () => {
  const { user } = await getCurrentSession();
  if (user) {
    return redirect("/");
  }
  const action = async (prevState: any, form: FormData) => {
    "use server";
    const parsed = SignInSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const { email, password } = parsed.data;
    const { user, error } = await loginUser(email, password);
    if (error) {
      return { success: false, message: error };
    } else if (user) {
      return redirect("/");
    }
  };
  return <SignIn action={action} />;
};
export default SignInPage;
