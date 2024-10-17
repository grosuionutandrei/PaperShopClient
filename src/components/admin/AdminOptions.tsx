
import {useAtom} from "jotai";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";
import {CREATE_MODAL} from "../../atoms/OpenCretaModal.tsx";
import {OPEN_PROPERTIES_MODAL} from "../../atoms/OpenPropertiesModal.tsx";
import {useNavigate} from "react-router-dom";
interface PaperToDelete {
    paperId: number
    openModal:()=>void
}

export const AdminOptions = () => {
    const [refreshMainPage, setRefreshMainPage] = useAtom(REFRESH_CART);
    const [,setOpenCreateModal] =  useAtom(CREATE_MODAL);
    const[,setOpenPropertyModal] = useAtom(OPEN_PROPERTIES_MODAL);
    const navigate = useNavigate();

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
                <li><a onClick={() => setOpenCreateModal(true)}>CreatePaper</a></li>
                <li><a onClick={() =>navigate("/api/admin/properties")}>Properties</a></li>
            </ul>
        </div>
    )

}

