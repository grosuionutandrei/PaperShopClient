import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {RENDER_PROPERTY_DELETE} from "../../atoms/OpenPropertiesModal.tsx";

export const EditPropertyOptions = ()=>{
 const [,setRenderDeleteModal] =  useAtom(RENDER_PROPERTY_DELETE);
    const navigate =  useNavigate();
    return (
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
                     navigate("/api/admin/properties/edit/delete" , {replace:true});
                    setRenderDeleteModal(true);
                }}>Delete</a></li>
            </ul>
        </div>
    )

}