import {Filters} from "../Filters.tsx";
import {ProductsDisplay} from "./ProductsDisplay.tsx";
import React, {useState} from "react";


export const ProductsMainPage = () => {

    return (
        <div className="flex flex-grow container mx-auto py-8">

            <aside className="w-1/4 p-4 bg-gray-100">
                <Filters></Filters>
            </aside>
            <main className="w-3/4 p-4">
                <h1 className="text-2xl font-bold mb-6">Main Content</h1>
                <p className="mb-4">This is where the main content will go. Add whatever elements you need here.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductsDisplay></ProductsDisplay>
                </div>
            </main>

        </div>

    )

}