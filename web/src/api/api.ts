import { AxiosResponse } from 'axios';
import { request } from './request';

interface IResponseBody<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

function get(url: string): Promise<AxiosResponse> {
  return request.get(url).then((res) => {
    console.log(res)
    return res
  })
}

function post(url: string, data: any): Promise<AxiosResponse> {
  return request.post(url, data).then((res) => {
    console.log(res)
    return res
  })
}

export interface AdminLoginReq {
  username: string
  password: string
}

interface AdminLoginResp {
  token: string
  nickname: string
}

export function adminLogin(data: AdminLoginReq): Promise<IResponseBody<AdminLoginResp>>{
  return post("/admin/login", data).then((res) => {
    return res.data
  })
}

export interface AdminRegisterReq {
  username: string
  nickname: string
  remark: string
}

interface AdminRegisterResp {
  username: string
  nickname: string
  password: string
}

export function adminRegister(data: AdminRegisterReq): Promise<IResponseBody<AdminRegisterResp>> {
  return post("/admin/register", data).then((res) => {
    return res.data
  })
}

interface ListAdminResp {
  list: Array<IAdmin>
}

export interface IAdmin {
  id: number
  username: string
  nickname: string
  remark: string
  enable: number
}

export function listAdmin(): Promise<IResponseBody<ListAdminResp>> {
  return get("/admin/list").then((res) => {
    return res.data
  })
}

interface ListRealNameAccountResp {
  list: Array<IRealNameAccount>
}

export interface IRealNameAccount {
  IdNumber: string
	Name: string
  RealNameCount: number
	Enable: number
	Remark: string
}

export function listRealNameAccount(): Promise<IResponseBody<ListRealNameAccountResp>> {
  return get("/realNameAccount/list").then((res) => {
    return res.data
  })
}

interface ListJDAccountResp {
  list: Array<IJDAccount>
}

export interface IJDAccount {
  Id: string
	Account: string
	RealNameStatus: number
	TotalOrderCount: number
	TodayOrderCount: number
	TotalSuccessOrderCount: number
	LoginStatus: number
	Enable: number
	Remark: number
	CreateAt: number
}

export function listJDAccount(): Promise<IResponseBody<ListJDAccountResp>> {
  return get("/jdAccount/list").then((res) => {
    return res.data
  })
}

interface ListPartnerResp {
  list: Array<IPartner>
}

export interface IPartner {
  id: number
  username: string
  nickname: string
  remark: string
  enable: number
}


export function listPartner(): Promise<IResponseBody<ListPartnerResp>> {
  return get("/partner/list").then((res) => {
    return res.data
  })
}

export interface PartnerRegisterReq {
  name: string
  priority: number
  dailyLimit?: number
  rechargeTime?: number
  privateKey?: string
  remark?: string
}

interface PartnerRegisterResp {
  name: string
  password: string
}

export function partnerRegister(data: PartnerRegisterReq): Promise<IResponseBody<PartnerRegisterResp>> {
  return post("/partner/register", data).then((res) => {
    return res.data
  })
}

export interface PartnerLoginReq {
  id: number
  password: string
}

interface PartnerLoginResp {
  token: string
  name: string
}

export function partnerLogin(data: PartnerLoginReq): Promise<IResponseBody<PartnerLoginResp>> {
  return post("/partner/login", data).then((res) => {
    return res.data
  })
}

interface ListPartnerBillResp {
  list: Array<IPartnerBill>
}

export interface IPartnerBill {
  PartnerId: number
	Type: number
	ChangeMoney: number
	Money: number
	Remark: string
	CreateAt: number
}

export function listPartnerBill(): Promise<IResponseBody<ListPartnerBillResp>> {
  return get("/partner/listBill").then((res) => {
    return res.data
  })
}

interface ListGoodsResp {
  list: Array<IGoods>
}

export interface IGoods {
  Id: number
	PartnerId: number
	RechargeType: number
	SkuId: string
	BrandId: string
	Price: number
	RealPrice: number
	ShopName: string
	CreateAt: number
}


export function listGoods(): Promise<IResponseBody<ListGoodsResp>> {
  return get("/goods/list").then((res) => {
    return res.data
  })
}

export interface GoodsCreateReq {
  PartnerId: number
	RechargeType: number
	SkuId: string
	BrandId: string
	Price: number
	RealPrice: number
	ShopName: string
}

interface GoodsCreateResp {
  
}

export function createGoods(data: GoodsCreateReq): Promise<IResponseBody<GoodsCreateResp>> {
  return post("/goods/create", data).then((res) => {
    return res.data
  })
}

interface ListMerchantResp {
  list: Array<IMerchant>
}

export interface IMerchant {
  id: string
  name: string
  privateKey: string
  createAt: number
  totalAmount: number
  todayAmount: number
  enable: number
  remark: string
}

export function listMerchant(): Promise<IResponseBody<ListMerchantResp>> {
  return get("/merchant/list").then((res) => {
    return res.data
  })
}

export interface MerchantRegisterReq {
  name: string
  remark?: string
}

interface MerchantRegisterResp {
  name: string
  password: string
}

export function merchantRegister(data: MerchantRegisterReq): Promise<IResponseBody<MerchantRegisterResp>> {
  return post("/merchant/register", data).then((res) => {
    return res.data
  })
}

export interface MerchantLoginReq {
  id: string
  password: string
}

interface MerchantLoginResp {
  token: string
  name: string
}

export function merchantLogin(data: MerchantLoginReq): Promise<IResponseBody<MerchantLoginResp>> {
  return post("/merchant/login", data).then((res) => {
    return res.data.data
  })
}

interface ListStatisticsResp {
  list: Array<IStatistics>
}

export interface IStatistics {
  Date: string
	TotalMoney: number
	WxFee: number
	WxManualFee: number
	AliFee: number
	AliManualFee: number
}

export function listStatisticsBill(): Promise<IResponseBody<ListStatisticsResp>> {
  return get("/statistics/listBill").then((res) => {
    return res.data
  })
}

interface ListOrderResp {
  list: Array<IOrder>
}

export interface IOrder {
  Date: string
	TotalMoney: number
	WxFee: number
	WxManualFee: number
	AliFee: number
	AliManualFee: number
}

export function listOrder(): Promise<IResponseBody<ListOrderResp>> {
  return get("/order/list").then((res) => {
    return res.data
  })
}
