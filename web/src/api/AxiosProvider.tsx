import { createContext, useContext, useState } from "react";
import { request } from "./request";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useAppContext } from "../AppProvider";
import { Modal } from "antd";

interface AxiosInstanceContextType {
  axiosInstance: AxiosInstance;
  get: (url: string, params?: any) => Promise<AxiosResponse | void>
  post: (url: string, data: any) => Promise<AxiosResponse | void>
}

const AxiosContext = createContext<AxiosInstanceContextType>(null!)

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const [axiosInstance] = useState(() => request);
  let app = useAppContext()
  let headers: any = {}

  if (app?.cookie?.token) {
    headers["Ttttt"] = app.cookie.token
  }

  if (app?.cookie?.role) {
    headers["Rrrr"] = app.cookie.role
  }

  let get = (url: string, params?: any): Promise<AxiosResponse | void> => {
    return request.get(url, { headers, params: params }).then((res) => {
      return res
    }).catch((e) => {
      if (e.status == 401) {
        app.auth?.adminSignout(() => { })
      }
    })
  }

  let post = (url: string, data: any): Promise<AxiosResponse | void> => {
    return request.post(url, data, { headers }).then((res) => {
      return res
    }).catch((e: AxiosError) => {
      if (e.status == 401) {
        app.auth?.adminSignout(() => { })
      } else if (e.status == 500) {
        //@ts-ignore
        if (e.response && e.response.data && e.response.data.message)
          Modal.error({
            //@ts-ignore
            content: e.response.data.message,
          });
      }
    })
  }

  let value = {
    axiosInstance,
    get,
    post,
  }

  return <AxiosContext.Provider value={value} >
    {children}
  </AxiosContext.Provider>
}

export function useAxios() {
  // 获取axios实例
  return useContext(AxiosContext)
}

