import {atom} from "jotai";
import {FilterRules} from "../Models/FilterRules.tsx";

export const ACTIVE_FILTER = atom<FilterRules>({priceRange:{},properties:[]});