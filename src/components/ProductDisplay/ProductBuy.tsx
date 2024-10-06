import {useState} from "react";

export interface ProductPieces {
    availablePieces: number
    // price:number
    // updateStock:()=>void
}

export const ProductBuy = ({availablePieces}: ProductPieces) => {
    const [pieces, setPieces] = useState("0");
    const [invalidInput, setInvalidInput] = useState("");

    const increasePieces = () => {
        let tempPieces;
        try {
            tempPieces = parseInt(pieces);
        } catch (error) {
            setInvalidInput("border-red-500 text-red-500");
            return;
        }

        let tempNumber = tempPieces + 1;

        if (tempNumber > availablePieces + 1) {
            return;
        }

        if (tempNumber > availablePieces) {
            setInvalidInput("border-red-500 text-red-500");
            setPieces(tempNumber.toString());
            return;
        }
        setPieces(tempNumber.toString());
        setInvalidInput("");
    };

    const decreasePieces = () => {
        let tempPieces;
        try {
            tempPieces = parseInt(pieces)
        } catch (error) {
            setInvalidInput("border-red-500 text-red-500")
            return;
        }
        let tempNumber = tempPieces - 1;
        if (tempNumber < -1) {
            return;
        }

        if (tempNumber < 0) {
            setInvalidInput("border-red-500 text-red-500");
            setPieces(tempNumber.toString());
            return;
        }

        setPieces(tempNumber.toString());
        setInvalidInput("");

    }

    const getInput = (value: string) => {
        let temp = value;
        setPieces(temp);
    }



    return (
        <div>
            <button className={"btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mr-2"} onClick={() => {
                decreasePieces()
            }}>&#9866;</button>
            <input type="text" pattern="^\d*$" value={pieces} onChange={(e) => getInput(e.target.value)}
                   className={`peer focus:invalid:focus:invalid:border-red-500 w-12 text-left ${invalidInput} `}></input>
            <button className={"btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ml-2"}
                    onClick={() => increasePieces()}>&#10010;</button>
            <span className={"hidden text-red-500 peer-focus:peer-invalid:block "}>Please enter only digits not lower than 0 and not bigger than the available stock</span>
        <div className={"flex flex-row items-start"}>
            <h3>Current item price <span>{}</span> </h3>
        </div>
        </div>
    )
}