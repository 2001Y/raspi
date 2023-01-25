import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { SignIn, SignOut } from "../components/AuthBotton"

export default async function GTask() {

    const session = await unstable_getServerSession(authOptions);
    let data = [];

    if (session && session.user && session.user.accessToken) {

        let accessToken = session.user.accessToken;

        // リストを取得
        let lists = await fetch(
            'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
            }
        ).then((response) => response.json());

        // 最初のリストを選択
        let listId = lists.items[0].id;

        let list = await fetch(
            `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=false`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
            }
        ).then((response) => response.json());

        data = list.items;
        data.sort((a: any, b: any) => a.position - b.position);

    }

    return (
        <>
            {session ? (
                <>
                    {data.map((e: any, i: number) => (
                        <li key={i}>
                            {e.title}
                        </li>
                    ))}
                </>
            ) : (
                <>
                    <h1>ログインしろ</h1>
                    <SignIn />
                </>
            )}
        </>
    )

}
