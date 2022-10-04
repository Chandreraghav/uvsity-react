import { AUTHORIZED_ROUTES } from "../../../constants/routes";

export const navigateToProfile = (id, router) => {
  router.push(AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.PROFILE + id);
};

export const navigateToPath = (router, path, query) => {
  if (!query) {
    router.push(path);
    return;
  }

  router.push({
    pathname: path,
    query,
  });
};

export const redirectToURI = (uri) => {
  window.location.assign(uri);
};
export const openNewTab = (uri) => {
  window.open(uri, "_blank");
};
