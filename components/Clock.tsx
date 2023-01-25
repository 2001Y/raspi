"use client"

import { useState, useEffect } from 'react';

export default function Clock() {

    const [state_date, setState_Date] = useState(new Date());

    useEffect(() => {

        let looper = setInterval(() => {
            setState_Date(new Date());
        }, 1000);

        return () => clearInterval(looper);
    }, [])

    return (
        <>
            {state_date.getHours()}:{state_date.getMinutes()}
        </>
    )

}
