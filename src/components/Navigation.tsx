import {Cart} from "./Cart/Cart.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../Routes/Routes.tsx";
import {UserTypeAtom} from "../atoms/UserTypeAtom.tsx";
import {useAtom} from "jotai";
import {Users} from "../Models/Users.tsx";

export default function Navigation() {
    const navigate =  useNavigate();
    const [loggedUser] = useAtom(UserTypeAtom);

    const switchRoutes = ()=>{
      let route ;
        switch(loggedUser){
            case Users.admin:{
                route=`${ROUTES.Admin}/0`
            break;
            }
            case Users.customer:{
                route=`${ROUTES.CustomerHome}`
                break;
            }
            default:{
                break;
            }
        }
        return route;
    }

    return (
        <div className="navbar bg-base-200 gap-2">
            <div className="flex-1">
                <button className="btn btn-ghost text-xl" onClick={()=>navigate(switchRoutes())}>Paper Life</button>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search"/>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"/>
                        </svg>
                </label>
            </div>
            {loggedUser===Users.customer&& (
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
                            <li onClick={() => navigate(`${ROUTES.History}/1/orders`)}><a>History</a></li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
}