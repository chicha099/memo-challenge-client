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

export function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every(element => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}