export default function({ app, route, query, store, redirect }) {
  // First, check local storage (current camp)
  // Because it takes some for the store to load from local storage during initialization
  const tilesLocalStorageString = window.localStorage.getItem("tiles");
  const tilesLocalStorage = tilesLocalStorageString
    ? JSON.parse(tilesLocalStorageString)
    : {};
  const selectedCamp = tilesLocalStorage.selectedCamp;

  // Second, check query (attempt camp)
  const attemptCamp = query.camp;

  const selectedLocale = app.i18n.locale;

  // Redirect
  const isIndexRoute = route.name === "index";
  const isCampRoute = route.name === "camp";
  const isLanguageRoute = route.name === "language";

  if (!isCampRoute) {
    const isCampValid = store.getters.validateCampId;
    if (selectedCamp && !isCampValid(selectedCamp)) {
      redirect("/camp");
    }

    if (attemptCamp && !isCampValid(attemptCamp)) {
      redirect("/camp");
    }

    if (selectedCamp && attemptCamp && selectedCamp !== attemptCamp) {
      redirect("/camp", {
        camp: selectedCamp,
        switch: attemptCamp
      });
    }
  }

  if (isIndexRoute) {
    if (!selectedCamp) {
      redirect("/camp");
    }
    if (!selectedLocale) {
      redirect("/language");
    }
    redirect(app.localePath("welcome"), { camp: selectedCamp });
  } else if (isLanguageRoute) {
    if (!selectedCamp) {
      redirect("/camp");
    }
  } else if (isCampRoute) {
  } else if (!query.camp) {
    redirect(route.path, { camp: selectedCamp });
  }
}
