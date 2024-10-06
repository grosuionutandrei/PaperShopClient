import React from "react";

export interface Price {
    price: number;
}

export const Price = ({ price }: Price) => {
    const displayPrice = (price: number) => {
        if (Number.isInteger(price)) {
            return (
                <span className={""}>
                    {price}
                    <span className="">
                        <span className={""}>.</span>
                        <span className={""}>&ndash;</span>
                    </span>
                </span>
            );
        }
        return price;
    };

    return (
        <h2 className={"font-bold text-blue-700"}> {displayPrice(price)}</h2>
    );
};