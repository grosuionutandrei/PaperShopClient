import React, {useState} from "react";
import {PaperProperties} from "../../Api.ts";
import {EditProperty} from "./EditProperty.tsx";
import {useAtom} from "jotai";
import {RERENDER_PROPERTY_EDIT} from "../../atoms/OpenPropertiesModal.tsx";

export const PropertyView = ({propId, propName}: PaperProperties) => {
    const editOpened: string = "collapse-open";
    const editClosed: string = "collapse-close";
    const [openEdit, setOpenEdit] = useState(editClosed);
    const [rerender, setRerender] = useAtom(RERENDER_PROPERTY_EDIT);

    const openEditModal = () => {
        setRerender(true);
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
                        className=" h-32 collapse flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                    >
                        <div className="collapse-title text-xl font-medium">
                            <span className="text-blue-500 text-2xl mr-4">•</span>
                            <span className="text-lg text-gray-600">{propName}</span>
                        </div>
                    </li>

                </div>
                <div className="collapse-content"
                     onClick={(e) => e.stopPropagation()}>
                    <EditProperty property={{propId, propName}} rerender={rerender}></EditProperty>
                </div>
            </div>

        </>
    )
}
