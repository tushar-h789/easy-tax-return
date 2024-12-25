import LoginForm from "../_components/login-form";

export default function LoginPage({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string;
  };
}) {
  return (
    <>
      <LoginForm callbackUrl={callbackUrl} />
    </>
  );
}
