import { onLoad } from "./onLoad";
let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
export{observer}