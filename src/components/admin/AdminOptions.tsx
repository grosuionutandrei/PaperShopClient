import {useAtom} from "jotai";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";
import {CREATE_MODAL} from "../../atoms/OpenCretaModal.tsx";
import {OPEN_PROPERTIES_MODAL, RENDEr_PROPERTY_CREATE} from "../../atoms/OpenPropertiesModal.tsx";
import {replace, useLocation, useNavigate} from "react-router-dom";
import {RETRIEVE_PROPERTIES} from "../../atoms/EditPropertyAtom.tsx";

interface PaperToDelete {
    paperId: number
    openModal: () => void
}

export const AdminOptions = () => {
    const [, setOpenCreateModal] = useAtom(CREATE_MODAL);
    const [, setRetrieveProperties] = useAtom(RETRIEVE_PROPERTIES);
    const navigate = useNavigate();
    const location = useLocation();
    const [, setOpenCreate] = useAtom(RENDEr_PROPERTY_CREATE);
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
                {location.pathname.includes("properties") ? (
                        <>
                            <li><a onClick={() => {
                                navigate("/api/admin/properties/create", {replace: true});
                                setOpenCreate(true);
                            }}>Create property</a></li>
                            <li><a onClick={() => navigate("/api/admin/customers")}>Customers</a></li>
                            <li><a onClick={() => navigate("/api/admin/papers/0")}>Products</a></li>
                        </>)
                    : location.pathname.includes("customers") ? (
                        <>
                        <li><a onClick={() => {
                            navigate("/api/admin/properties");
                            setRetrieveProperties(true);
                        }}>Properties</a></li>
                        <li><a onClick={() => navigate("/api/admin/papers/0")}>Products</a></li>
                        </>
                    ) : (
                        <>
                            <li><a onClick={() => setOpenCreateModal(true)}>CreatePaper</a></li>
                            <li><a onClick={() => navigate("/api/admin/customers")}>Customers</a></li>
                            <li><a onClick={() => {
                                navigate("/api/admin/properties");
                                setRetrieveProperties(true);
                            }}>Properties</a></li>
                        </>
                    )}
            </ul>
        </div>
    )

}

