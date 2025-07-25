import { requestApi } from "@/modules/js/resquestApi";


export const getProfile = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend-8elg.onrender.com/people/profile/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubjectPeople = async (id_user: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/subject-people/${id_user}/subjects`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getDashboardProfile = async (id: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/people/profile/dashboard/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};