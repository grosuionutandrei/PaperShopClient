import {atom} from "jotai";
import {Users} from "../Models/Users.tsx";

const getLoggedUser = (): Users => {
    const loggedUser = localStorage.getItem('loggedUser');
    return loggedUser === Users.admin ? Users.admin : Users.customer;
};

export const UserTypeAtom = atom<Users>(getLoggedUser());