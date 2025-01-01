import { request } from './request';

interface IResponseBody<T> {
  success: boolean;
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