import axios, { Method } from "axios";

interface RequestApiParams {
  url: string;
  method?: Method;
  data?: any; // Aquí se envía tanto JSON como FormData
  headers?: Record<string, string>;
}

export const requestApi = async ({
  url,
  method = "GET",
  data = {},
  headers,
}: RequestApiParams) => {
  try {
    const config = {
      url,
      method,
      data, // Axios usa esto como body
      ...(headers && { headers }),
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
