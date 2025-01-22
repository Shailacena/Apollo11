import { useAxios } from "./AxiosProvider";
import {
  AdminLoginReq,
  IResponseBody,
  AdminLoginResp,
  AdminLogoutReq,
  AdminLogoutResp,
  AdminRegisterReq,
  AdminRegisterResp,
  AdminResetPasswordReq,
  AdminResetPasswordResp,
  AdminResetVerifiCodeReq,
  AdminResetVerifiCodeResp,
  ListAdminResp,
  AdminDeleteReq,
  AdminDeleteResp,
  AdminUpdateReq,
  AdminUpdateResp,
  AdminEnableReq,
  AdminEnableResp,
  ListRealNameAccountResp,
  RealNameAccountCreateReq,
  RealNameAccountCreateResp,
  ListJDAccountResp,
  JDAccountCreateReq,
  JDAccountCreateResp,
  ListPartnerResp,
  PartnerRegisterReq,
  PartnerRegisterResp,
  PartnerLoginReq,
  PartnerLoginResp,
  PartnerSetPasswordReq,
  PartnerSetPasswordResp,
  PartnerResetPasswordReq,
  PartnerResetPasswordResp,
  PartnerDeleteReq,
  PartnerDeleteResp,
  PartnerUpdateReq,
  PartnerUpdateResp,
  ListPartnerBillResp,
  ListGoodsResp,
  GoodsCreateReq,
  GoodsCreateResp,
  ListMerchantResp,
  MerchantRegisterReq,
  MerchantRegisterResp,
  MerchantLoginReq,
  MerchantLoginResp,
  MerchantSetPasswordReq,
  MerchantSetPasswordResp,
  ListStatisticsResp,
  ListOrderResp,
  AdminSetPasswordReq,
  AdminSetPasswordResp,
  JDAccountEnableReq,
  JDAccountEnableResp,
  ListJDAccountReq,
  JDAccountDeleteReq,
  JDAccountDeleteResp,
} from "./types";

export function useApis() {
  const ax = useAxios();
  return {
    adminLogin(data: AdminLoginReq): Promise<IResponseBody<AdminLoginResp>> {
      return ax.post("/admin/login", data).then((res) => {
        return res?.data;
      });
    },
    adminLogout(data: AdminLogoutReq): Promise<IResponseBody<AdminLogoutResp>> {
      return ax.post("/admin/logout", data).then((res) => {
        return res?.data;
      });
    },
    adminRegister(
      data: AdminRegisterReq
    ): Promise<IResponseBody<AdminRegisterResp>> {
      return ax.post("/admin/register", data).then((res) => {
        return res?.data;
      });
    },
    adminSetPassword(
      data: AdminSetPasswordReq
    ): Promise<IResponseBody<AdminSetPasswordResp>> {
      return ax.post("/admin/setPassword", data).then((res) => {
        return res?.data;
      });
    },
    adminResetPassword(
      data: AdminResetPasswordReq
    ): Promise<IResponseBody<AdminResetPasswordResp>> {
      return ax.post("/admin/resetPassword", data).then((res) => {
        return res?.data;
      });
    },
    adminResetVerifiCode(
      data: AdminResetVerifiCodeReq
    ): Promise<IResponseBody<AdminResetVerifiCodeResp>> {
      return ax.post("/admin/resetVerifiCode", data).then((res) => {
        return res?.data;
      });
    },
    listAdmin(): Promise<IResponseBody<ListAdminResp>> {
      return ax.get("/admin/list").then((res) => {
        return res?.data;
      });
    },
    adminDelete(data: AdminDeleteReq): Promise<IResponseBody<AdminDeleteResp>> {
      return ax.post("/admin/delete", data).then((res) => {
        return res?.data;
      });
    },
    adminUpdate(data: AdminUpdateReq): Promise<IResponseBody<AdminUpdateResp>> {
      return ax.post("/admin/update", data).then((res) => {
        return res?.data;
      });
    },
    adminEnable(data: AdminEnableReq): Promise<IResponseBody<AdminEnableResp>> {
      return ax.post("/admin/enable", data).then((res) => {
        return res?.data;
      });
    },
    listRealNameAccount(): Promise<IResponseBody<ListRealNameAccountResp>> {
      return ax.get("/realNameAccount/list").then((res) => {
        return res?.data;
      });
    },
    realNameAccountCreate(
      data: RealNameAccountCreateReq
    ): Promise<IResponseBody<RealNameAccountCreateResp>> {
      return ax.post("/realNameAccount/create", data).then((res) => {
        return res?.data;
      });
    },
    listJDAccount(
      params?: ListJDAccountReq
    ): Promise<IResponseBody<ListJDAccountResp>> {
      return ax.get("/jdAccount/list", params).then((res) => {
        return res?.data;
      });
    },
    jdAccountCreate(
      data: JDAccountCreateReq
    ): Promise<IResponseBody<JDAccountCreateResp>> {
      return ax.post("/jdAccount/create", data).then((res) => {
        return res?.data;
      });
    },
    jdAccountEnable(
      data: JDAccountEnableReq
    ): Promise<IResponseBody<JDAccountEnableResp>> {
      return ax.post("/jdAccount/enable", data).then((res) => {
        return res?.data;
      });
    },
    jdAccountDelete(
      data: JDAccountDeleteReq
    ): Promise<IResponseBody<JDAccountDeleteResp>> {
      return ax.post("/jdAccount/delete", data).then((res) => {
        return res?.data;
      });
    },
    listPartner(): Promise<IResponseBody<ListPartnerResp>> {
      return ax.get("/partner/list").then((res) => {
        return res?.data;
      });
    },
    partnerRegister(
      data: PartnerRegisterReq
    ): Promise<IResponseBody<PartnerRegisterResp>> {
      return ax.post("/partner/register", data).then((res) => {
        return res?.data;
      });
    },
    partnerLogin(
      data: PartnerLoginReq
    ): Promise<IResponseBody<PartnerLoginResp>> {
      return ax.post("/partner/login", data).then((res) => {
        return res?.data;
      });
    },
    partnerSetPassword(
      data: PartnerSetPasswordReq
    ): Promise<IResponseBody<PartnerSetPasswordResp>> {
      return ax.post("/partner/setPassword", data).then((res) => {
        return res?.data;
      });
    },
    partnerResetPassword(
      data: PartnerResetPasswordReq
    ): Promise<IResponseBody<PartnerResetPasswordResp>> {
      return ax.post("/partner/resetPassword", data).then((res) => {
        return res?.data;
      });
    },
    partnerDelete(
      data: PartnerDeleteReq
    ): Promise<IResponseBody<PartnerDeleteResp>> {
      return ax.post("/partner/delete", data).then((res) => {
        return res?.data;
      });
    },
    partnerUpdate(
      data: PartnerUpdateReq
    ): Promise<IResponseBody<PartnerUpdateResp>> {
      return ax.post("/partner/update", data).then((res) => {
        return res?.data;
      });
    },
    listPartnerBill(): Promise<IResponseBody<ListPartnerBillResp>> {
      return ax.get("/partner/listBill").then((res) => {
        return res?.data;
      });
    },
    listGoods(): Promise<IResponseBody<ListGoodsResp>> {
      return ax.get("/goods/list").then((res) => {
        return res?.data;
      });
    },
    createGoods(data: GoodsCreateReq): Promise<IResponseBody<GoodsCreateResp>> {
      return ax.post("/goods/create", data).then((res) => {
        return res?.data;
      });
    },
    listMerchant(): Promise<IResponseBody<ListMerchantResp>> {
      return ax.get("/merchant/list").then((res) => {
        return res?.data;
      });
    },
    merchantRegister(
      data: MerchantRegisterReq
    ): Promise<IResponseBody<MerchantRegisterResp>> {
      return ax.post("/merchant/register", data).then((res) => {
        return res?.data;
      });
    },
    merchantLogin(
      data: MerchantLoginReq
    ): Promise<IResponseBody<MerchantLoginResp>> {
      return ax.post("/merchant/login", data).then((res) => {
        return res?.data;
      });
    },
    merchantSetPassword(
      data: MerchantSetPasswordReq
    ): Promise<IResponseBody<MerchantSetPasswordResp>> {
      return ax.post("/merchant/setPassword", data).then((res) => {
        return res?.data;
      });
    },
    listStatisticsBill(): Promise<IResponseBody<ListStatisticsResp>> {
      return ax.get("/statistics/listBill").then((res) => {
        return res?.data;
      });
    },
    listOrder(): Promise<IResponseBody<ListOrderResp>> {
      return ax.get("/order/list").then((res) => {
        return res?.data;
      });
    },
  };
}
