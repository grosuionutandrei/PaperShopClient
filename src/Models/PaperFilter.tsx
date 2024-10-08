

export interface PaperFilter{
    'pagination.PageNumber'?: number;
    /** @format int32 */
    'pagination.PageItems'?: number;
    /** @format double */
    'priceRange.minimumRange'?: number;
    /** @format double */
    'priceRange.maximumRange'?: number;
    paperPropertiesIds?: number[];
    searchFilter?: string;
}



