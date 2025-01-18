import { cookies } from "next/headers";
import RegisterForm from "./register-form";
import { redirect } from "next/navigation";

export default function Login() {
  const store = cookies();
  const user = store.get("userId");
  if (user) {
    redirect("/dashboard");
  }
  return <RegisterForm />;
}
