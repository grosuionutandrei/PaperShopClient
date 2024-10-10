import Navigation from "../components/Navigation.tsx";
import {Route, Routes} from "react-router-dom";
import {ProductsMainPage} from "../components/ProductDisplay/ProductsMainPage.tsx";
import {ROUTES} from "../Routes/Routes.tsx";
import {OrderHistoryPage} from "./OrderHistory.tsx";
import {PlaceOrderPage} from "./PlaceOrderPage.tsx";
import React from "react";

export const CustomerPage = ()=>{
 return (
     <>
     <nav className="">
         <Navigation></Navigation>
     </nav>
    <Routes>
        <Route path="/api/papers/:pageNumber" element={<ProductsMainPage/>}></Route>
        <Route path={`${ROUTES.History}/:customerId/orders`} element={<OrderHistoryPage/>}></Route>
        <Route path={ROUTES.Cart} element={<PlaceOrderPage/>}></Route>
    </Routes>
     </>
)


}