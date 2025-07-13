import { requestApi } from "@/modules/js/resquestApi";


export const getProfile = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/people/profile/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubjectPeople = async (id_user: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend.onrender.com/subject-people/${id_user}/subjects`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};