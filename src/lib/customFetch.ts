import { API_URL } from '@/config';

const customFetch = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  const request: RequestInit = { ...options };
  const response = await fetch(`${API_URL}/${endpoint}`, request);
  return response;
};

export default customFetch;
