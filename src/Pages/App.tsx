import {Route, Routes} from "react-router-dom";
import React from "react";
import {Toaster} from "react-hot-toast";
import Navigation from "../components/Navigation.tsx";
import {useAtom} from "jotai";
import {Footer} from "../components/Footer.tsx";
import {ProductsMainPage} from "../components/ProductDisplay/ProductsMainPage.tsx";
import ShopHomePage from "./ShopHomePage.tsx";
import {PlaceOrderPage} from "./PlaceOrderPage.tsx";
import {ROUTES} from "../Routes/Routes.tsx";
import {OrderHistoryPage} from "./OrderHistory.tsx";
import {AdminHomePage} from "./AdminMainPage.tsx";
import {UserTypeAtom} from "../atoms/UserTypeAtom.tsx";
import {Users} from "../Models/Users.tsx";
import {CustomerPage} from "./CustomerPage.tsx";
import {AdminPage} from "./AdminPage.tsx";


const App = () => {
const [loggedUser] =  useAtom(UserTypeAtom);



    return (
        <>
            <Toaster position={"bottom-right"}></Toaster>
            <div className="min-h-screen flex flex-col">
                <Routes>
                    <Route path={""} element={<ShopHomePage/>}/>
                </Routes>
                {loggedUser===Users.customer&&(
                   <CustomerPage></CustomerPage>
                )}
                {loggedUser===Users.admin&&(
                    <AdminPage></AdminPage>
                )}
                <Footer></Footer>
            </div>
        </>
    )
}
export default App;