export class AuthenticationHelper {
  setAccessToken(jwt: string) {
    localStorage.setItem('access_token', jwt)
  }

  getAccessToken() {
    return localStorage.getItem('access_token')
  }
}
