import {useState} from "react";
import {UpdateQuantity} from "../CartProducts/ProductCartDisplay.tsx";

export interface ProductPieces {
    availablePieces: number
    items: number
    updateQuantity: (action: UpdateQuantity) => void;
}

export const ProductBuy = ({availablePieces, items, updateQuantity}: ProductPieces) => {
    const [pieces, setPieces] = useState(items);
    const [invalidInput, setInvalidInput] = useState("");

    const increasePieces = () => {
        let tempNumber = pieces + 1;
        if (tempNumber > availablePieces) {
            return;
        }
        if (tempNumber === availablePieces) {
            setInvalidInput("border-red-500 text-red-500");
            setPieces(tempNumber);
            updateQuantity(UpdateQuantity.up)
            return;
        }
        updateQuantity(UpdateQuantity.up)
        setPieces(tempNumber);
        setInvalidInput("");
    };

    const decreasePieces = () => {
        let tempNumber = pieces - 1;
          if(tempNumber<0){
              return;
          }

        if (tempNumber === 0) {
            setInvalidInput("border-red-500 text-red-500");
            setPieces(tempNumber);
            updateQuantity(UpdateQuantity.down)
            return;
        }
        updateQuantity(UpdateQuantity.down)
        setPieces(tempNumber);
        setInvalidInput("");

    }

    const getInput = (value: number) => {
        setPieces(value);
    }


    return (
        <div>
            <button className={"btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mr-2"} onClick={() => {
                decreasePieces()
            }}>&#9866;</button>
            <input type="text" readOnly pattern="^\d*$" value={pieces}
                   onChange={(e) => getInput(Number(e.target.value))}
                   className={`peer focus:invalid:focus:invalid:border-red-500 w-12 text-left ${invalidInput} `}></input>
            <button className={"btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ml-2"}
                    onClick={() => increasePieces()}>&#10010;</button>
            <span className={"hidden text-red-500 peer-focus:peer-invalid:block "}>Please enter only digits not lower than 0 and not bigger than the available stock</span>
            <div className={"flex flex-row items-start"}>
                <h3>Current item price <span>{}</span></h3>
            </div>
        </div>
    )
}