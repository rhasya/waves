import Header from "@/components/Header";
import Main from "@/components/Main";
import WaveWriter from "@/components/ui/WaveWriter";
import WaveList from "@/components/ui/WaveList";
import { getWaves } from "@/server/actions";
import { verifySession } from "@/server/session";

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
          <WaveList wavesPromise={waves} />
        </div>
      </Main>
    </>
  );
}
