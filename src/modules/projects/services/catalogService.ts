import { requestApi } from "@/modules/js/resquestApi";

const API = "https://projects-app-backend-8elg.onrender.com"

export const getSubjetcsByStudent = async (token: string, studentId: string) => {
  return requestApi({
    url: `${API}/subject-people/${studentId}/subjects`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getSubjects = async (token: string) => {

  return requestApi({
    url: `${API}/subjects`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = async (token: string) => {
  return requestApi({
    url: `${API}/categories`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTechnologies = async (token: string) => {
  return requestApi({
    url: `${API}/technology`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
