import React, {useEffect, useState} from 'react';
import {PaperProperties} from "../../Api.ts";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {OPEN_PROPERTIES_MODAL} from "../../atoms/OpenPropertiesModal.tsx";
import {useAtom} from "jotai";
import {PropertyView} from "./PropertyView.tsx";

export const ItemList = () => {
    const [properties, setProperties] = useState<PaperProperties[]>([]);
    const [openModal, setOpenmodal] = useAtom(OPEN_PROPERTIES_MODAL);
    const [openClass, setOpenClass] = useState("");

    useEffect(() => {
        if (openModal) {
            getProperties();
            setOpenClass("modal-open");
        }
    }, [openModal]);


    const getProperties = () => {
        http.api.papersProprietiesList().then((result: AxiosResponse<PaperProperties[]>) => {
            setProperties(result.data);
        }).catch(error => {
            toast.error(error);
        });
    }

    const closeModal = () => {
        setOpenmodal(false);
        setOpenClass("");
    }


    return (
        <dialog className={`modal ${openClass}`}>
            <div className="modal-box">
                <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                        Properties
                    </h2>
                    <ul className="space-y-4  h-96 overflow-y-auto">
                        {properties.map((item, index) => (
                            <PropertyView propId={item.propId} propName={item.propName}></PropertyView>
                        ))}
                    </ul>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={closeModal}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ItemList;
