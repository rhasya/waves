import Header from "@/components/Header";
import Main from "@/components/ui/Main";
import WaveList from "@/components/ui/WaveList";
import WaveWriter from "@/components/ui/WaveWriter";
import { getWaves } from "@/server/actions";
import { verifySession } from "@/server/session";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await verifySession();
  const waves = getWaves();

  return (
    <>
      <Header />
      <Main>
        {session.isAuth && (
          <div className="mt-4">
            <WaveWriter />
          </div>
        )}
        <div className="mt-4">
          <WaveList auth={session.isAuth} wavesPromise={waves} />
        </div>
      </Main>
      <Footer />
    </>
  );
}
