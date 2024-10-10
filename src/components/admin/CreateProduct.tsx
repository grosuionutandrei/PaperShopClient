import {Availability} from "../../Models/Availability.tsx";
import React, {useEffect, useState} from "react";
import {PaperProperties, PaperToDisplay} from "../../Api.ts";
import {EditCommand} from "./EditProduct.tsx";
import {PAPER_PROPERTIES} from "../../atoms/PaperProperties.tsx";
import {useAtom} from "jotai";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {REFRESH_CART} from "../../atoms/AddToCart.tsx";


interface AddPaper {
    isOpen: boolean
    openModal: () => void
}

export const CreateProduct = ({isOpen, openModal}: AddPaper) => {
    const initialRequiredState = {
        price: false,
        name: false,
        stock: false,
        availability: false
    }
    const [availability, setAvailability] = useState<string>("");
    const [openClass, setOpenClass] = useState<string>("");
    const [, setRefreshPage] = useAtom(REFRESH_CART);
    const [productToCreate, setProductToCreate] = useState<PaperToDisplay>({
        name: "",
        discontinued: undefined,
        price: undefined,
        stock: undefined,
        paperPropertiesList: []
    });
    const [propertiesToAdd] = useAtom(PAPER_PROPERTIES);
    const [propertiesDisplayed, setPropertiesToDisplay] = useState<Set<PaperProperties>>(new Set(propertiesToAdd));

    //Track if the input is required or not, in order to display the error message
    const [isRequired, setIsRequired] = useState(initialRequiredState);
    const handleFocus = (field) => {
        setIsRequired({...isRequired, [field]: true});
    };


    useEffect(() => {
        if (isOpen) {
            setOpenClass("modal-open");
            setPropertiesToDisplay(new Set(propertiesToAdd));

            setProductToCreate({
                name: "",
                discontinued: undefined,
                price: undefined,
                stock: undefined,
                paperPropertiesList: []
            });
            setIsRequired(initialRequiredState);
            setAvailability("");
        } else {
            setOpenClass("");
        }
    }, [isOpen]);

    const closeWindow = () => {
        setOpenClass("");
        openModal();
    }

    const editProduct = (command: EditCommand, stringInput: string, product: PaperToDisplay) => {
        switch (command) {
            case EditCommand.EditDiscontinued: {
                computeAvailability(stringInput, product);
                break;
            }
            case EditCommand.EditName: {
                editName(stringInput, product);
                break;
            }
            case EditCommand.EditPrice: {
                editPrice(stringInput, product);
                break;
            }
            case EditCommand.EditStock: {
                editStock(stringInput, product);
                break
            }
        }
    }

    const computeAvailability = (value: string, product: PaperToDisplay) => {
        const isAvailable = value === Availability.AVAILABLE;
        setAvailability(value);
        setProductToCreate({...product, discontinued: isAvailable})
    }

    const editName = (nameInput: string, product: PaperToDisplay) => {
        setProductToCreate({...product, name: nameInput})
    }

    const editPrice = (value: string, product: PaperToDisplay) => {
        const parsedValue = Number(value);  // Convert string to number
        if (isNaN(parsedValue)) {
            setProductToCreate({...product, price: 0})
        } else {
            setProductToCreate({...product, price: parsedValue})
        }
    }

    const editStock = (value: string, product: PaperToDisplay) => {
        const parsedValue = Number(value);  // Convert string to number
        if (isNaN(parsedValue)) {
            setProductToCreate({...product, stock: 0})
        } else {
            setProductToCreate({...product, stock: parsedValue})
        }
    };

    const addProperty = (propertyId: number) => {
        const propertyAdded = propertiesToAdd.find(p => p.propId == propertyId);
        const tempSet = propertiesDisplayed;
        tempSet.delete(propertyAdded!);
        setPropertiesToDisplay(tempSet);
        const addedProperties: PaperProperties[] = [...productToCreate.paperPropertiesList!, propertyAdded!];
        setProductToCreate({...productToCreate, paperPropertiesList: addedProperties})
    }


    const removePropertyFromPaper = (propertyId: number) => {
        const removedProperty = productToCreate.paperPropertiesList!.find(e => e.propId == propertyId);
        const tempSet = propertiesDisplayed;
        tempSet.add(removedProperty!);
        setPropertiesToDisplay(tempSet);
        const propertiesRemoved = productToCreate.paperPropertiesList!.filter(p => p.propId != propertyId);
        setProductToCreate({...productToCreate, paperPropertiesList: propertiesRemoved})
        console.log(productToCreate.paperPropertiesList, "after the remove");
    }

    const saveCreateOperation = () => {
        if (areInputsInvalid()) {
            toast.error("invalid");
            return;
        }

        http.api.adminCreatePaperCreate(productToCreate)
            .then((result: AxiosResponse<PaperToDisplay>) => {
                if (result.status == 200) {
                    setRefreshPage(true);
                    openModal();
                    toast.success("Product created with success ");
                } else {
                    toast.error("Product registration failed")
                }
            }).catch((e: any) => {
            if (e.response) {
                const serverErrorMessage = e.response.data.message || e.response.data.error || "An error occurred";
                toast.error(`Error: ${serverErrorMessage}`);
            } else {
                toast.error(`Error: ${e.message}`);
            }
        });


    }

    const areInputsInvalid = () => {
        const invalid: string[] = [];

        if (!productToCreate.name) {
            invalid.push("name");
        }
        if (productToCreate.discontinued === undefined) {
            invalid.push("availability");
        }
        if (productToCreate.price == null || productToCreate.price <= 0) {
            invalid.push("price");
        }
        if (productToCreate.stock == null || productToCreate.stock <= 0) {
            invalid.push("stock");
        }

        if (invalid.length > 0) {
            const updatedRequiredState = { ...isRequired };

            invalid.forEach(prop => {
                updatedRequiredState[prop] = true;
            });

            setIsRequired(updatedRequiredState);
            return true;
        }

        return false;
    };


    return (
        <dialog className={`modal ${openClass}`}>
            <div className="modal-box w-11/12 max-w-xl gap-2 ">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">PaperName</span>
                    </div>
                    <input value={productToCreate.name!} type="text"
                           placeholder={"Type a name"}
                           onChange={(e) => editProduct(EditCommand.EditName, e.target.value, productToCreate)}
                           onFocus={() => handleFocus("name")}
                           required={isRequired.name}
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
                        className=" peer invalid:not[focus-within]:border-red-500  select select-bordered"
                        onChange={(e) => editProduct(EditCommand.EditDiscontinued, e.target.value, productToCreate)}
                        onFocus={() => handleFocus("availability")}
                        required={isRequired.availability}
                    >
                        <option value="" disabled>Select availability</option>
                        <option value={Availability.AVAILABLE}>{Availability.AVAILABLE}</option>
                        <option value={Availability.DISCONTINUED}>{Availability.DISCONTINUED}</option>
                    </select>
                    <span className={"hidden text-red-500 peer-invalid:block  peer-focus-within:hidden"}>Availability needs to be provided</span>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Price</span>
                    </div>
                    <input value={productToCreate.price !== undefined ? productToCreate.price : ""} type="text"
                           onChange={(e) => editProduct(EditCommand.EditPrice, e.target.value, productToCreate)}
                           pattern="^\d*\.?\d*$"
                           min={0}
                           max={5000}
                           onFocus={() => handleFocus("price")}
                           required={isRequired.price}
                           className="peer input input-bordered w-full max-w-xs"/>
                    <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}>
                        Price field can not be empty, please insert a value equal or bigger than 0 !
                    </span>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Stock</span>
                    </div>
                    <input value={productToCreate.stock !== undefined ? productToCreate.stock : ""} type="text"
                           onChange={(e) => editProduct(EditCommand.EditStock, e.target.value, productToCreate)}
                           pattern="^\d*\.?\d*$"
                           onFocus={() => handleFocus("stock")}
                           required={isRequired.stock}
                           className="peer input input-bordered w-full max-w-xs"/>
                    <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}>
                        Stock field can not be empty,please insert a value equal or bigger than 0 !
                    </span>
                </label>
                <div className={"mt-1 w-1/2 flex flex-row justify-start items-center flex-wrap"}>
                    {productToCreate.paperPropertiesList!.map((p) =>
                        (<button key={p.propId}
                                 className="w1/4 btn btn-outline flex flex-row justify-start items-center"
                                 onClick={() => {
                                     removePropertyFromPaper(p.propId!);
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

                    {Array.from(propertiesDisplayed).map((p) =>
                        (<button key={p.propId}
                                 className="w1/4 btn btn-outline flex flex-row justify-start items-center"
                                 onClick={() => {
                                     addProperty(p.propId!)
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
                        <button className="btn" onClick={() => saveCreateOperation()}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )

}