import {OrderEntryQto, PaperProperties, PaperToDisplay} from "../../Api.ts";
import {formatDate, transformPaperPropertiesToString} from "../../Utils/Utils.tsx";
import {Price} from "../ProductDisplay/ProductPrice.tsx";
import {Discontinued} from "./Discontinued.tsx";
import {useEffect, useState} from "react";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";

export interface PaperProps {
    product: PaperToDisplay;
    color: string;
    openModal: () => void;
    getPaperId: (paperId: number) => void;
}


export const AdminProductDisplay = ({product, color, openModal, getPaperId}: PaperProps) => {
    const [paperProperties, setPaperProperties] = useState<PaperProperties[]>([]);
    const [windowControl, setWindowControl] = useState("collapse-close");
    const open = "collapse-open";
    const close = "collapse-close";
    const switchClasses = () => {
        if (windowControl === "collapse-close") {
            setWindowControl(open);
            return;
        }
        setWindowControl(close);
    }

     const getPaperProperties = (productId: number) => {
        http.api.papersDetailsDetail(productId).then((result: AxiosResponse<PaperProperties[]>) => {
            setPaperProperties(result.data);
        }).catch((e) => {
            toast.error(e)
        })
    }


    return (
        <div tabIndex={0} onClick={() => {
            switchClasses();
            getPaperProperties(product.id!)
        }} className={`${windowControl} border-base-300 bg-base-200 border ${color} mb-1`}>
            <div className="collapse-title text-xl font-medium">
                <ul className="list-none  flex justify-around items-center gap-2  ">
                    <li className={"flex flex-col w-1/5 items-center"}><strong>Name</strong>
                        <span>{product.name || 'N/A'}</span></li>
                    <Discontinued discontinued={product.discontinued!}/>
                    <li className={"flex flex-col w-1/5 items-center"}><strong>Stock</strong>
                        <span>{product.stock || 'N/A'}</span></li>
                    <li className={"flex flex-col w-1/5 items-center"}><strong>Price</strong>
                        <Price price={product.price!}/></li>
                    <li>
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openModal();
                                    getPaperId(product.id!)
                                }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill={"evenodd"}
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                    </li>
                </ul>

            </div>
            <div className="collapse-content">
                <ul className="list-none  flex justify-start items-center gap-2  ">
                    <li className={"flex w-fit items-center"}><strong>Properties:</strong>
                        <span>{transformPaperPropertiesToString(paperProperties!)}</span></li>
                </ul>
            </div>
        </div>
    )
}