import GTask from "../components/GTask"
export default async function Home() {

  return (
    <main>
      {/** @ts-expect-error */}
      <GTask />
    </main>
  )

}
