// Editar una materia por su ID (Solo para Admin)
export const updateSubject = async (
  id: number,
  data: { name: string; description: string; isActive: boolean },
  token: string
) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/subjects/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const updateCategory = async (
  id: number,
  data: { name: string; description: string; isActive: boolean },
  token: string
) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/categories/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const updateTecnologies = async (
  id: number,
  data: { name: string; description: string; isActive: boolean },
  token: string
) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/technology/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

import { requestApi } from "@/modules/js/resquestApi";

// Eliminar una materia por su ID (Solo para Admin)
export const deleteSubject = async (id: number, token: string) => {
  console.log(id, token);
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/subjects/${id.toString()}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const insertSubjectPeople = async (data: any, token: string) => {
  return requestApi({
    url: "https://projects-app-backend-8elg.onrender.com/subject-people",
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
    url: "https://projects-app-backend-8elg.onrender.com/people/admin",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubjectPeople = async (id: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/subject-people/${id}/subjects`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
