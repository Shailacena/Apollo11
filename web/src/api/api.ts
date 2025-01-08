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

export function adminLogin(data: AdminLoginReq): Promise<IResponseBody<AdminLoginResp>> {
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

export interface AdminResetPasswordReq {
  username: string
}

interface AdminResetPasswordResp {
  password: string
}

export function adminResetPassword(data: AdminResetPasswordReq): Promise<IResponseBody<AdminResetPasswordResp>> {
  return post("/admin/resetPassword", data).then((res) => {
    return res.data
  })
}

export interface AdminDeleteReq {
  username: string
}

interface AdminDeleteResp {

}

export function adminDelete(data: AdminDeleteReq): Promise<IResponseBody<AdminDeleteResp>> {
  return post("/admin/delete", data).then((res) => {
    return res.data
  })
}

export interface AdminUpdateReq {
  username: string
  nickname: string
  remark: string
}

interface AdminUpdateResp {

}

export function adminUpdate(data: AdminUpdateReq): Promise<IResponseBody<AdminUpdateResp>> {
  return post("/admin/update", data).then((res) => {
    return res.data
  })
}

export interface AdminEnableReq {
  username: string
  enable: number
}

interface AdminEnableResp {
  enable: number
}

export function adminEnable(data: AdminEnableReq): Promise<IResponseBody<AdminEnableResp>> {
  console.log(data)
  return post("/admin/enable", data).then((res) => {
    return res.data
  })
}

interface ListRealNameAccountResp {
  list: Array<IRealNameAccount>
}

export interface IRealNameAccount {
  idNumber: string
  name: string
  realNameCount: number
  enable: number
  remark: string
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
  id: string
  account: string
  realNameStatus: number
  totalOrderCount: number
  todayOrderCount: number
  totalSuccessOrderCount: number
  loginStatus: number
  enable: number
  remark: number
  createAt: number
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
  name: string
  creditAmount: number
  dailyLimit: number
  priority: number
  superiorAgent: number
  level: number
  stockAmount: number
  enable: number
  remark: string
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
  partnerId: number
  type: number
  changeMoney: number
  money: number
  remark: string
  createAt: number
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
  id: number
  partnerId: number
  rechargeType: number
  skuId: string
  brandId: string
  price: number
  realPrice: number
  shopName: string
  createAt: number
}


export function listGoods(): Promise<IResponseBody<ListGoodsResp>> {
  return get("/goods/list").then((res) => {
    return res.data
  })
}

export interface GoodsCreateReq {
  partnerId: number
  rechargeType: number
  skuId: string
  brandId: string
  price: number
  realPrice: number
  shopName: string
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
  date: string
  totalMoney: number
  wxFee: number
  wxManualFee: number
  aliFee: number
  aliManualFee: number
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
  date: string
  totalMoney: number
  wxFee: number
  wxManualFee: number
  aliFee: number
  aliManualFee: number
}

export function listOrder(): Promise<IResponseBody<ListOrderResp>> {
  return get("/order/list").then((res) => {
    return res.data
  })
}
