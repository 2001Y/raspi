import { getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"

import GTask from "../components/GTask"
import { SignIn, SignOut } from "../components/AuthBotton"

export default async function Home() {

  const session = await getServerSession(authOptions)
  const accessToken: string = session?.user.accessToken || "";

  // console.log(session)

  return (
    <main>

      {session?.user.accessToken ? (
        <>
          {/* * @ts-expect-error */}
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
