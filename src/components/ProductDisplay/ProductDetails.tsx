import React, {useEffect, useState} from "react";
import {Price} from "./ProductPrice.tsx";
import {Stock} from "./Stock.tsx";
import {http} from "../../http.ts";
import {OrderEntryPlacedDto, PaperProperties, PaperToDisplay} from "../../Api.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {useAtom} from "jotai";
import {CartAtom} from "../../atoms/CartAtom.tsx";
import {CartProduct} from "../../Models/CartProduct.tsx";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";

export interface OpenModal {
    openModal: () => void
    isOpen: boolean
    product: PaperToDisplay;
}


export const ProductDetails = ({isOpen, openModal, product}: OpenModal) => {
    const [openClass, setOpenClass] = useState<string>("");
    const [getPaperProps, setProperties] = useState<PaperProperties[]>([]);
    const [orderEntries, setOrderEntries] = useAtom(CartAtom);
    const [refreshCart, setRefreshCart] = useAtom(REFRESH_CART);
    const getProprieties = (id: number) => {
        http.api.papersDetailsDetail(id)
            .then((result: AxiosResponse<PaperProperties[]>) => {
                setProperties(result.data)
            }).catch(error => {
            toast.error(error);
        })
    }

    useEffect(() => {
        if (isOpen) {
            setOpenClass("modal-open");
        } else {
            setOpenClass("");
        }
        getProprieties(product.id!);
    }, [isOpen]);

    const closeWindow = () => {
        setOpenClass("");
        openModal();
    }

    const disabled = ()=>{
        return product.stock==0;
    }

    const placeOrder = () => {
        const getProductsIfExists = orderEntries.find(e => e.productId == product.id);
        if (getProductsIfExists !== undefined) {
            getProductsIfExists.quantity! += 1;
            setRefreshCart(true);
            closeWindow();
            return;
        }
        const orderEntry: CartProduct = {
            productId: product.id,
            quantity: 1,
            price: product.price
        }
        setOrderEntries([...orderEntries, orderEntry])
        setRefreshCart(true);
        closeWindow();
    }

    return (
        <dialog id="my_modal_4" className={`modal ${openClass}`}>
            <div className="modal-box w-11/12 max-w-xl">
                <div className="card bg-white shadow-lg ">
                    <figure><img className={"h-60 object-cover"}
                                 src="https://i.postimg.cc/J4vBQmLZ/b1177cdfa70c27dfb44fb993fba9a1b4.jpg"
                                 alt="Paper image"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <Price price={product.price!}/>
                        <Stock items={product.stock}/>
                    </div>
                </div>
                <h3 className="py-4">Properties</h3>
                <ul className={"flex flex-col items-start"}>
                    {
                        getPaperProps.map((prop) => {
                            return (<li key={prop.propId}>{prop.propName} </li>)
                        })
                    }
                </ul>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={() => closeWindow()}>Close</button>
                        <button className="btn" disabled={disabled()} onClick={() => placeOrder()}>Add to basket</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}