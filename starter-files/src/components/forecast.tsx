import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../type'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './tile'
type Propes = {
  data: forecastType
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>0</sup>
  </span>
)

const forecast = ({ data }: Propes): JSX.Element => {
  const today = data.list[0]
  console.log('data:', data)
  return (
    <>
      <div className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
        <div className="mx-auto w-[300px]">
          <section className="text-center">
            <h2 className="text-2xl font-black">
              {data.city.name}
              <span className="font-thin"> {data.city.country}</span>
            </h2>
            <h1 className="text-4xl font-extrabold">
              <Degree temp={Math.round(today.main.temp)} />
            </h1>
            <p>
              {today.weather[0].main}
              {today.weather[0].description}
            </p>
            <p className="text-sm">
              H:
              <Degree temp={Math.ceil(today.main.temp_max)} />
              L: <Degree temp={Math.floor(today.main.temp_min)} />
            </p>
          </section>
          <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
            {data.list.map((item, i) => (
              <div
                key={i}
                className="inline-block text-center w-[50px] flex-shrink-0"
              >
                <p className="text-sm">
                  {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={`weather - icon - { item.weather[0].description }`}
                />
                <p className="text-sm font-bold">
                  <Degree temp={Math.round(item.main.temp)} />
                </p>
              </div>
            ))}
          </section>
          <section className="flex flex-wrap justify-between text-zinc-700">
            <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
              <Sunrise />
              <span className="mt-2">{getSunTime(data.city.sunrise)}</span>
            </div>
            <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
              <Sunset />
              <span className="mt-2">{getSunTime(data.city.sunrise)}</span>
            </div>
            {/* wind */}
            <Tile
              icon="wind"
              title="wind"
              info={`${Math.round(today.wind.speed)}km/h`}
              description={`${getWindDirection(
                Math.round(today.wind.deg)
              )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
            />
            {/* feels like  */}
            <Tile
              icon="feels"
              title="feels like"
              info={<Degree temp={Math.round(today.main.feels_like)} />}
              description={`feels ${
                Math.round(today.main.feels_like) ? 'colder' : 'warmer'
              }`}
            />
            {/* humidity */}
            <Tile
              icon="humidity"
              title="Humidity"
              info={`${today.main.humidity}`}
              description={getHumidityValue(today.main.humidity)}
            />
            {/* pop */}
            <Tile
              icon="pop"
              title="Precipitation"
              info={`${Math.round(today.pop * 1000)}%`}
              description={`${getPop(today.pop)}, Clouds at ${
                today.clouds.all
              }%`}
            />
            {/* pressure  */}
            <Tile
              icon="Pressure"
              title="Pressure"
              info={`${today.main.pressure} hPa`}
              description={`${
                Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
              } than standard`}
            />
            {/* visivility */}
            <Tile
              icon="visibility"
              title="Visibility"
              info={`${(today.visibility / 1000).toFixed()} km`}
              description={getVisibilityValue(today.visibility)}
            />
          </section>
        </div>
      </div>
    </>
  )
}

export default forecast
