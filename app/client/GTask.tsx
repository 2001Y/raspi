import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { SignIn, SignOut } from "app/client/authButton"

export default async function () {

    const session = await unstable_getServerSession(authOptions);

    if (session) {

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
        )
            .then((response) => response.json());

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
        )
            .then((response) => response.json());

        let data = list.items;


        data.sort((a, b) => a.position - b.position);
        // data = data.filter(a => a.status == 'needsAction')
        // console.log(data)

        return (
            <>
                <ul>
                    {session && data.map((e, i) => (
                        <li key={i}>
                            {e.title}
                        </li>
                    ))}
                </ul>
            </>
        )
    } else {
        return (
            <>
                <SignIn />
            </>
        )
    }

}
