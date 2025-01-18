import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const user = cookieStore.get("userId");
  if (!user) {
    redirect("/login");
  }
  return children;
}
