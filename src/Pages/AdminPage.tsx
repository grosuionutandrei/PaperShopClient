import {ROUTES} from "../Routes/Routes.tsx";
import {AdminHomePage} from "./AdminMainPage.tsx";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Navigation from "../components/Navigation.tsx";

export const  AdminPage = ()=>{

    return (
        <>
            <nav className="">
                <Navigation></Navigation>
            </nav>
            <Routes>
                <Route path={`${ROUTES.Admin}/:pageNumber`} element={<AdminHomePage/>}></Route>
            </Routes>
        </>
    )

}