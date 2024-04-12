export function filterAndReducePathColors(pathColorsTemp) {
  const filteredPathColors = Object.keys(pathColorsTemp)
    .filter((key) => key % 2 !== 0) // Filter out keys where index is odd for lower, even for upper
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
