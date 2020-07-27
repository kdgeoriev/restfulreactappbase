export default async () => {
  var authToken = window.gapi.auth2.getAuthInstance();
  //no point in reinitializing it every time
  if (authToken) {
    return authToken;
  }
  await window.gapi.client
    .init({
      clientId:
        "633585212457-j008mg9gpn3fbbllcip703gdnagrsp33.apps.googleusercontent.com",
      scope: "email",
    })
    .then(() => {
      authToken = window.gapi.auth2.getAuthInstance();
    });
  return authToken;
};
