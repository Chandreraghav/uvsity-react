import "tailwindcss/tailwind.css";
import "../styles/global.css"
import { useEffect } from "react";
import { DataLayer } from "../appContext/DataLayer";
import reducer, { initialState } from "../appContext/reducer";
import AppLayer from "../appContext/AppLayer";
export default function MyApp({ Component, pageProps }) {
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

  return (
    <>
      <DataLayer initialState={initialState} reducer={reducer}>
        <AppLayer>
          <Component {...pageProps} />
        </AppLayer>
      </DataLayer>
      
    </>
  );
}
