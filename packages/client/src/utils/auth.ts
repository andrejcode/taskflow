export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem('token', token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem('token');
}

export async function checkTokenExpiration(response: Response) {
  const responseText = await response.text();

  if (response.status === 401 && responseText === 'Token expired.') {
    return true;
  }

  return false;
}
