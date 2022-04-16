import { AUTHORIZED_ROUTES } from "../../../constants/routes";

export const navigateToProfile = (id, router) => {
  router.replace(AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.PROFILE + id);
};
