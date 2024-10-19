import {useEffect, useState} from "react";
import {OrderMain} from "../../../Api.ts";
import {OrderHistoryItem} from "../../Order/OrderHistoryItem.tsx";
import {useParams} from "react-router-dom";



export const CustomerOrderHistory = () => {
    const [orders, setOrders] = useState<OrderMain[]>([]);
    const {customerId} =  useParams()
    useEffect(() => {

    }, []);



    return (
        <>
            {
                orders.map((order) =>
                    <OrderHistoryItem key={order.id} orderItem={order}></OrderHistoryItem>
                )
            }
        </>
    )
}