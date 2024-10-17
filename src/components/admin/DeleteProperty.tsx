import {Render} from "./EditProperty.tsx";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {RENDER_PROPERTY_DELETE, RERENDER_PROPERTY_EDIT} from "../../atoms/OpenPropertiesModal.tsx";
import {RETRIEVE_PROPERTIES} from "../../atoms/EditPropertyAtom.tsx";
import {useNavigate} from "react-router-dom";
import {http} from "../../http.ts";
import {EditPaperPropertyDto} from "../../Api.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";


export const DeleteProperty = ({property}: Render) => {
    const [ ,setEditPropertyModal] = useAtom(RERENDER_PROPERTY_EDIT);
    const [rerender, setRerender] = useAtom(RENDER_PROPERTY_DELETE);
    const [, setRenderAfterEdit] = useAtom(RETRIEVE_PROPERTIES);
    const [modalClass, setModalClass] = useState<string>("modal-close");
    const navigate = useNavigate();
    useEffect(() => {
        if (rerender) {
            setModalClass("modal-open");
        } else {
            setModalClass("modal-close");
        }
    }, [rerender]);

    const closeEditWindow = () => {
        navigate("/api/admin/properties/edit", {replace: true});
        setRerender(false);
    }

    const performDelete = () => {
        const propToDelete: EditPaperPropertyDto = {propertyId: property.propId, propName: property.propName};
        http.api.adminDeletePaperProprietyPartialUpdate(propToDelete)
            .then((response: AxiosResponse<EditPaperPropertyDto>) => {
                if (response.status === 200) {
                    navigate("/api/admin/properties", {replace: true});
                    setRerender(false);
                    setEditPropertyModal(false);
                    setRenderAfterEdit(true);
                    toast.success(`${response.data.propName} property deleted with success`)
                } else if (response.status === 500) {
                    navigate("/api/admin/properties/edit", {replace: true});
                    setRerender(false);
                    toast.error("Delete operation failed");
                }
            }).catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(`Error: ${e.response.data.message}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
            navigate("/api/admin/properties/edit", {replace: true});
            setRerender(false);

        })
    }


    return (
        <dialog id="my_modal_1" className={`modal ${modalClass}`}>
            <div className="modal-box">
                <p className="py-4">The property will be deleted permanently!</p>
                <p className="py-4">Do you want to continue?</p>
                <div className="modal-action mt-2.5">
                    <form method="dialog">
                        <button className="btn border-blue-500 bg-blue-400 mr-2 "
                                onClick={closeEditWindow}>&#10006;</button>
                        <button className="btn border-emerald-500 bg-emerald-400"
                                onClick={performDelete}>&#10004;</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}