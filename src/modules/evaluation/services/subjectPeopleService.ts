// src/modules/evaluation/services/subjectPeopleService.ts
import { requestApi } from "@/modules/js/resquestApi";

export const getSubjectsByPeopleId = async (id_user: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend-8elg.onrender.com/subject-people/${id_user}/subjects`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
