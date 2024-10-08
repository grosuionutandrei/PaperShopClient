import React from "react";

export interface Stock{
    items:number|undefined
    message:string
}

export const Stock=({items,message}:Stock)=>{
    const computeSkin = (items:number)=>{
        if(items<=0){
             return `stat-desc text-red-400`;
        }
        return  `stat-desc text-green-400`;
    }

    return (
        <p className={`${computeSkin(items!)}`}>{`${items} ${message}`}</p>
    )
}