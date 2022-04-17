export function getFormBody(params) {
  let formBody = []; //['username:hammad','password:12345']

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // user name => user%20name
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=hammad&password=12345'
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
