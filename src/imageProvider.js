import imgClear from "./assets/clear-bg.jpg";
import imgCloudy from "./assets/cloudy-bg.jpg";
import imgFog from "./assets/fog-bg.jpg";
import imgRainy from "./assets/rainy-bg.jpg";
import imgSnowy from "./assets/snowy-bg.jpg";
import imgSunny from "./assets/sunny-bg.jpg";

const WeatherCodes = {
  Sunny: [1000], //Clear at night
  Cloudy: [1003, 1006, 1009, 1087],
  Fog: [1030, 1135, 1147],
  Rainy: [
    1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
    1273, 1276,
  ],
  Snowy: [
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258,
    1261, 1264, 1279, 1282, 1069, 1072, 1168, 1171, 1198, 1201, 1204, 1207,
    1249, 1252,
  ],
};

const imageProvider = (code, isDay) => {
  if (WeatherCodes.Sunny.includes(code))
    return isDay === 1 ? imgSunny : imgClear;
  if (WeatherCodes.Cloudy.includes(code)) return imgCloudy;
  if (WeatherCodes.Fog.includes(code)) return imgFog;
  if (WeatherCodes.Rainy.includes(code)) return imgRainy;
  if (WeatherCodes.Snowy.includes(code)) return imgSnowy;
};

export default imageProvider;
