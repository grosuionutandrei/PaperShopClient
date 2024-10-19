import {formatDate} from "../../../Utils/Utils.tsx";
import {CustomerMain} from "../../../Api.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


interface Customer {
    customer: CustomerMain
    index:number
}

export const CustomerView = ({customer,index}: Customer) => {
    const [customerDisplayed, setCustomer] = useState<CustomerMain>({});
    const navigate = useNavigate();
    useEffect(() => {
        setCustomer(customer);
    }, [customer]);

    return (
        <div className={`collapse-title text-xl font-medium ${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'} `}>
            <ul className="list-none  flex justify-around items-center gap-2 ">
                <li className={"flex flex-col w-1/4 items-center"}><strong>Name:</strong>
                    <span>{formatDate(customerDisplayed.name!) || 'N/A'}</span></li>
                <li className={"flex flex-col w-1/4 items-center"}><strong>Address:</strong>
                    <span>{customerDisplayed.address! || 'N/A'}</span></li>
                <li className={"flex flex-col w-1/4 items-center"}><strong>Phone Number</strong>
                    <span>{customerDisplayed.phoneNumber || 'N/A'}</span></li>
                <li className={"flex flex-col w-1/4 items-center"}><strong>Email:</strong>
                    <span>{customerDisplayed.email || 'N/A'}</span></li>
                <div className="dropdown dropdown-end ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="bg-neutral text-neutral-content w-24 rounded-full">
                            <strong className="text-3xl ">...</strong>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a onClick={() => {
                            navigate(`/api/admin/customers/${customerDisplayed.customerId}/history`);
                            // setRenderDeleteModal(true);
                        }}>Orders</a></li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}