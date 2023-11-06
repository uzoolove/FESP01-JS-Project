import App from "./App";
import './index.css';
const root = document.querySelector("#root");

(async () => {
  root!.appendChild(await App());
})();
console.log("TODO App", location.href);
