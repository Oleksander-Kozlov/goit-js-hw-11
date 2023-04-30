
async function fetchPictures(namePic) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '35864662-5c3b2f3ed57b7580b501bec47';


  return await fetch(
    `${BASE_URL}?key=${KEY_API}&q=${namePic}&orientation=horizontal&safesearch=true&image_type=photo`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
export {fetchPictures}