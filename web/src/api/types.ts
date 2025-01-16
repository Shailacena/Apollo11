export interface IResponseBody<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface AdminLoginReq {
  username: string;
  password: string;
  verificode: string;
}

export interface AdminLoginResp {
  token: string;
  nickname: string;
  role: number;
}

export interface AdminLogoutReq {}

export interface AdminLogoutResp {}

export interface AdminRegisterReq extends AdminBaseInfoReq {}

export interface AdminBaseInfoReq {
  username: string;
  nickname: string;
  remark: string;
}

export interface AdminRegisterResp {
  username: string;
  nickname: string;
  password: string;
}

export interface ListAdminResp {
  list: Array<IAdmin>;
}

export interface IAdmin {
  id: number;
  username: string;
  nickname: string;
  remark: string;
  enable: number;
  role: number;
  urlKey: string;
}

export interface AdminResetPasswordReq {
  username: string;
}

export interface AdminResetPasswordResp {
  password: string;
}

export interface AdminSetPasswordReq {
  oldPassword: string;
  newPassword: string;
}

export interface AdminSetPasswordResp {
}

export interface AdminResetVerifiCodeReq {
  id: number;
}

export interface AdminResetVerifiCodeResp {
  urlKey: string;
}

export interface AdminDeleteReq {
  username: string;
}

export interface AdminDeleteResp {}

export interface AdminUpdateReq extends AdminBaseInfoReq {}

export interface AdminUpdateResp {}

export interface AdminEnableReq {
  username: string;
  enable: number;
}

export interface AdminEnableResp {
  enable: number;
}

export interface ListRealNameAccountResp {
  list: Array<IRealNameAccount>;
}

export interface IRealNameAccount extends BaseRealNameAccount {
  realNameCount: number;
  enable: number;
  remark: string;
}

export interface ListJDAccountResp {
  list: Array<IJDAccount>;
}

export interface IJDAccount {
  id: string;
  account: string;
  realNameStatus: number;
  totalOrderCount: number;
  todayOrderCount: number;
  totalSuccessOrderCount: number;
  loginStatus: number;
  enable: number;
  remark: number;
  createAt: number;
}

export interface ListPartnerResp {
  list: Array<IPartner>;
}

export interface IPartner {
  id: number;
  name: string;
  creditAmount: number;
  dailyLimit: number;
  priority: number;
  superiorAgent: string;
  level: number;
  stockAmount: number;
  enable: number;
  remark: string;
}

export interface PartnerBaseInfoReq {
  name?: string;
  superiorAgent?: string;
  level?: number;
  remark?: string;
}

export interface PartnerRegisterReq extends PartnerBaseInfoReq {}

export interface PartnerRegisterResp {
  name: string;
  password: string;
}

export interface PartnerLoginReq {
  id: number;
  password: string;
}

export interface PartnerLoginResp {
  token: string;
  level: number;
  name: string;
}

export interface PartnerSetPasswordReq {
  id: number;
  oldpassword: string;
  newpassword: string;
}

export interface PartnerSetPasswordResp {}

export interface PartnerUpdateReq extends PartnerBaseInfoReq {
  id: number;
  changeCreditAmount?: number;
  dailyLimit?: number;
  priority?: number;
  rechargeTime?: number;
  stockAmount?: number;
  privateKey?: string;
  enable?: number;
}

export interface PartnerUpdateResp {}

export interface PartnerResetPasswordReq {
  name: string;
}

export interface PartnerResetPasswordResp {
  password: string;
}

export interface PartnerDeleteReq {
  name: string;
}

export interface PartnerDeleteResp {}

export interface ListPartnerBillResp {
  list: Array<IPartnerBill>;
}

export interface IPartnerBill {
  partnerId: number;
  type: number;
  changeMoney: number;
  money: number;
  remark: string;
  createAt: number;
}

export interface ListGoodsResp {
  list: Array<IGoods>;
}

export interface IGoods {
  id: number;
  partnerId: number;
  rechargeType: number;
  skuId: string;
  brandId: string;
  price: number;
  realPrice: number;
  shopName: string;
  createAt: number;
}

export interface GoodsCreateReq {
  partnerId: number;
  rechargeType: number;
  skuId: string;
  brandId: string;
  price: number;
  realPrice: number;
  shopName: string;
}

export interface GoodsCreateResp {}

export interface ListMerchantResp {
  list: Array<IMerchant>;
}

export interface IMerchant {
  id: string;
  name: string;
  privateKey: string;
  createAt: number;
  totalAmount: number;
  todayAmount: number;
  enable: number;
  remark: string;
}

export interface MerchantRegisterReq {
  name: string;
  remark?: string;
}

export interface MerchantRegisterResp {
  name: string;
  password: string;
}

export interface MerchantLoginReq {
  id: number;
  password: string;
}

export interface MerchantLoginResp {
  token: string;
  name: string;
}

export interface MerchantSetPasswordReq {
  id: number;
  oldpassword: string;
  newpassword: string;
}

export interface MerchantSetPasswordResp {}

export interface ListStatisticsResp {
  list: Array<IStatistics>;
}

export interface IStatistics {
  date: string;
  totalMoney: number;
  wxFee: number;
  wxManualFee: number;
  aliFee: number;
  aliManualFee: number;
}

export interface ListOrderResp {
  list: Array<IOrder>;
}

export interface IOrder {
  date: string;
  totalMoney: number;
  wxFee: number;
  wxManualFee: number;
  aliFee: number;
  aliManualFee: number;
}

export interface JDAccountCreateReq {
  accountList: Array<IJDAccountCreate>;
  remark: string;
}

export interface IJDAccountCreate {
  account: string;
  wsKey: string;
}

export interface JDAccountCreateResp {}

export interface RealNameAccountCreateReq {
  accountList: Array<BaseRealNameAccount>;
  remark: string;
}

export interface BaseRealNameAccount {
  idNumber: string;
  name: string;
}

export interface RealNameAccountCreateResp {}
