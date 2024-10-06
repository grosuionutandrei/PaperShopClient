import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {ProductsAtom} from "../../atoms/ProductsAtom.tsx";
import {http} from "../../http.ts";
import {useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {ITEMS_PER_PAGE} from "../../atoms/ItemsPerPage.tsx";
import {ProductDisplayCard} from "./ProductDisplayCard.tsx";
import {ProductDisplayCardPlaceholder} from "./ProductDisplayCardPlaceholder.tsx";



export const ProductsDisplay = ()=>{
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
               productData.map((product) => (
                   <ProductDisplayCard key={product.id} product={product} />
               ))
           )}

       </>
   </>
    )

}