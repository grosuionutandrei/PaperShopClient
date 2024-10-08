
import {Cart} from "./Cart/Cart.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../Routes/Routes.tsx";
export default function Navigation() {
    const navigate =  useNavigate();
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <button className="btn btn-ghost text-xl" onClick={()=>navigate(ROUTES.CustomerHome)}>Paper Life</button>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
          <Cart></Cart>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="bg-neutral text-neutral-content w-24 rounded-full">
                            <span className="text-3xl">C</span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li onClick={()=>navigate(`${ROUTES.History}/1/orders`)}><a>History</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}