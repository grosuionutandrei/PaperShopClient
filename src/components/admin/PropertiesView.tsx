import React, {useEffect, useState} from 'react';
import {PaperProperties} from "../../Api.ts";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {OPEN_PROPERTIES_MODAL} from "../../atoms/OpenPropertiesModal.tsx";
import {useAtom} from "jotai";
import {PropertyView} from "./PropertyView.tsx";
import {EditProperty} from "./EditProperty.tsx";


export const ItemList = () => {
    const [properties, setProperties] = useState<PaperProperties[]>([]);
    const [propToEdit,setPropToEdit] = useState<PaperProperties>({});


    useEffect(() => {
            getProperties();
    },[]);


    const getPropToEdit = (propToEdit:PaperProperties)=>{
        setPropToEdit(propToEdit);
    }


    const getProperties = () => {
        http.api.papersProprietiesList().then((result: AxiosResponse<PaperProperties[]>) => {
            setProperties(result.data);
        }).catch(error => {
            toast.error(error);
        });
    }




    return (
        // <dialog className={`modal ${openClass}`}>
        //     <div className="modal-box">
        //         <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        //             <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
        //                 Properties
        //             </h2>
        //             <ul className="space-y-4  h-96 overflow-y-auto">
        //                 {properties.map((item, index) => (
        //                     <PropertyView propId={item.propId} propName={item.propName}></PropertyView>
        //                 ))}
        //             </ul>
        //         </div>
        //
        //         <div className="modal-action">
        //             <form method="dialog">
        //                 {/* if there is a button in form, it will close the modal */}
        //                 <button className="btn" onClick={closeModal}>Close</button>
        //             </form>
        //         </div>
        //     </div>
        // </dialog>

        <main className="flex flex-col items-center h-3/4 p-4">
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                Properties
            </h2>
            <div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Alphabetical</button>
            </div>
            <div className="grid grid-cols-1 h-3/4 overflow-y-auto ">
                <div className="mx-auto p-6 h-3/4 bg-gray-100 rounded-lg shadow-lg overflow-y-auto">
                    <ul className="space-y-4 h3/4 overflow-y-auto">
                        {properties.map((item, index) => (
                            <PropertyView paperProps={item} index={index} getPropToEdit={getPropToEdit}></PropertyView>
                        ))}
                    </ul>
                </div>
            </div>
            <EditProperty property={propToEdit}></EditProperty>
        </main>
    );
};

export default ItemList;
