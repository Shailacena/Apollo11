import { request } from './request';

interface IResponseBody<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface AdminLoginReq {
  username: string
  password: string
}

interface AdminLoginResp {
  token: string
  nickname: string
}

export function adminLogin(data: AdminLoginReq): Promise<AdminLoginResp> {
  return request.post("/admin/login", data).then((res) => {
    return res.data.data
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
  return request.post("/admin/register", data).then((res) => {
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

export function listAdmin(data: any): Promise<IResponseBody<ListAdminResp>> {
  return request.post("/admin/list", data).then((res) => {
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

export function listPartner(data: any): Promise<IResponseBody<ListPartnerResp>> {
  return request.post("/partner/list", data).then((res) => {
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

export function partnerRegister(data: PartnerRegisterReq): Promise<PartnerRegisterResp> {
  return request.post("/partner/register", data).then((res) => {
    return res.data
  })
}

export interface PartnerLoginReq {
  id: string
  password: string
}

interface PartnerLoginResp {
  token: string
  name: string
}

export function partnerLogin(data: PartnerLoginReq): Promise<PartnerLoginResp> {
  return request.post("/partner/login", data).then((res) => {
    return res.data.data
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

export function listMerchant(data: any): Promise<IResponseBody<ListMerchantResp>> {
  return request.post("/merchant/list", data).then((res) => {
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

export function merchantRegister(data: MerchantRegisterReq): Promise<MerchantRegisterResp> {
  return request.post("/merchant/register", data).then((res) => {
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

export function merchantLogin(data: MerchantLoginReq): Promise<MerchantLoginResp> {
  return request.post("/merchant/login", data).then((res) => {
    return res.data.data
  })
}