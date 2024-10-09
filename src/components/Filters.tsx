import React, {useEffect, useState} from "react";
import {OrderEntryPlacedDto, PaperProperties, PaperToDisplay, PriceRange} from "../Api.ts";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {useAtom} from "jotai";
import {ACTIVE_FILTER} from "../atoms/ActiveFilterAtom.tsx";
import {PaperPaginationQuery} from "../Models/PaperPaginationQuery.tsx";
import {ITEMS_PER_PAGE, PAGE_NUMBER} from "../atoms/ItemsPerPage.tsx";
import {ProductsAtom} from "../atoms/ProductsAtom.tsx";
import {PAPER_PROPERTIES} from "../atoms/PaperProperties.tsx";




export const Filters = () => {
    const [properties, setProperties] = useAtom(PAPER_PROPERTIES);
    const [activeFilter,setActiveFilter] =  useAtom(ACTIVE_FILTER);
    const[pageNumber] = useAtom(PAGE_NUMBER);
    const [itemsPerPage] =  useAtom(ITEMS_PER_PAGE);
    const [priceRange,setPriceRange] = useState<PriceRange>({minimumRange:0,maximumRange:0});
    const [priceMaxValue,setPriceMaxValue] = useState<number>(priceRange.maximumRange||0);
    const [,setProducts] = useAtom(ProductsAtom);
    useEffect(() => {
        getProperties();
        getPriceRange();
    }, []);


    const getProperties = () => {
        http.api.papersProprietiesList().then((result: AxiosResponse<PaperProperties[]>) => {
            setProperties(result.data);
        }).catch(error => {
            toast.error(error);
        });
    }

    const getPriceRange =()=>{
        http.api.papersInitializationPriceRangeList().then((result:AxiosResponse<PriceRange>)=>{
            setPriceRange(result.data);
        }).catch(e=>toast.error(e));
    }

    //Todo modify this to accept pagination from the pagination component
    const applyFilter = ()=>{
        const paginationParam:PaperPaginationQuery = {
            PageNumber: pageNumber,
            PageItems:itemsPerPage
        }
        const paperPropertiesIdsParam: string = activeFilter.properties
            ?.map(p => p.propId)
            .filter((id): id is number => id !== undefined)
            .join(",") ?? "";
        const filterQuery: any = {
            "pagination.PageNumber": paginationParam.PageNumber,
            "pagination.PageItems": paginationParam.PageItems,
            'priceRange.minimumRange': priceRange.minimumRange!,
            'priceRange.maximumRange': priceMaxValue,
            paperPropertiesIds:paperPropertiesIdsParam,
            searchFilter: ""
        };

        http.api.papersFilterList(filterQuery)
            .then((result:AxiosResponse<PaperToDisplay[]>)=>{
                setProducts(result.data);
            }).catch((e)=>toast.error(e))
    }


    const handleRangeChange = (value: number) => {
        const tempRangeValue: number = value;
        setPriceMaxValue(tempRangeValue);
        var priceRangeCurrent: PriceRange = {
            minimumRange: priceRange.minimumRange,
            maximumRange: tempRangeValue
        };
        setActiveFilter({ ...activeFilter, priceRange: priceRangeCurrent });

    };

    const handlePropertyChange=(propName:string,selected:boolean,propId:number)=>{
        if(selected){
            var temp:PaperProperties = {propId:propId,propName:propName}
            var activeProps:PaperProperties[] = [...activeFilter.properties!,temp];
            setActiveFilter({...activeFilter,properties:activeProps});
       return;
        }
        var tempActiveFilter = activeFilter.properties?.filter(e=>e.propId!=propId);
        setActiveFilter({...activeFilter,properties:tempActiveFilter})

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
                                        <input type="checkbox"  onChange={(elem)=>handlePropertyChange(p.propName!,elem.target.checked,p.propId!)} className="checkbox checkbox-primary mr-5"/>
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
                        <span className={"font-semibold"}>{priceRange.minimumRange}</span>
                        <span className={"font-semibold"}>{priceRange.maximumRange}</span>
                    </div>
                    <input type="range" min={priceRange.minimumRange!} max={(priceRange.maximumRange!)+1}
                           value={priceMaxValue}
                            onChange={(e) => handleRangeChange(Number(e.target.value))}
                           className="range range-primary"/>
                </div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={()=>applyFilter()} >Apply</button>
            </div>
        </>
    )
}
