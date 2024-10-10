import React, {useState} from "react";
import {PaperProperties} from "../../Api.ts";
import {EditProduct} from "./EditProduct.tsx";
import {EditProperty} from "./EditProperty.tsx";

export const PropertyView = ({propId, propName}: PaperProperties) => {
    const editOpened: string = "collapse-open";
    const editClosed: string = "collapse-close";
    const [openEdit, setOpenEdit] = useState(editClosed);

    const openEditModal = () => {
        if (openEdit == editOpened) {
            setOpenEdit(editClosed)
        } else {
            setOpenEdit(editOpened);
        }
    }
    return (
        <>
            <div tabIndex={0} onClick={openEditModal} className={`collapse ${openEdit} `}>
                <div className="collapse-title text-xl font-medium">
                    <li
                        key={propId}
                        className=" h-20 collapse flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                    >
                        <div className="collapse-title text-xl font-medium">
                            <span className="text-blue-500 text-2xl mr-4">•</span>
                            <span className="text-lg text-gray-600">{propName}</span>
                        </div>
                    </li>

                </div>
                <div className="collapse-content"
                     onClick={(e) => e.stopPropagation()}>
                    <EditProperty propName={propName}></EditProperty>
                </div>
            </div>

        </>
    )
}
