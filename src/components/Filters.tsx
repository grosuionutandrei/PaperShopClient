import React, {useEffect, useState} from "react";
import {OrderEntryPlacedDto, PaperProperties, PriceRange} from "../Api.ts";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {toast} from "react-hot-toast";


export const Filters = () => {
    const [properties, setProperties] = useState<PaperProperties[]>([]);
    const [priceRange,setPriceRange] = useState<PriceRange>({min:0,max:100});
    const [priceRangeValue,setPriceRangeValue] = useState<number>(0);

    const getProperties = () => {
        http.api.papersProprietiesList().then((result: AxiosResponse<PaperProperties[]>) => {
            setProperties(result.data);
        }).catch(error => {
            toast.error(error);
        });
    }

    useEffect(() => {
        getProperties();
    }, []);


    const handleRangeChange=(value:string)=>{
        const tempRangeValue:number = parseInt(value);
        setPriceRangeValue(tempRangeValue);
    }

    return (
        <>
            < h2 className="text-xl font-semibold mb-4"> Filters </h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Property</h3>
                    <ul className="form-control">
                        {properties.map(p => {
                            return (
                                <li key={p.propName}>
                                    <label className="cursor-pointer label justify-start">
                                        <input type="checkbox" className="checkbox checkbox-primary mr-5"/>
                                        <span className="label-text">{p.propName}</span>
                                    </label>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Price Range</h3>
                    <div className={"flex justify-between"}>
                        <span className={"font-semibold"}>{priceRange.min}</span>
                        <span className={"font-semibold"}>{priceRange.max}</span>
                    </div>
                    <input type="range" min="0" max="100" value={priceRangeValue} onChange={(e)=>handleRangeChange(e.target.value)} className="range range-primary"/>
                </div>
                <div>
                    <h3 className="font-semibold">Sort by</h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Sort Options</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>
            </div>
        </>
    )
}
