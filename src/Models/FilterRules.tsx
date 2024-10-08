import {PaperProperties, PriceRange} from "../Api.ts";

export interface FilterRules{
    priceRange?:PriceRange;
    properties?:PaperProperties[]
}