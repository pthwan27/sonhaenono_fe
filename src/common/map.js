export function getMapInfo(map) {
  let level = map.getLevel();
  let center = map.getCenter();
  let bounds = map.getBounds();

  let swLatLng = bounds.getSouthWest();
  let neLatLng = bounds.getNorthEast();

  return {
    level,
    cLat: center.getLat(),
    cLng: center.getLng(),
    swLat: swLatLng.getLat(),
    swLng: swLatLng.getLng(),
    neLat: neLatLng.getLat(),
    neLng: neLatLng.getLng(),
  };
}

export function getPyungsu(value) {
  value = parseFloat(value);
  if (isNaN(value)) return;
  return parseInt((value / 3300) * 1000);
}
