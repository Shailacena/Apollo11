import { createContext, useContext, useState } from "react";
import { request } from "./request";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useAppContext } from "../AppProvider";

interface AxiosInstanceContextType {
  axiosInstance: AxiosInstance;
  get: (url: string) => Promise<AxiosResponse | void>
  post: (url: string, data: any) => Promise<AxiosResponse | void>
}

const AxiosContext = createContext<AxiosInstanceContextType>(null!)

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const [axiosInstance] = useState(() => request);
  let app = useAppContext()
  let headers: any = {}

  if (app?.auth?.token) {
    headers["Token"] = app.auth.token
  }

  let get = (url: string): Promise<AxiosResponse | void> => {
    return request.get(url, { headers }).then((res) => {
      console.log(res)
      return res
    }).catch((e) => {
      if (e.status == 401) {
        app.auth?.adminSignout(() => { })
      }
    })
  }

  let post = (url: string, data: any): Promise<AxiosResponse | void> => {
    return request.post(url, data, { headers }).then((res) => {
      console.log(res)
      return res
    }).catch((e: AxiosError) => {
      if (e.status == 401) {
        app.auth?.adminSignout(() => { })
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

