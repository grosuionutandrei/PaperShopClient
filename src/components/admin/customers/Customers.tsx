import {useEffect, useState} from "react";
import {CustomerMain} from "../../../Api.ts";
import {http} from "../../../http.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {CustomerView} from "./Customer.tsx";

export const Customers = () => {
    const [customers, setCustomers] = useState<CustomerMain[]>([]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        http.api.adminCustomersList().then((response: AxiosResponse<CustomerMain[]>) => {
            if (response.status === 200) {
                setCustomers(response.data);
            }
        }).catch(e => {
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(`Error: ${e.response.data.message}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
        })
    }

    return (
        <div className="flex flex-col w-1/2 h-screen  mx-auto lex-grow overflow-y-auto">
            <h1>Customers</h1>
            {customers.length > 0 && customers.map((e,index) => {
                return (
                    <CustomerView key={e.customerId} customer={e} index={index}></CustomerView>
                )
            })}
        </div>
    )


}