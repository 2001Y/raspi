"use client"

import { useState, useEffect } from "react";

export default function GTask({ accessToken }) {
    // ローディング、エラー、データの状態
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // データを取得するためのuseEffectフック
    useEffect(() => {
        // データを取得する非同期関数
        async function fetchData() {
            try {
                // リストを取得
                let lists = await fetch(
                    "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                            "Content-Type": "application/json",
                        },
                    }
                ).then((response) => response.json());

                // 最初のリストを選択
                let listId = lists.items[0].id;

                let list = await fetch(
                    `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=false`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                            "Content-Type": "application/json",
                        },
                    }
                ).then((response) => response.json());

                const data = list.items;
                data.sort((a: any, b: any) => a.position - b.position);

                // データを状態にセット
                setData(data);
            } catch (error) {
                // エラーを状態にセット
                setError(error);
            } finally {
                // ローディングをfalseにセット
                setLoading(false);
            }
        }
        // 非同期関数を呼び出す
        fetchData();
    }, [accessToken]); // 依存配列

    // 状態に応じてUIをレンダリング
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (data)
        return (
            <ul>
                {data.length != 0 && data.map((e, i) => (
                    <li key={i}>{e.title}</li>
                ))}
            </ul>
        );
    return null;
}