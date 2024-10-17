import {ROUTES} from "../Routes/Routes.tsx";
import {AdminHomePage} from "./AdminMainPage.tsx";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Navigation from "../components/Navigation.tsx";
import {AdminProperties} from "./AdminProperties.tsx";

export const AdminPage = () => {

    return (
        <>
            <nav className="">
                <Navigation></Navigation>
            </nav>
            <Routes>
                <Route path={"papers/:pageNumber"} element={<AdminHomePage/>}></Route>
                <Route path={"properties"} element={<AdminProperties/>}></Route>
                <Route path={"properties/edit"} element={<AdminProperties/>}></Route>
                <Route path={"properties/edit/delete"} element={<AdminProperties/>}></Route>
            </Routes>
        </>
    )

}