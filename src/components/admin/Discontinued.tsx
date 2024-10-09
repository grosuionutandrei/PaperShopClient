import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {Availability} from "../../Models/Availability.tsx";

export interface Discontinued{
    discontinued:boolean;
}
export const Discontinued = ({discontinued}:Discontinued)=>{
    const [discontinuedValue,setDiscontinued] =  useState("");
    useEffect(() => {
        discontinued?setDiscontinued(Availability.DISCONTINUED):setDiscontinued(Availability.AVAILABLE);
    }, [discontinued]);

    return (
        <li className={"flex flex-col w-1/4 items-center"}><strong>Availability:</strong>
            <span>{discontinuedValue || 'N/A'}</span></li>
    )


}