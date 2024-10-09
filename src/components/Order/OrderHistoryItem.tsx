import {OrderEntryQto, OrderMain, PaperProperties} from "../../Api.ts";
import {formatDate} from "../../Utils/Utils.tsx";
import {useState} from "react";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import  {transformPaperPropertiesToString} from "../../Utils/Utils.tsx"

export interface OrderItem {
    orderItem: OrderMain
}

export const OrderHistoryItem = ({orderItem}: OrderItem) => {
    const [windowControl, setWindowControl] = useState("collapse-close");
    const [orderDetails, setOrderDetails] = useState<OrderEntryQto[]>([])
    const open = "collapse-open";
    const close = "collapse-close";
    const switchClasses = () => {
        if (windowControl === "collapse-close") {
            setWindowControl(open);
            return;
        }
        setWindowControl(close);
    }

    const getOrderProducts = () => {
        http.api.orderOrderentriesDetail(orderItem.id!).then((result: AxiosResponse<OrderEntryQto[]>) => {
            setOrderDetails(result.data);
        }).catch((e) => {
            toast.error(e)
        })
    }

    const computeColor = (index: number) => {
        return index % 2 === 0 ? "bg-blue-100 text-black-200" : ""
    }

    return (
        <div tabIndex={0} onClick={() => {
            switchClasses();
            getOrderProducts()
        }} className={`collapse ${windowControl} border-base-300 bg-base-200 border`}>
            <div className="collapse-title text-xl font-medium">
                <ul className="list-none  flex justify-around items-center gap-2 ">
                    <li className={"flex flex-col w-1/4 items-center"}><strong>Order Date:</strong>
                        <span>{formatDate(orderItem.orderDate) || 'N/A'}</span></li>
                    <li className={"flex flex-col w-1/4 items-center"}><strong>Delivery Date:</strong>
                        <span>{formatDate(orderItem.deliveryDate?.toString()) || 'N/A'}</span></li>
                    <li className={"flex flex-col w-1/4 items-center"}><strong>Status:</strong>
                        <span>{orderItem.status || 'N/A'}</span></li>
                    <li className={"flex flex-col w-1/4 items-center"}><strong>Total Amount:</strong>
                        <span>{orderItem.totalAmount?.toFixed(2) || 'N/A'}</span></li>
                </ul>
            </div>
            <div className="collapse-content ">
                {orderDetails.map((e, index) => {
                    return (
                        <ul key={e.id}
                            className={`list-none flex justify-around items-center gap-2 ${computeColor(index)}`}>
                            <li className={"flex flex-col w-1/4 items-center"}><strong>Product Name:</strong>
                                <span>{e.paperName || 'N/A'}</span></li>
                            <li className={"flex flex-col w-1/4 items-center"}><strong>Quantity:</strong>
                                <span>{e.orderQuantity || 'N/A'}</span></li>
                            <li className={"flex flex-col w-1/4 items-center"}><strong>Price/stk:</strong>
                                <span>{e.price || 'N/A'}</span></li>
                            <li className={"flex flex-col w-1/4 items-center"}><strong>Properties:</strong>
                                <span>{transformPaperPropertiesToString(e.paperProperties!)}</span></li>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}