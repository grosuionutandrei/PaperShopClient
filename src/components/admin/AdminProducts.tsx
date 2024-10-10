import React, {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {ProductsAtom} from "../../atoms/ProductsAtom.tsx";
import {ITEMS_PER_PAGE} from "../../atoms/ItemsPerPage.tsx";
import {useParams} from "react-router-dom";
import {http} from "../../http.ts";
import {toast} from "react-hot-toast";
import {ProductDisplayCardPlaceholder} from "../ProductDisplay/ProductDisplayCardPlaceholder.tsx";
import {AdminProductDisplay} from "./AdminProductDisplay.tsx";
import {EditProduct} from "./EditProduct.tsx";
import {PaperToDisplay} from "../../Api.ts";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";

export const AdminProducts = () => {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [productData, setProductData] = useAtom(ProductsAtom);
    const [productToEdit, setProductToEdit] = useState<PaperToDisplay>({});
    const [pageItems] = useAtom(ITEMS_PER_PAGE);
    const {pageNumber} = useParams();
    const [refreshPage, setRefreshPage] = useAtom(REFRESH_CART);

    useEffect(() => {
        GetProducts();
        if (refreshPage) {
            setRefreshPage(false);
        }
    }, [pageNumber, refreshPage]);


    const GetProducts = () => {
        if (pageNumber) {
            const pageNum = parseInt(pageNumber, 10);
            const pageQuery = {
                PageNumber: pageNum,
                PageItems: 20,
            };
            setLoading(true);
            http.api.papersDetail(pageNum, pageQuery)
                .then((result) => {
                    setProductData(result.data);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    toast.error("Failed to fetch products");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.error("Page number is undefined");
        }
    };

    const openModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    const getProductId = (productId: number) => {
        const product = productData.find((p) => p.id === productId) || {};
        setProductToEdit(product);
    }


    const drawPlaceHolder = (itemsNumber: number) => {
        const items: JSX.Element[] = []
        let counter = 0;
        while (counter < itemsNumber) {
            items.push(<ProductDisplayCardPlaceholder key={counter}/>);
            counter++;
        }
        return items;
    };

    return (
        <>
            {loading ? (
                drawPlaceHolder(pageItems)
            ) : (
                productData.map((product, index) => (
                    <AdminProductDisplay color={(index % 2 === 0 ? "bg-gray-100" : "")} key={product.id}
                                         product={product} openModal={openModal} getPaperId={getProductId}/>
                ))
            )}
            <EditProduct isOpen={editModalOpen} openModal={openModal} product={productToEdit}></EditProduct>
        </>

    )

}