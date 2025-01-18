import { cookies } from "next/headers";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default function Login() {
  const store = cookies();
  const user = store.get("userId");
  if (user) {
    redirect("/dashboard");
  }
  return <LoginForm />;
}
