import {useEffect, useState} from "react";
import {OrderMain} from "../../../Api.ts";
import {OrderHistoryItem} from "../../Order/OrderHistoryItem.tsx";
import {useParams} from "react-router-dom";
import {http} from "../../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";


export const CustomerOrderHistory = () => {
    const [orders, setOrders] = useState<OrderMain[]>([]);
    const {customerId} = useParams()
    useEffect(() => {
        getCustomerOrderHistory();
    }, []);


    const getCustomerOrderHistory = () => {
        http.customer.historyDetail(customerId!.toString()).then((result: AxiosResponse<OrderMain[]>) => {
            if (result.status === 200) {
                setOrders(result.data);
            } else {
                toast.error("Loading orders failed please try again!")
            }
        }).catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(`Error: ${e.response.data.message}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
        })
    }


    return (
        <div className={"flex flex-col justify-center items-center flex-grow  h-full overflow-y-auto p-4"}>
            {orders.length===0?
                (
                    <ul>
                        <li>
                            <p>No orders for the customer </p>
                        </li>
                    </ul>
                ):orders.map((order) =>
                    <OrderHistoryItem key={order.id} orderItem={order}></OrderHistoryItem>
                )
            }
        </div>
    )
}