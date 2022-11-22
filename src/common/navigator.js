export function getMySpot(customOptions) {
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
    ...customOptions,
  };
  return new Promise((resolve, reject) => {
    function success(pos) {
      let crd = pos.coords;
      resolve({
        lat: crd.latitude,
        lng: crd.longitude,
      });
    }
    function error(err) {
      reject(err);
    }
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      reject(new Error("지원하지 않는 부라우저입니다."));
    }
  });
}

export default {
  getMySpot,
};
