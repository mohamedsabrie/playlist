import Sidebar from "@/components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Songs from "@/components/Songs";
import Player from "@/components/Player";


export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="flex min-w-[992px] min-h-screen overflow-x-auto bg-black">
      <Header />
      <Sidebar />
      <main className="flex-1 pb-32 ">
        <Hero />
        <Songs />
      </main>
      <div className="fixed bottom-0 w-full ">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context:any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
