import {OrderMain} from "../../Api.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/Routes.tsx";
import {formatDate} from "../../Utils/Utils.tsx";


export interface DialogProps {
    setOpen: (val: boolean) => void;
    orderData: OrderMain;
    isOpen: boolean;
    resetCart:()=>void
}

export const OrderPlacedResponse = ({setOpen, orderData, isOpen,resetCart}: DialogProps) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState("");

    useEffect(() => {
        setOpenModal(isOpen ? "modal-open" : "");
    }, [isOpen]);

    const closeWindow = () => {
        setOpen(false);
        navigate(ROUTES.CustomerHome);
    }

    return (
        <dialog className={`modal ${openModal}`}>

            <div className="modal-box w-11/12 max-w-xl">
                <h2 className="text-lg font-bold mb-4">Order Details</h2>
                <ul className="list-none space-y-2">
                    <li><strong>Order Date:</strong> {formatDate(orderData.orderDate) || 'N/A'}</li>
                    <li><strong>Delivery Date:</strong> {formatDate(orderData.deliveryDate?.toString()) || 'N/A'}</li>
                    <li><strong>Status:</strong> {orderData.status || 'N/A'}</li>
                    <li><strong>Total Amount:</strong> ${orderData.totalAmount?.toFixed(2) || 'N/A'}</li>
                </ul>
                <div className="modal-action mt-4">
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                            onClick={()=>{closeWindow();resetCart();}}>&#9747;</button>
                </div>
            </div>
        </dialog>
    )

}