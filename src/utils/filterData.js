export function filterObjectsAfter1PM(array) {
  const filteredArray = array.filter((item) => {
    const dateStart = item.start.getHours();
    const isAfter1PM = dateStart >= 13;
    return isAfter1PM;
  });

  return filteredArray;
}

export function filterObjectsBefore1PM(array) {
  const filteredArray = array.filter((item) => {
    const dateStart = item.start.getHours();
    const isBefore1PM = dateStart < 13;
    return isBefore1PM;
  });

  return filteredArray;
}
