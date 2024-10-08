import {useEffect, useState} from "react";
import {OrderMain} from "../Api.ts";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {OrderHistoryItem} from "../components/Order/OrderHistoryItem.tsx";


export const OrderHistoryPage = ()=>{
  const [orders,setOrders] =  useState<OrderMain[]>([]);

    useEffect(() => {
        getOrderHistory();
    }, []);

  const getOrderHistory = ()=>{
      http.api.customerOrdersDetail(1).then((result:AxiosResponse<OrderMain[]>)=>{
          setOrders(result.data);
      }).catch((e)=>toast.error(e));
  }
    return (
      <>

          <div className="grid grid-cols-1 w-1/2 mx-auto lex-grow overflow-y-auto">
              <h1>Order History</h1>
          {orders.length>0 && orders.map(e=>{
              return(
                  <OrderHistoryItem key={e.id} orderItem={e}></OrderHistoryItem>
              )
          }) }
          </div>
      </>
  )


}