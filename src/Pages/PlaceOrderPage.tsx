import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {CartAtom} from "../atoms/CartAtom.tsx";
import {ProductCartDisplay} from "../components/CartProducts/ProductCartDisplay.tsx";
import {REFRESH_CART} from "../atoms/AddToCart.tsx";
import {TAX_STATE} from "../atoms/TaxAtom.tsx";
import {OrderEntryPlacedDto, OrderMain, OrderPlacedDto} from "../Api.ts";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {OrderPlacedResponse} from "../components/Order/OrderPlacedResponse.tsx";

export const PlaceOrderPage = () => {
    const [cartItems, setCartItems] = useAtom(CartAtom);
    const [cartPrice, setCartPrice] = useState(0);
    const [refreshTotalPrice, setRefreshTotalPrice] = useAtom(REFRESH_CART);
    const [taxValue] = useAtom(TAX_STATE);
    const [openWindow,setOpenWindow] = useState(false);
    const [orderResponse,setOrderResponse] =  useState<OrderMain>({})

    useEffect(() => {
        if (!refreshTotalPrice) {
            return;
        }
        computeCurrentCartPrice();
    }, [refreshTotalPrice]);

    const computeCurrentCartPrice = () => {
        let computeCartPrice = cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price! * currentValue.quantity!), 0);
        setCartPrice(computeCartPrice);
        setRefreshTotalPrice(false);
    }

    const computeTax = () => {
        return cartPrice * (taxValue / 100);
    }


    const sendOrder = ()=>{
        const  orderItems: OrderEntryPlacedDto[] =  cartItems.map(e=>{
            const extractOrderItem:OrderEntryPlacedDto ={
                productId:e.productId,
                quantity:e.quantity
            }
            return extractOrderItem
        } )
        const  orderToPlace:OrderPlacedDto = {
            customerId:1,
            orderPlacedProducts:orderItems
        }

        http.api.customerPlaceOrderCreate(1,orderToPlace).then((result:AxiosResponse<OrderMain>)=>{
            setOrderResponse(result.data);
            setOpenWindow(true);
        }).catch(e=>toast.error(e))
    }

    const getOpenWindow =(val:boolean)=>{
        setOpenWindow(val);
    }

    const resetCart = ()=>{
        setCartItems([]);
        setRefreshTotalPrice(true);
    }

    return (
        <>
            <div className="grid grid-cols-1 w-1/2 mx-auto h-96 flex-grow overflow-y-auto">
                {cartItems.map(p => (
                    <ProductCartDisplay key={p.productId} cartItem={p}/> // Add a key prop for list items
                ))}
            </div>
            <div
                className="rounded-2xl  border border-gray-500 mx-auto flex items-center justify-center sticky w-1/2 bottom-0  bg-white"> {/* Optional: Add a background to footer for visibility */}
                <div className="stat w-56 min-w-10 max-w-56">
                    <div className=" sm:stat-desc md:stat-title lg:stat-title">Moms:</div>
                    <div className=" sm:stat-desc md:stat-value lg:stat-value">{computeTax().toFixed(3)}</div>
                </div>
                <div className="stat w-56 min-w-10 max-w-56">
                    <div className=" sm:stat-desc md:stat-title lg:stat-title">Total Price:</div>
                    <div className=" sm:stat-desc md:stat-value lg:stat-title">{cartPrice.toFixed(3)}</div>
                </div>
                <div>
                    <button className={"btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ml-2"} onClick={()=>sendOrder()}>Place order</button>
                </div>

            </div>
            <OrderPlacedResponse setOpen={getOpenWindow} isOpen={openWindow} orderData={orderResponse} resetCart={resetCart}/>
        </>
    )

}