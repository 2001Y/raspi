"use client";

import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        setInterval(() => {
            location.reload()
        }, 30 * 60000);
    });

    return null;
}