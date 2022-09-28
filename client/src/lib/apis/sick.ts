import { SICK_API_URL } from '../consts/api';
import http from './base';

const DEFAULT_LIMIT_COUNT = 10;

interface SickPayload {
  keyword: string;
  limit?: number;
}

export const getSick = async ({
  keyword,
  limit = DEFAULT_LIMIT_COUNT,
}: SickPayload) => {
  return http.get({
    url: SICK_API_URL,
    params: {
      q: keyword ? keyword : undefined,
      _limit: limit,
    },
  });
};
