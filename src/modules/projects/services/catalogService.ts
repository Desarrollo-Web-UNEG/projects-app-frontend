import { requestApi } from "@/modules/js/resquestApi";

export const getSubjects = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend-8elg.onrender.com/subjects",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend-8elg.onrender.com/categories",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTechnologies = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend-8elg.onrender.com/technology",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
