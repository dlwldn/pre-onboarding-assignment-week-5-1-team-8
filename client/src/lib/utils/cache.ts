import { SickDataType } from "../../types/sick";

export const cacheData = new Map<string, SickDataType[]>();

export const getCacheData = (keyword: string) => {
  return cacheData.get(keyword)
}

export const setCacheData = (keyword: string, sicks: SickDataType[]) => {
  cacheData.set(keyword, sicks)
}