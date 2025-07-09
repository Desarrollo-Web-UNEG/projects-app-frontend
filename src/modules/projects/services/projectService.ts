export const deleteProject = async (projectId: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend.onrender.com/projects/${projectId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
import { requestApi } from "@/modules/js/resquestApi";

export const updateProject = async (projectId: string, data: any, token: string) => {
  return requestApi({
    url: `https://projects-app-backend.onrender.com/projects/${projectId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};


export const createProject = async (data: any, token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/projects",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getProjects = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/projects",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  });
};


