/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {CreateProductDto} from "../Api.ts";

export interface CreatePropertyDto {
  propertyName?: string | null;
}

export interface DateOnly {
  /** @format int32 */
  year?: number;
  /** @format int32 */
  month?: number;
  /** @format int32 */
  day?: number;
  dayOfWeek?: DayOfWeek;
  /** @format int32 */
  dayOfYear?: number;
  /** @format int32 */
  dayNumber?: number;
}

/** @format int32 */
export enum DayOfWeek {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface EditPaperDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
}

export interface EditPaperPropertyDto {
  /** @format int32 */
  propertyId?: number;
  propName?: string | null;
}

export type IdentificationDto = object;

export interface OrderEntryPlacedDto {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface OrderEntryQto {
  /** @format int32 */
  id?: number;
  paperName?: string | null;
  /** @format int32 */
  orderQuantity?: number;
  /** @format double */
  price?: number;
  paperProperties?: PaperProperties[] | null;
}

export interface OrderMain {
  /** @format int32 */
  id?: number | null;
  /** @format date-time */
  orderDate?: string;
  deliveryDate?: DateOnly;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
}

export interface OrderPlacedDto {
  /** @format int32 */
  customerId?: number;
  orderPlacedProducts?: OrderEntryPlacedDto[] | null;
}

export interface PaperProperties {
  /** @format int32 */
  propId?: number;
  propName?: string | null;
}

export interface PaperToDisplay {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  paperPropertiesList?: PaperProperties[] | null;
}

export interface PriceRange {
  /** @format double */
  minimumRange?: number | null;
  /** @format double */
  maximumRange?: number | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
      /**
       * No description
       *
       * @tags Order
       * @name CustomerOrdersDetail
       * @request GET:/api/customer/{customerId}/orders
       */
      customerOrdersDetail: (customerId: number, params: RequestParams = {}) =>
          this.request<OrderMain[], any>({
              path: `/api/customer/${customerId}/orders`,
              method: "GET",
              format: "json",
              ...params,
          }),

      /**
       * No description
       *
       * @tags Paper
       * @name PapersFilterList
       * @request GET:/api/papers/filter
       */
      papersFilterList: (
          query?: {
              /** @format int32 */
              'pagination.PageNumber'?: number;
              /** @format int32 */
              'pagination.PageItems'?: number;
              /** @format double */
              'priceRange.minimumRange'?: number;
              /** @format double */
              'priceRange.maximumRange'?: number;
              paperPropertiesIds?: string;
              searchFilter?: string;
          },
          params: RequestParams = {},
      ) =>
          this.request<PaperToDisplay[], any>({
              path: `/api/papers/filter`,
              method: "GET",
              query: query,
              format: "json",
              ...params,
          }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderOrderentriesDetail
     * @request GET:/api/order/{orderId}/orderentries
     */
    orderOrderentriesDetail: (orderId: number, params: RequestParams = {}) =>
      this.request<OrderEntryQto[], any>({
        path: `/api/order/${orderId}/orderentries`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderEditPartialUpdate
     * @request PATCH:/api/order/edit/{orderId}
     */
    orderEditPartialUpdate: (
      orderId: IdentificationDto,
      query?: {
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, any>({
        path: `/api/order/edit/${orderId}`,
        method: "PATCH",
        query: query,
        format: "json",
        ...params,
      }),

      /**
       * No description
       *
       * @tags Order
       * @name CustomerPlaceOrderCreate
       * @request POST:/api/customer/{customerId}/placeOrder
       */
      customerPlaceOrderCreate: (customerId: number, data: OrderPlacedDto, params: RequestParams = {}) =>
          this.request<OrderMain, any>({
              path: `/api/customer/${customerId}/placeOrder`,
              method: "POST",
              body: data,
              type: ContentType.Json,
              format: "json",
              ...params,
          }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersDetail
     * @request GET:/api/papers/{pageNumber}
     */
    papersDetail: (
      pageNumber: number,
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageItems?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaperToDisplay[], any>({
        path: `/api/papers/${pageNumber}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersInitializationPriceRangeList
     * @request GET:/api/papers/initialization/priceRange
     */
    papersInitializationPriceRangeList: (params: RequestParams = {}) =>
      this.request<PriceRange, any>({
        path: `/api/papers/initialization/priceRange`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersEditUpdate
     * @request PUT:/api/papers/edit/{paperId}
     */
    papersEditUpdate: (paperId: string, data: EditPaperDto, params: RequestParams = {}) =>
      this.request<PaperToDisplay, any>({
        path: `/api/papers/edit/${paperId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersDetailsDetail
     * @request GET:/api/papers/details/{paperId}
     */
    papersDetailsDetail: (paperId: number, params: RequestParams = {}) =>
      this.request<PaperProperties[], any>({
        path: `/api/papers/details/${paperId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
      /**
       * No description
       *
       * @tags Paper
       * @name PapersEditRemovepropertiesPartialUpdate
       * @request PATCH:/api/papers/edit/{paperId}/removeproperties/{propertyId}
       */
      papersEditRemovepropertiesPartialUpdate: (paperId: number, propertyId: number, params: RequestParams = {}) =>
          this.request<boolean, any>({
              path: `/api/papers/edit/${paperId}/properties/remove/${propertyId}`,
              method: "PATCH",
              format: "json",
              ...params,
          }),
      /**
       * No description
       *
       * @tags Paper
       * @name PapersEditPropertiesPartialUpdate
       * @request PATCH:/api/papers/edit/{paperId}/properties/{propertyId}
       */
      papersEditPropertiesPartialUpdate: (paperId: number, propertyId: number, params: RequestParams = {}) =>
          this.request<boolean, any>({
              path: `/api/papers/edit/${paperId}/properties/${propertyId}`,
              method: "PATCH",
              format: "json",
              ...params,
          }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersDeleteDelete
     * @request DELETE:/api/papers/delete/{paperId}
     */
    papersDeleteDelete: (paperId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/papers/delete/${paperId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PapersProprietiesList
     * @request GET:/api/papers/proprieties
     */
    papersProprietiesList: (params: RequestParams = {}) =>
      this.request<PaperProperties[], any>({
        path: `/api/papers/proprieties`,
        method: "GET",
        ...params,
      }),

      /**
       * No description
       *
       * @tags Paper
       * @name AdminCreatePropertyCreate
       * @request POST:/api/admin/createProperty
       */
      adminCreatePropertyCreate: (data: CreatePropertyDto, params: RequestParams = {}) =>
          this.request<void, any>({
              path: `/api/admin/createProperty`,
              method: "POST",
              body: data,
              type: ContentType.Json,
              ...params,
          }),

      /**
       * No description
       *
       * @tags Paper
       * @name AdminCreatePaperCreate
       * @request POST:/api/admin/createPaper
       */
      adminCreatePaperCreate: (data: CreateProductDto, params: RequestParams = {}) =>
          this.request<PaperToDisplay, any>({
              path: `/api/admin/createPaper`,
              method: "POST",
              body: data,
              type: ContentType.Json,
              ...params,
          }),


      /**
     * No description
     *
     * @tags Paper
     * @name AdminEditPaperProprietyPartialUpdate
     * @request PATCH:/api/admin/editPaperPropriety
     */
    adminEditPaperProprietyPartialUpdate: (data: EditPaperPropertyDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/editPaperPropriety`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name AdminDeletePaperProprietyPartialUpdate
     * @request PATCH:/api/admin/deletePaperPropriety
     */
    adminDeletePaperProprietyPartialUpdate: (data: EditPaperPropertyDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/deletePaperPropriety`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  customer = {
    /**
     * No description
     *
     * @tags Order
     * @name HistoryDetail
     * @request GET:/customer/{customerId}/history
     */
    historyDetail: (customerId: string, data: IdentificationDto, params: RequestParams = {}) =>
      this.request<OrderMain[], any>({
        path: `/customer/${customerId}/history`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
