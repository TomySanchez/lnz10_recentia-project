const USERNAME = 'admin';
const PASSWORD = '12345';

export function isAuthenticated() {
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  return storedUsername === USERNAME && storedPassword === PASSWORD;
}

export function login(username, password) {
  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    return true;
  }
  return false;
}
