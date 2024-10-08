import {Price} from "../ProductDisplay/ProductPrice.tsx";
import {Stock} from "../ProductDisplay/Stock.tsx";
import React, {useEffect, useState} from "react";
import {CartProduct} from "../../Models/CartProduct.tsx";
import {ProductBuy} from "../ProductDisplay/ProductBuy.tsx";
import {useAtom} from "jotai";
import {CartAtom} from "../../atoms/CartAtom.tsx";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";

interface CartProp{
    cartItem:CartProduct
}

export enum UpdateQuantity{
   up,down
}

export const ProductCartDisplay = ({cartItem}:CartProp)=>{
    const [cartProduct,setCartProduct] =  useState<CartProduct>({
        productId:0,
        quantity:0,
        price:0,
        productName:""
    });
    const [cart,setCartAtom] = useAtom(CartAtom);
    const[,setRefreshCart] =  useAtom(REFRESH_CART);

    useEffect(() => {
        const cartItemPrice = computeCartItemPrice();
        const cartItemCurrent:CartProduct = {
            productId:cartItem!.productId,
            quantity:cartItem.quantity,
            price:cartItemPrice,
            productName:cartItem.productName
        }
        setCartProduct(cartItemCurrent);
    }, []);


    const computeCartItemPrice = ()=>{
        return cartItem.quantity!*cartItem.price!;
    }

    const updateQuantity = (action: UpdateQuantity) => {
        const cartItem =  cart.find(e=>e.productId==cartProduct.productId);
        switch(action) {
            case UpdateQuantity.up: {
                const tempQuantity = cartProduct.quantity + 1;
                const tempPrice = tempQuantity * cartItem!.price;
                setCartProduct({ ...cartProduct, quantity: tempQuantity, price: tempPrice });
                cartItem!.quantity=tempQuantity;
                setRefreshCart(true);
                break;
            }
            case UpdateQuantity.down: {
                const tempQuantity = cartProduct.quantity - 1;
                const tempPrice = tempQuantity * cartItem!.price;
                setCartProduct({ ...cartProduct, quantity: tempQuantity, price: tempPrice });
                cartItem!.quantity=tempQuantity;
                setRefreshCart(true);
                break;
            }
            default:
                break;
        }
    };


    return (
        <div className="card bg-white shadow-lg border border-gray-500">
            <figure><img className={"h-80 object-cover"}
                         src="https://i.postimg.cc/J4vBQmLZ/b1177cdfa70c27dfb44fb993fba9a1b4.jpg"
                         alt="Paper image"/></figure>
            <div className="card-body ">
                <h2 className="card-title">{cartProduct.productName}</h2>
                <Price price={cartProduct.price!}/>
                <Stock items={cartProduct.quantity} message={"pieces"}/>
                <ProductBuy availablePieces={10} items={cartItem.quantity} updateQuantity={updateQuantity}></ProductBuy>
            </div>
        </div>
    )
}