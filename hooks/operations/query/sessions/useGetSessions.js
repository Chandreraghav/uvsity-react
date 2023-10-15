import { useQuery } from "@tanstack/react-query"
import { KEYS } from '../../../../async';
import SessionService from "../../../../pages/api/session/SessionService";

export const useGetSessions = (session_type, filters=false) => {
  return useQuery(
    [KEYS.SESSION.VIEW, session_type, filters],
    () => SessionService.getSessionsByType(session_type,filters).then(({ data }) => data), {
      enabled: !!session_type
    }
  );
};