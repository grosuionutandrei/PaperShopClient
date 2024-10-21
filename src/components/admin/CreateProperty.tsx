import {EditPropertyOptions} from "./EditPropertyOptions.tsx";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {RENDEr_PROPERTY_CREATE} from "../../atoms/OpenPropertiesModal.tsx";
import {http} from "../../http.ts";
import {CreatePropertyDto, PaperProperties} from "../../Api.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {RETRIEVE_PROPERTIES} from "../../atoms/EditPropertyAtom.tsx";
import {useNavigate} from "react-router-dom";
import {PAPER_PROPERTIES} from "../../atoms/PaperProperties.tsx";

export const CreateProperty = () => {
    const [modalClass, setModalClass] = useState<string>("modal-close");
    const [createProperty, setCreateProperty] = useState("");
    const [renderCreate, setRenderCreate] = useAtom(RENDEr_PROPERTY_CREATE);
    const [requiredAttribute, setRequired] = useState<boolean>(false);
    const [properties, setProperties] = useAtom(PAPER_PROPERTIES);
    const navigate = useNavigate();
    useEffect(() => {
        if (renderCreate) {
            setCreateProperty("");
            setRequired(false);
            setModalClass("modal-open");
        } else {
            setModalClass("modal-close");
        }
    }, [renderCreate]);

    const captureCreatedValue = (value: string) => {
        setCreateProperty(value);
    }

    const closeCreateWindow = () => {
        setRenderCreate(false);
    }
    const saveCreateOperation = () => {
        if (createProperty === "") {
            setRequired(true);
            return;
        }
        const createdProperty: CreatePropertyDto = {propertyName: createProperty}
        http.api.adminCreatePropertyCreate(createdProperty).then((response: AxiosResponse<PaperProperties>) => {
            if (response.status === 200) {
                setRenderCreate(false);
                setProperties([...properties, {propId: response.data.propId, propName: response.data.propName}]);
                navigate("/api/admin/properties", {replace: true});
                toast.success(`Property ${response.data.propName} created`);
            } else {
                toast.error("Creating property failed");
            }
        }).catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(`Error: ${e.response.data.message}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
        })
    }
    const handleFocus = () => {
        setRequired(true);
    }

    return (
        <dialog id="my_modal_1" className={`modal ${modalClass}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create property!</h3>
                <p className="py-4">The entered value will be the property name!</p>
                <input required={requiredAttribute} type={"text"} value={createProperty} className={"peer"}
                       onChange={(e) => {
                           captureCreatedValue(e.target.value)
                       }}
                       onFocus={handleFocus}
                ></input>
                <p className="text-transparent peer-invalid:text-red-500 peer-focus-within:text-transparent h-6">
                    Input cannot be empty!
                </p>

                <div className="modal-action mt-2.5">
                    <form method="dialog">
                        <button className="btn border-blue-500 bg-blue-400 mr-2 "
                                onClick={closeCreateWindow}>&#10006;</button>
                        <button className="btn border-emerald-500 bg-emerald-400"
                                onClick={saveCreateOperation}>&#10004;</button>
                    </form>
                </div>
            </div>
        </dialog>
    )

}