import { EnableStatus } from "./constant"

export const isEnable = (enable: number): boolean => {
  return enable === EnableStatus.Enabled
}