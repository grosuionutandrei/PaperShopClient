import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {CREATE_MODAL} from "../../atoms/OpenCretaModal.tsx";

interface PaperToDelete {
    paperId: number
    openModal:()=>void
}

export const AdminOptions = () => {
    const [refreshMainPage, setRefreshMainPage] = useAtom(REFRESH_CART);
    const [,setOpenCreateModal] =  useAtom(CREATE_MODAL);


    return (
        <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <strong className="text-3xl">...</strong>
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a onClick={()=>setOpenCreateModal(true)}>CreatePaper</a></li>
            </ul>
        </div>
    )

}

