import {atom, useAtom} from "jotai";

export  const OPEN_PROPERTIES_MODAL = atom<boolean>(false);
export  const RERENDER_PROPERTY_EDIT =  atom<boolean>(false);
export const RENDER_PROPERTY_DELETE = atom<boolean>(false);
export const RENDEr_PROPERTY_CREATE =  atom<boolean>(false);