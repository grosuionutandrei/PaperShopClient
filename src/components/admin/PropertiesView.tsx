import React, {useEffect, useState} from 'react';
import {PaperProperties} from "../../Api.ts";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {PropertyView} from "./PropertyView.tsx";
import {EditProperty} from "./EditProperty.tsx";
import {useAtom} from "jotai";
import {RETRIEVE_PROPERTIES} from "../../atoms/EditPropertyAtom.tsx";
import {DeleteProperty} from "./DeleteProperty.tsx";
import {CreateProperty} from "./CreateProperty.tsx";


export const ItemList = () => {
    const [properties, setProperties] = useState<PaperProperties[]>([]);
    const [propToEdit,setPropToEdit] = useState<PaperProperties>({});
    const[renderProperties,setRenderProperties] = useAtom(RETRIEVE_PROPERTIES);

    useEffect(() => {
        if(renderProperties){
            getProperties();
        }
    },[renderProperties,properties]);


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
            <DeleteProperty property={propToEdit}></DeleteProperty>
            <CreateProperty></CreateProperty>
        </main>
    );
};

export default ItemList;
