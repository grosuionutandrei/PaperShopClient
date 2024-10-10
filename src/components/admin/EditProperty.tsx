import {PaperProperties} from "../../Api.ts";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {RERENDER_PROPERTY_EDIT} from "../../atoms/OpenPropertiesModal.tsx";
import {http} from "../../http.ts";
import {AxiosResponse} from "axios";
interface Render {
    rerender: boolean
    property: PaperProperties
}

export const EditProperty = ({property, rerender}: Render) => {
    const [propertyToEdit, setPropertyToEdit] = useState<string>(property.propName!);
    const [, setRerender] = useAtom(RERENDER_PROPERTY_EDIT);
    useEffect(() => {
        if (rerender) {
            setPropertyToEdit(property.propName!);
            setRerender(false);
        }
    }, [rerender]);



    //ToDo
    const saveEditOperation = ()=> {
        if (propertyToEdit === "") {
            return;
        }
        //     const edited:PaperProperties = {propId:property.propId,propName:propertyToEdit}
        //    http.api.adminEditPaperProprietyPartialUpdate(edited).then((result:AxiosResponse<PaperProperties>)=>{
        //
        //    })
        // }
    }
    return (
        <div
            className={"flex h-32 items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"}>
            <input className={"peer invalid:border-red-500"} type="text" required={true} value={propertyToEdit}
                   onChange={(e) => setPropertyToEdit(e.target.value)}></input>
            <span className={"hidden text-red-500 peer-invalid:block peer-focus:hidden"}></span>
            <button onClick={() => setRerender(false)} className={"btn btn-secondary"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-floppy" viewBox="0 0 16 16">
                    <path d="M11 2H9v3h2z"/>
                    <path
                        d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                </svg>
            </button>
        </div>
    )

}