import LoginForm from "@/app/login/LoginForm";
import Header from "@/components/Header";
import Main from "@/components/ui/Main";

export default function Login() {
  return (
    <>
      <Header />
      <Main>
        <div className="mt-4 flex flex-col gap-4 rounded border p-4">
          <LoginForm />
        </div>
      </Main>
    </>
  );
}
