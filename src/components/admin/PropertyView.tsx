import React, {useState} from "react";
import {PaperProperties} from "../../Api.ts";
import {useAtom} from "jotai";
import {RERENDER_PROPERTY_EDIT} from "../../atoms/OpenPropertiesModal.tsx";
import {useNavigate} from "react-router-dom";


interface PaperPropertiesView {
    paperProps: PaperProperties
    index: number
    getPropToEdit: (propToEdit: PaperProperties) => void
}

export const PropertyView = ({paperProps, index, getPropToEdit}: PaperPropertiesView) => {
    const [, setRenderEditPropertiesModal] = useAtom(RERENDER_PROPERTY_EDIT);
    const navigate = useNavigate();

    const openEditModal = () => {
        setRenderEditPropertiesModal(true);
    }

    return (
        <>
            <div key={paperProps.propId} tabIndex={0} className={`collapse collapse-close`}>
                <div className="collapse-title text-xl font-medium">
                    <li

                        className={`h-32 collapse flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 
            ${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}`}
                    >
                        <div className="collapse-title text-xl font-medium">
                            <span className="text-blue-500 text-2xl mr-4">•</span>
                            <span className="text-lg text-gray-600">{paperProps.propName}</span>
                        </div>
                        <button
                            className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${index % 2 === 0 ? 'border-white' : 'border-blue-300'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                openEditModal();
                                getPropToEdit(paperProps);
                                navigate("/api/admin/properties/edit", {replace: true})
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
                </div>

            </div>

        </>
    )
}
