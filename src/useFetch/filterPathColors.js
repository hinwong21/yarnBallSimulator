export function filterAndReducePathColors(pathColorsTemp, isUpper) {
  const filteredPathColors = Object.keys(pathColorsTemp)
    .filter((key) => (isUpper ? key % 2 === 0 : key % 2 !== 0)) // Filter keys based on isUpper
    .reduce((acc, key) => {
      acc[key] = pathColorsTemp[key];
      return acc;
    }, {});

  // Convert object keys to an array and remove the last key
  const keysArray = Object.keys(filteredPathColors).slice(0, -1);

  // Create a new object without the last key
  const filteredPathColorsResult = keysArray.reduce((acc, key) => {
    acc[key] = filteredPathColors[key];
    return acc;
  }, {});

  return filteredPathColorsResult;
}
