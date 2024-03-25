class ProfileService {
  axiosInstance: any
  constructor(axiosInstance: any) {
    this.axiosInstance = axiosInstance
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('?lookup&email=gert@ankerdata2.co.za')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default ProfileService
