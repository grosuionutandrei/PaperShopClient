import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";

interface PaperToDelete {
    paperId: number
    openModal:()=>void
}

export const DeletePaper = ({paperId,openModal}: PaperToDelete) => {
    const [paperToDelete, setPaperToDelete] = useState(paperId);
    const [refreshMainPage, setRefreshMainPage] = useAtom(REFRESH_CART);

    useEffect(() => {
        setPaperToDelete(paperId);
    }, [paperId]);

    const deletePaper = () => {
        http.api.papersDeleteDelete(paperToDelete).then((result: AxiosResponse<boolean>) => {
            if (result.status === 200) {
                toast.success("Delete operation successful");
                openModal();
                setRefreshMainPage(true);
            } else {
                toast.error("Delete operation failed");
            }
        }).catch((e: any) => {
            if (e.response) {
                const serverErrorMessage = e.response.data.message || e.response.data.error || "An error occurred";
                toast.error(`Error: ${serverErrorMessage}`);
            } else {
                toast.error(`Error: ${e.message}`);
            }
        });
    }


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
                <li onClick={deletePaper}><a>Delete</a></li>
            </ul>
        </div>
    )

}

