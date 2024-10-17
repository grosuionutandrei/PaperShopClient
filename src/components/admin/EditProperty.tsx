import {EditPaperPropertyDto, PaperProperties} from "../../Api.ts";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {RERENDER_PROPERTY_EDIT} from "../../atoms/OpenPropertiesModal.tsx";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {RETRIEVE_PROPERTIES} from "../../atoms/EditPropertyAtom.tsx";
import {EditPropertyOptions} from "./EditPropertyOptions.tsx";

export interface Render {
    property: PaperProperties
}

export const EditProperty = ({property}: Render) => {
    const [propertyToEdit, setPropertyToEdit] = useState<string>(property.propName! || "");
    const [rerender, setRerender] = useAtom(RERENDER_PROPERTY_EDIT);
    const [, setRenderAfterEdit] = useAtom(RETRIEVE_PROPERTIES);
    const [modalClass, setModalClass] = useState<string>("modal-close");
    const [requiredAttribute, setRequiredAttribute] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (rerender) {
            setPropertyToEdit(property.propName!);
            setModalClass("modal-open");
        } else {
            setModalClass("modal-close");
        }
    }, [rerender]);

    const captureEditedValue = (value: string) => {
        setPropertyToEdit(value);
    }

    const closeEditWindow = () => {
        navigate("/api/admin/properties", {replace: true});
        setRerender(false);
    }

    const saveEditOperation = () => {
        if (propertyToEdit === "") {
            setRequiredAttribute(true);
            return;
        }
        if (propertyToEdit === property.propName) {
            navigate("/api/admin/properties", {replace: true});
            closeEditWindow();
            toast.success(`Property edited successful! New name is ${property.propName}`);

        } else {
            setRequiredAttribute(false);
            const edited: EditPaperPropertyDto = {propertyId: property.propId, propName: propertyToEdit};
            http.api.adminEditPaperProprietyPartialUpdate(edited).then((response: AxiosResponse<PaperProperties>) => {
                if (response.status == 200) {
                    const editedProp: PaperProperties = response.data;
                    navigate("/api/admin/properties", {replace: true});
                    setRenderAfterEdit(true);
                    toast.success(`Property edited successful! New name is ${editedProp.propName}`);
                } else {
                    toast.error("Edit operation unsuccessfully");
                }
                closeEditWindow();
            }).catch((e) => {
                if (e.response && e.response.data && e.response.data.message) {
                    toast.error(`Error: ${e.response.data.message}`);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            })
        }
    }

    return (
        <dialog id="my_modal_1" className={`modal ${modalClass}`}>
            <div className="modal-box">
                <div className={"flex justify-between"}>
                    <h3 className="font-bold text-lg">Edit property!</h3>
                <EditPropertyOptions></EditPropertyOptions>
                </div>

                <p className="py-4">The entered value will be the property's new name!</p>
                <input required={requiredAttribute} type={"text"} value={propertyToEdit} className={"peer"}
                       onChange={(e) => {
                           captureEditedValue(e.target.value)
                       }}></input>
                <p className="text-transparent peer-invalid:text-red-500 peer-focus-within:text-transparent h-6">
                    The new name cannot be empty!
                </p>

                <div className="modal-action mt-2.5">
                    <form method="dialog">
                        <button className="btn border-blue-500 bg-blue-400 mr-2 "
                                onClick={closeEditWindow}>&#10006;</button>
                        <button className="btn border-emerald-500 bg-emerald-400"
                                onClick={saveEditOperation}>&#10004;</button>
                    </form>
                </div>
            </div>
        </dialog>

    )

}