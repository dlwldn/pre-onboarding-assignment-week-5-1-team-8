import { SICK_API_URL } from '../consts/api';
import http from './base';

interface SickPayload {
  keyword: string;
}

export const getSick = async ({ keyword }: SickPayload) => {
  try {
    const response = await http.get({
      url: SICK_API_URL,
      params: {
        q: keyword ? keyword : undefined
      }
    })

    return response.data
  } catch(e) {
    console.info(e);
  }
}