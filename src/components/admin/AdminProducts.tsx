import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {ProductsAtom} from "../../atoms/ProductsAtom.tsx";
import {ITEMS_PER_PAGE} from "../../atoms/ItemsPerPage.tsx";
import {useParams} from "react-router-dom";
import {http} from "../../http.ts";
import {toast} from "react-hot-toast";
import {ProductDisplayCardPlaceholder} from "../ProductDisplay/ProductDisplayCardPlaceholder.tsx";
import {ProductDisplayCard} from "../ProductDisplay/ProductDisplayCard.tsx";
import {AdminProductDisplay} from "./AdminProductDisplay.tsx";

export const AdminProducts  = ()=>{

    const [loading,setLoading] = useState<boolean>(false);
    const [productData,setProductData] = useAtom(ProductsAtom);
    const [pageItems] =  useAtom(ITEMS_PER_PAGE);
    const {pageNumber} =  useParams();

    const GetProducts = () => {
        if (pageNumber) {
            const pageNum = parseInt(pageNumber, 10);
            const pageQuery = {
                PageNumber: pageNum,
                PageItems: 20,
            };
            setLoading(true);
            http.api.papersDetail(pageNum,pageQuery)
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


    useEffect(() => {
        GetProducts();
    }, [pageNumber]);

    const drawPlaceHolder = (itemsNumber: number) => {
        const items:JSX.Element[] =[]
        let counter = 0;
        while (counter < itemsNumber) {
            items.push(<ProductDisplayCardPlaceholder key={counter} />);
            counter++;
        }
        return items;
    };

    return (
        <>
            <>
                {loading ? (
                    drawPlaceHolder(pageItems)
                ) : (
                    productData.map((product,index) => (
                        <AdminProductDisplay  color={(index%2===0?"bg-gray-100":"")} key={product.id} product={product} />
                    ))
                )}

            </>
        </>
    )

}