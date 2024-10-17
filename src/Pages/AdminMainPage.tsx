import {Filters} from "../components/Filters.tsx";
import React, {useState} from "react";
import {AdminProducts} from "../components/admin/AdminProducts.tsx";
import {CreateProduct} from "../components/admin/CreateProduct.tsx";
import {useAtom} from "jotai";
import {CREATE_MODAL} from "../atoms/OpenCretaModal.tsx";
import PropertiesView from "../components/admin/PropertiesView.tsx";

export const AdminHomePage = () => {
    const [openCreateModal, setOpenCreateModal] = useAtom(CREATE_MODAL);


    const handleCreateModal = () => {
        setOpenCreateModal(!openCreateModal);
    }

    return (
        <div className="flex flex-grow container mx-auto py-8 h-screen ">
            <aside className="w-1/4 p-4 bg-gray-100 h-3/4" >
                <Filters></Filters>
            </aside>
            <main className="w-3/4 h-3/4 p-4">
                <h1 className="text-2xl font-bold mb-6">Main Content</h1>
                <p className="mb-4">This is where the main content will go. Add whatever elements you need here.</p>
                <div className="grid grid-cols-1 h-full  overflow-y-auto">
                    <AdminProducts></AdminProducts>
                </div>
            </main>
            <CreateProduct isOpen={openCreateModal} openModal={handleCreateModal}></CreateProduct>
            {/*<PropertiesView></PropertiesView>*/}
        </div>

    )
}