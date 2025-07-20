import { requestApi } from "@/modules/js/resquestApi";

// Obtener materias
export const getSubjects = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/subjects",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Obtener categorías
export const getCategories = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/categories",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Obtener tecnologías
export const getTechnologies = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/technology",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Obtener periodos académicos
export const getAcademicPeriods = async (token: string) => {
  return requestApi({
    url: "https://projects-app-backend.onrender.com/academic-periods",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Subir archivo o enlace del proyecto
export const uploadProjectFile = async (
  token: string,
  projectId: number,
  file?: File,
  url?: string,
  title?: string
) => {
  const formData = new FormData();
  formData.append("projectId", String(projectId));

  if (file) formData.append("file", file);
  if (url) formData.append("url", url);
  if (title) formData.append("title", title);

  return requestApi({
    url: "https://projects-app-backend.onrender.com/student/file/upload",
    method: "POST",
    data: formData, // ✅ Axios espera "data" aquí
    headers: {
      Authorization: `Bearer ${token}`,
      // No incluir manualmente Content-Type con FormData
    },
  });
};
