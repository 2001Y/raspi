import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"

import GTask from "../components/GTask"
import { SignIn, SignOut } from "../components/AuthBotton"

export default async function Home() {

  const session = await unstable_getServerSession(authOptions);
  const accessToken: string = session?.user.accessToken || "";

  return (
    <main>

      {session ? (
        <>
          {/** @ts-expect-error */}
          < GTask accessToken={accessToken} />
        </>
      ) : (
        <>
          <h1>ログインしろ</h1>
          <SignIn />
        </>
      )}

    </main>
  )

}
