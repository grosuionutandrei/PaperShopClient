import {Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Navigation from "../components/Navigation.tsx";
import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import {Footer} from "../components/Footer.tsx";
import {ProductsMainPage} from "../components/ProductDisplay/ProductsMainPage.tsx";
import ShopHomePage from "./ShopHomePage.tsx";
import {PlaceOrderPage} from "./PlaceOrderPage.tsx";
import {ROUTES} from "../Routes/Routes.tsx";
import {OrderHistoryPage} from "./OrderHistory.tsx";


const App = () => {
    const location = useLocation();
    const [theme, setTheme] = useAtom(ThemeAtom);
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <>
            <Toaster position={"bottom-right"}></Toaster>
            <div className="min-h-screen flex flex-col">
                <nav className="">
                    <Navigation></Navigation>
                </nav>
                <Routes>
                    <Route path={""} element={<ShopHomePage/>}/>
                    <Route path={"/api/papers/:pageNumber"} element={<ProductsMainPage/>}></Route>
                    <Route path={`${ROUTES.History}/:customerId/orders`} element={<OrderHistoryPage/>}></Route>
                    <Route path={ROUTES.Cart} element={<PlaceOrderPage/>}></Route>
                </Routes>
                <Footer></Footer>
            </div>
        </>
    )
}
export default App;