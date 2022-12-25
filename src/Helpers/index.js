const testUrl = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
export const isImageUrl = (url) => {
  return testUrl(url).then((isImage) => {
    if (isImage) {
      return true;
    } else {
      return false;
    }
  });
};