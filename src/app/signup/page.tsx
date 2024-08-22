import SignupForm from "@/app/signup/SignupForm";
import Header from "@/components/Header";
import Main from "@/components/ui/Main";

export default function Signup() {
  return (
    <>
      <Header />
      <Main>
        <div className="mt-4 flex flex-col gap-4 rounded border p-4">
          <SignupForm />
        </div>
      </Main>
    </>
  );
}
