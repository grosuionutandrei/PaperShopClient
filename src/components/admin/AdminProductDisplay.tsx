import {PaperToDisplay} from "../../Api.ts";
import {formatDate} from "../../Utils/Utils.tsx";
import {Price} from "../ProductDisplay/ProductPrice.tsx";
import {Discontinued} from "./Discontinued.tsx";

export interface PaperProps {
    product: PaperToDisplay;
    color:string;
}


export const AdminProductDisplay = ({product,color}: PaperProps) => {

    return (
        <div tabIndex={0} className={`collapse border-base-300 bg-base-200 border ${color} mb-1`}>
            <div className="collapse-title text-xl font-medium">
                    <ul className="list-none  flex justify-around items-center gap-2  ">
                        <li className={"flex flex-col w-1/4 items-center"}><strong>Name</strong>
                            <span>{product.name || 'N/A'}</span></li>
                        <Discontinued discontinued={product.discontinued!}/>
                        <li className={"flex flex-col w-1/4 items-center"}><strong>Stock</strong>
                            <span>{product.stock || 'N/A'}</span></li>
                        <li className={"flex flex-col w-1/4 items-center"}><strong>Price</strong>
                            <Price price={product.price!}/></li>
                    </ul>
            </div>
            <div className="collapse-content">
                <p>tabindex={0} attribute is necessary to make the div focusable</p>
            </div>
        </div>
    )
}