/***
 * GLOBAL APP CSS
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
/***
 * GLOBAL APP CSS
 */

import { DataLayer } from "../context/DataLayer";
import reducer, { initialState } from "../context/reducer";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then((reg) => {
          console.log("Success:", reg.scope);
        })
        .catch((err) => {
          console.log("Failure:", err.message);
        });
    }
  }, []);

  return  <>
  <DataLayer initialState={initialState} reducer={reducer}>
   
      <Component {...pageProps} />
    
  </DataLayer>
  
</>
}

export default MyApp
