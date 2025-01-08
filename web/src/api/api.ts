import { useAxios } from './AxiosProvider';

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

export interface AdminLoginResp {
  token: string
  nickname: string
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

export interface AdminResetPasswordReq {
  username: string
}

interface AdminResetPasswordResp {
  password: string
}

export interface AdminDeleteReq {
  username: string
}

interface AdminDeleteResp {

}

export interface AdminUpdateReq {
  username: string
  nickname: string
  remark: string
}

interface AdminUpdateResp {

}

export interface AdminEnableReq {
  username: string
  enable: number
}

interface AdminEnableResp {
  enable: number
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

export interface PartnerLoginReq {
  id: number
  password: string
}

export interface PartnerLoginResp {
  token: string
  name: string
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

export interface MerchantRegisterReq {
  name: string
  remark?: string
}

interface MerchantRegisterResp {
  name: string
  password: string
}

export interface MerchantLoginReq {
  id: string
  password: string
}

export interface MerchantLoginResp {
  token: string
  name: string
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

export function useApis() {
  const ax = useAxios()
  return {
    adminLogin(data: AdminLoginReq): Promise<IResponseBody<AdminLoginResp>> {
      return ax.post("/admin/login", data).then((res) => {
        return res?.data
      })
    },
    adminRegister(data: AdminRegisterReq): Promise<IResponseBody<AdminRegisterResp>> {
      return ax.post("/admin/register", data).then((res) => {
        return res?.data
      })
    },
    adminResetPassword(data: AdminResetPasswordReq): Promise<IResponseBody<AdminResetPasswordResp>> {
      return ax.post("/admin/resetPassword", data).then((res) => {
        return res?.data
      })
    },
    listAdmin(): Promise<IResponseBody<ListAdminResp>> {
      return ax.get("/admin/list").then((res) => {
        return res?.data
      })
    },
    adminDelete(data: AdminDeleteReq): Promise<IResponseBody<AdminDeleteResp>> {
      return ax.post("/admin/delete", data).then((res) => {
        return res?.data
      })
    },
    adminUpdate(data: AdminUpdateReq): Promise<IResponseBody<AdminUpdateResp>> {
      return ax.post("/admin/update", data).then((res) => {
        return res?.data
      })
    },
    adminEnable(data: AdminEnableReq): Promise<IResponseBody<AdminEnableResp>> {
      return ax.post("/admin/enable", data).then((res) => {
        return res?.data
      })
    },
    listRealNameAccount(): Promise<IResponseBody<ListRealNameAccountResp>> {
      return ax.get("/realNameAccount/list").then((res) => {
        return res?.data
      })
    },
    listJDAccount(): Promise<IResponseBody<ListJDAccountResp>> {
      return ax.get("/jdAccount/list").then((res) => {
        return res?.data
      })
    },
    listPartner(): Promise<IResponseBody<ListPartnerResp>> {
      return ax.get("/partner/list").then((res) => {
        return res?.data
      })
    },
    partnerRegister(data: PartnerRegisterReq): Promise<IResponseBody<PartnerRegisterResp>> {
      return ax.post("/partner/register", data).then((res) => {
        return res?.data
      })
    },
    partnerLogin(data: PartnerLoginReq): Promise<IResponseBody<PartnerLoginResp>> {
      return ax.post("/partner/login", data).then((res) => {
        return res?.data
      })
    },
    listPartnerBill(): Promise<IResponseBody<ListPartnerBillResp>> {
      return ax.get("/partner/listBill").then((res) => {
        return res?.data
      })
    },
    listGoods(): Promise<IResponseBody<ListGoodsResp>> {
      return ax.get("/goods/list").then((res) => {
        return res?.data
      })
    },
    createGoods(data: GoodsCreateReq): Promise<IResponseBody<GoodsCreateResp>> {
      return ax.post("/goods/create", data).then((res) => {
        return res?.data
      })
    },
    listMerchant(): Promise<IResponseBody<ListMerchantResp>> {
      return ax.get("/merchant/list").then((res) => {
        return res?.data
      })
    },
    merchantRegister(data: MerchantRegisterReq): Promise<IResponseBody<MerchantRegisterResp>> {
      return ax.post("/merchant/register", data).then((res) => {
        return res?.data
      })
    },
    merchantLogin(data: MerchantLoginReq): Promise<IResponseBody<MerchantLoginResp>> {
      return ax.post("/merchant/login", data).then((res) => {
        return res?.data
      })
    },
    listStatisticsBill(): Promise<IResponseBody<ListStatisticsResp>> {
      return ax.get("/statistics/listBill").then((res) => {
        return res?.data
      })
    },
    listOrder(): Promise<IResponseBody<ListOrderResp>> {
      return ax.get("/order/list").then((res) => {
        return res?.data
      })
    },
  }
}
