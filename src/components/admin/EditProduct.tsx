import React, {useEffect, useState} from "react";
import {PaperToDisplay} from "../../Api.ts";
import {useAtom} from "jotai/index";
import {OpenModal} from "../ProductDisplay/ProductDetails.tsx";
import {Availability} from "../../Models/Availability.tsx";
import {toast} from "react-hot-toast";
import {PaperProperties} from "../../Api.ts";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {PAPER_PROPERTIES} from "../../atoms/PaperProperties.tsx";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";


export enum EditCommand {
    EditDiscontinued, EditName, EditStock, EditPrice
}

export const EditProduct = ({isOpen, openModal, product}: OpenModal) => {
    const [getAllProps] = useAtom(PAPER_PROPERTIES);
    const [propertiesToAdd, setPropertiesToAdd] = useState<PaperProperties[]>([]);
    const [openClass, setOpenClass] = useState<string>("");
    const [productToEdit, setProductToEdit] = useState<PaperToDisplay>({...product})
    const [availability, setAvailability] = useState<string>(product.discontinued ? Availability.DISCONTINUED : Availability.AVAILABLE);
    const [productProperties, setProperties] = useState<PaperProperties[]>([]);
    const [refreshPage, setRefreshPage] = useAtom(REFRESH_CART);

    useEffect(() => {
        if (isOpen) {
            setOpenClass("modal-open");
            setProductToEdit({...product})
            getPaperProperties(product.id!);
            // const difference = getAllProps.filter(item => !productProperties.includes(item));
            // setPropertiesToAdd(difference);
        } else {
            setOpenClass("");
        }
    }, [isOpen]);


    const getPaperProperties = (productId: number) => {
        http.api.papersDetailsDetail(productId)
            .then((result: AxiosResponse<PaperProperties[]>) => {
                setProperties(result.data);
                const existingPropertyIds = new Set(result.data.map(item => item.propId));
                const difference = getAllProps.filter(item => !existingPropertyIds.has(item.propId));
                setPropertiesToAdd(difference);
            })
            .catch((e) => {
                toast.error(e.message || 'An error occurred');
            });
    };

    const closeWindow = () => {
        setOpenClass("");
        openModal();
    }

    const disabled = () => {
        return product.stock == 0;
    }

    const editProduct = (command: EditCommand, stringInput: string) => {
        switch (command) {
            case EditCommand.EditDiscontinued: {
                computeAvailability(stringInput);
                break;
            }
            case EditCommand.EditName: {
                editName(stringInput);
                break;
            }
            case EditCommand.EditPrice: {
                editPrice(stringInput);
                break;
            }
            case EditCommand.EditStock: {
                editStock(stringInput);
                break
            }
        }
    }

    const computeAvailability = (value: string) => {
        const isAvailable = value === Availability.AVAILABLE;
        setAvailability(value);
        setProductToEdit({...productToEdit, discontinued: isAvailable})
    }

    const editName = (nameInput: string) => {
        setProductToEdit({...productToEdit, name: nameInput})
    }

    const editPrice = (value: string) => {
        const parsedValue = Number(value);  // Convert string to number
        if (isNaN(parsedValue)) {
            setProductToEdit({...productToEdit, price: 0})
        } else {
            setProductToEdit({...productToEdit, price: parsedValue})
        }
    }

    const editStock = (value: string) => {
        const parsedValue = Number(value);  // Convert string to number
        if (isNaN(parsedValue)) {
            setProductToEdit({...productToEdit, stock: 0})
        } else {
            setProductToEdit({...productToEdit, stock: parsedValue})
        }
    };

    const removePropertyFromPaper = (propertyId: number, paperId: number) => {
        http.api.papersEditRemovepropertiesPartialUpdate(paperId, propertyId)
            .then((result: AxiosResponse<boolean>) => {
                const success = result.data;
                if (success) {
                    const removedProperty = productProperties.find(e => e.propId == propertyId);
                    setProperties(productProperties.filter(e => e.propId != propertyId));
                    setPropertiesToAdd([...propertiesToAdd, removedProperty!]);
                    toast.success("Removed property with success");
                } else {
                    toast.error("Remove property failed")
                }
            }).catch(error => toast.error(error));
    }

    const addProperty = (propertyId: number, paperId: number) => {
        http.api.papersEditPropertiesPartialUpdate(paperId, propertyId)
            .then((result: AxiosResponse<boolean>) => {
                const success = result.data;
                if (success) {
                    setPropertiesToAdd(propertiesToAdd.filter(p => p.propId != propertyId));
                    const propertyAdded = propertiesToAdd.find(p => p.propId == propertyId);
                    setProperties([...productProperties, propertyAdded!]);
                    toast.success("Property added with success")
                } else {
                    toast.error("Adding property failed")
                }
            })
            .catch(e => toast.error(e))
    }
    const performEdit = () => {
        console.log(productToEdit);

        if (!areFieldsValid()) {
            return;
        }
        if (!areChangesMade()) {
            openModal();
            toast.success("Edit operation succeeded");
            return;
        }
        http.api.papersEditUpdate(product.id!.toString(), productToEdit)
            .then((response: AxiosResponse<PaperToDisplay>) => {
                if (response.status === 200) {
                    openModal();
                    toast.success("Edit operation succeeded");
                    setRefreshPage(true);
                } else {
                    toast.error("Failed to perform edit operation");
                }
            })
            .catch((e: any) => {
                if (e.response) {
                    const serverErrorMessage = e.response.data.message || e.response.data.error || "An error occurred";
                    toast.error(`Error: ${serverErrorMessage}`);
                } else {
                    toast.error(`Error: ${e.message}`);
                }
            });
    };

    const areChangesMade = () => {
        const areEqual = product.name === productToEdit.name &&
            product.discontinued === productToEdit.discontinued &&
            product.stock === productToEdit.stock &&
            product.price === productToEdit.price;
        return !areEqual;
    };

    const areFieldsValid = () => {
        return productToEdit.name !== "";
    }


    return (
        <dialog className={`modal ${openClass}`}>
            <div className="modal-box w-11/12 max-w-xl">
                {/*<div className={"flex justify-end"}>*/}
                {/*    <DeletePaper paperId={product.id!} openModal={openModal}></DeletePaper>*/}
                {/*</div>*/}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">PaperName</span>
                    </div>
                    <input value={productToEdit.name!} type="text"
                           onChange={(e) => editProduct(EditCommand.EditName, e.target.value)}
                           required={true}
                           className="peer input input-bordered w-full max-w-xs"/>
                    <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}>
                        Name field can not be empty!
                    </span>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Availability</span>
                    </div>
                    <select
                        value={availability}
                        className="select select-bordered"
                        onChange={(e) => editProduct(EditCommand.EditDiscontinued, e.target.value)}
                    >
                        <option value={Availability.AVAILABLE}>{Availability.AVAILABLE}</option>
                        <option value={Availability.DISCONTINUED}>{Availability.DISCONTINUED}</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Price</span>
                    </div>
                    <input value={productToEdit.price!} type="text"
                           onChange={(e) => editProduct(EditCommand.EditPrice, e.target.value)}
                           pattern="^\d*\.?\d*$"
                           min={0}
                           max={5000}
                           required={true}
                           className="peer input input-bordered w-full max-w-xs"/>
                    <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}>
                        Price field can not be empty, and a number!
                    </span>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Stock</span>
                    </div>
                    <input value={productToEdit.stock!} type="text"
                           onChange={(e) => editProduct(EditCommand.EditStock, e.target.value)}
                           pattern="^\d*\.?\d*$"
                           required={true}
                           className="peer input input-bordered w-full max-w-xs"/>
                    <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}>
                        Stock field can not be empty,please insert a value equal or bigger than 0 !
                    </span>
                </label>
                <div className={"mt-1 w-1/2 flex flex-row justify-start items-center flex-wrap"}>

                    {productProperties.map((p) =>
                        (<button key={p.propId}
                                 className="w1/4 btn btn-outline flex flex-row justify-start items-center"
                                 onClick={() => {
                                     removePropertyFromPaper(p.propId!, productToEdit.id!)
                                 }}
                        >
                            <p>{p.propName}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>)
                    )}
                </div>
                <div className="w-full my-2 border-t border-gray-300"></div>
                <div className={"mt-1 w-1/2 flex flex-row justify-start items-center flex-wrap "}>

                    {propertiesToAdd.map((p) =>
                        (<button key={p.propId}
                                 className="w1/4 btn btn-outline flex flex-row justify-start items-center"
                                 onClick={() => {
                                     addProperty(p.propId!, productToEdit.id!)
                                 }}
                        >
                            <p>{p.propName}</p>
                            &#10010;
                        </button>)
                    )}
                </div>
                <div className="modal-action">

                    <form method="dialog">
                        <button className="btn" onClick={() => closeWindow()}>Exit</button>
                        <button className="btn" disabled={disabled()} onClick={() => performEdit()}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}