// src/modules/evaluation/services/subjectPeopleService.ts
import { requestApi } from "@/modules/js/resquestApi";

export const getSubjectsByPeopleId = async (peopleId: string, token: string) => {
  return requestApi({
    url: `https://projects-app-backend.onrender.com/subject-people/${peopleId}/subjects`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
