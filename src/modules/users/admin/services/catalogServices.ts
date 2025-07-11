import { requestApi } from "@/modules/js/resquestApi";

export const insertSubjectPeople = async (data: any, token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/subject-people",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};


export const getUsers = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/people/admin",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getSubjectPeople = async (id: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend.onrender.com/subject-people/${id}/subjects`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


