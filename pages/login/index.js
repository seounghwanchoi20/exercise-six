import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ isLoggedIn, loginUserFunction }) {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <div>
      <LoginForm loginUserFunction={loginUserFunction}></LoginForm>
    </div>
  );
}
