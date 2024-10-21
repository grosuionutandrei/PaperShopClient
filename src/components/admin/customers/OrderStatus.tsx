import {OrderStatusValues} from "../../../Models/OrderStatusValues.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {http} from "../../../http.ts"
import {Status, StatusUpdateResponse} from "../../../Api.ts";
import {AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface CurrentStatus {
    currentStatus: string;
    orderId: number
}

export const OrderStatus = ({currentStatus, orderId}: CurrentStatus) => {
    const [actualStatus, setCurrentStatus] = useState<OrderStatusValues>(OrderStatusValues[currentStatus as keyof typeof OrderStatusValues]);
    const [updateStatusValue, setUpdateStatusValue] = useState<string>("");
    const [renderModalWindow, setRenderModalWindow] = useState<boolean>(false);
    const [modalClass, setModalClass] = useState<string>("modal-close");
    const navigate = useNavigate();

    useEffect(() => {
        if (renderModalWindow) {
            setModalClass("modal-open");
        } else {
            setModalClass("modal-close");
        }
    }, [renderModalWindow, currentStatus]);


    const changeSelectedOption = (value: string) => {
        setRenderModalWindow(true);
        setUpdateStatusValue(value);
    }


    const closeModalWindow = () => {
        setRenderModalWindow(false);
    }

    const updateStatus = () => {
        const updatedstatus: Status = {status: updateStatusValue}
        http.customer.orderStatusUpdate(orderId, updatedstatus)
            .then((response: AxiosResponse<StatusUpdateResponse>) => {
                if (response.data.success) {
                    setCurrentStatus(updateStatusValue as OrderStatusValues);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                setRenderModalWindow(false);
            }).catch((error) => {
            if (error.response && error.response.status === 400) {
                const validationErrors = error.response.data.errors;
                if (validationErrors) {
                    for (const field in validationErrors) {
                        if (validationErrors.hasOwnProperty(field)) {
                            validationErrors[field].forEach((errorMessage) => {
                                toast.error(`${field}: ${errorMessage}`);
                            });
                        }
                    }
                } else {
                    toast.error(error.response.data.message)

                }
            } else {

                toast.error('An unexpected error occurred:', error.message);
            }
        })


    }

    return (
        <>
            <select value={actualStatus} onChange={(e) => {
                changeSelectedOption(e.target.value);
                e.stopPropagation();
            }}
                    onClick={(e) => e.stopPropagation()}>
                <option value={OrderStatusValues.Shipped}>{OrderStatusValues.Shipped}</option>
                <option value={OrderStatusValues.Cancelled}>{OrderStatusValues.Cancelled}</option>
                <option value={OrderStatusValues.Declined}>{OrderStatusValues.Declined}</option>
                <option value={OrderStatusValues.Pending}>{OrderStatusValues.Pending}</option>
                <option value={OrderStatusValues.Completed}>{OrderStatusValues.Completed}</option>
            </select>
            <dialog id="my_modal_1" className={`modal ${modalClass}`}>
                <div className="modal-box">
                    <p className="py-4">The status will be changed permanently!</p>
                    <p className="py-4">Do you want to continue?</p>
                    <div className="modal-action mt-2.5">
                        <form method="dialog">
                            <button className="btn border-blue-500 bg-blue-400 mr-2 "
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeModalWindow()
                                    }}>&#10006;</button>
                            <button className="btn border-emerald-500 bg-emerald-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateStatus()
                                    }}>&#10004;</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )

}