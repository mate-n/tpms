export class AuthenticationHelper {
  setAccessToken(jwt: string) {
    localStorage.setItem('jwt', jwt)
  }

  getAccessToken() {
    return localStorage.getItem('jwt')
  }
}
