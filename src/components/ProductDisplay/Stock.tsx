import React from "react";

export interface Stock{
    items:number|undefined
}

export const Stock=({items}:Stock)=>{
    const computeSkin = (items:number)=>{
        if(items<=0){
             return `stat-desc text-red-400`;
        }
        return  `stat-desc text-green-400`;
    }

    return (
        <p className={`${computeSkin(items!)}`}>{`${items} items remaining`}</p>
    )
}