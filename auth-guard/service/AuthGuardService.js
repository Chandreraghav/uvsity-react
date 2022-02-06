import { AuthService } from "../../pages/api/users/auth/AuthService";
import SessionValidityService from "../../pages/api/users/session/SessionValidityService";

export class AuthGuardService extends AuthService {
  
  static isVerifiedLogin() {
   return AuthService.isUserLoggedIn()
      ? true
      : false
  }

 static async pollSessionValidity(){
   return await new SessionValidityService.getSessionValidity()
  }

  static loadGAPIClient() {
    return new Promise((resolve, reject) => {
      let script = window.document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = e => {
        window.gapi.load('client:auth2', _ => {
          const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID
          function initGAPI(){
            if (!window.gapi || !window.gapi.client){ return reject('no window.gapi.client') }
            window.gapi.client.init({
              client_id: clientId,
              scope:'email'
            })
            .then(_ => {
              window.GAPIiniOK = true
              resolve()
              // Global auth listener
            }).catch(error => {
               return reject(error)
            })
          }
          setTimeout(initGAPI, 10)
        })
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}
