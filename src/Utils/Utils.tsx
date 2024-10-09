import {PaperProperties} from "../Api.ts";

export const formatDateAndTime = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const transformPaperPropertiesToString = (properties: PaperProperties[]) => {
    const orderProperties: string = properties.reduce((acc, cur) => acc + `${cur.propName} `, "");
    return orderProperties === "" ? "N.A" : orderProperties;
}
