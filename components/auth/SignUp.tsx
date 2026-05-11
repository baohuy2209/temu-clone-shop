"use client";
import React from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
const initialState = {
  success: false,
  message: "",
};

type SignUpProps = {
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{ success?: boolean; message: string } | undefined>;
};

const SignUp = ({ action }: SignUpProps) => {
  const [state, formrAction, isPending] = React.useActionState(
    action,
    initialState
  );
  const router = useRouter();
  // Redirect khi sign up thành công
  React.useEffect(() => {
    if (state?.success) {
      router.push("/");
      router.refresh();
    }
  }, [state, router]);
  return (
    <Form
      action={formrAction}
      className="max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-2">
        Join the DEAL Revolution!
      </h1>
      <p className="text-center text-sm text-rose-600 font-semibold mb-2">
        LIMITED TIME OFFER
      </p>
      <p className="text-center text-sm text-gray-600 font-semibold mb-2">
        Sign up now and get 90% OFF your first order!
      </p>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-colors"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-colors"
            placeholder="Enter your password"
          />
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            Only 127 welcome bonus packages remaining!
          </p>
          <p className="text-xs text-gray-500 mb-4">Offer expires in 13:45</p>
        </div>
        <button
          className={`w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors font-medium flex items-center justify-center gap-2 ${
            isPending ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <span>Creating account...</span>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
        {state?.message && state.message.length > 0 && (
          <p
            className={`text-center text-sm font-medium ${
              state.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </Form>
  );
};
export default SignUp;
