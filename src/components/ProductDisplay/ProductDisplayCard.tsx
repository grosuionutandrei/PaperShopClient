import React, {useState} from "react";
import {PaperToDisplay} from "../../Api.ts";
import {Stock} from "./Stock.tsx";
import {Price} from "./ProductPrice.tsx";
import {ProductDetails} from "./ProductDetails.tsx";

export interface ProductProp{
    product:PaperToDisplay;
}

export const ProductDisplayCard  = ({product}:ProductProp)=>{
    const [isOpen, setOpen] = useState<boolean>(false);

    const openModal= () => {
        console.log("isOpen");
        const toogle:boolean =isOpen?false:true
        setOpen(toogle);
    }
    return (
        <>
        <div className="card bg-white shadow-lg">
            <figure><img src="https://i.postimg.cc/J4vBQmLZ/b1177cdfa70c27dfb44fb993fba9a1b4.jpg" alt="Paper image"/></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <Price price={product.price!}/>
                  <Stock items={product.stock}/>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => openModal()}>See Details</button>
                </div>
            </div>
        </div>
    {isOpen && (
        <ProductDetails isOpen={isOpen} openModal={openModal} product={product}></ProductDetails>
    )}
        </>
    )
}