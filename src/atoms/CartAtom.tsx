import {atom} from "jotai";
import {OrderEntryPlacedDto} from "../Api.ts";
import {CartProduct} from "../Models/CartProduct.tsx";

export const  CartAtom  =  atom<CartProduct[]>([])