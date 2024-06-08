import { ChangeEvent, useEffect, useState } from 'react'
import { optionType, forecastType } from '../type'

const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [city, setCity] = useState<optionType | null>(null)
  const [options, setOptions] = useState<[]>([])
  const [forecast, setForecast] = useState<forecastType | null>(null)

  const getSearchOption = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=${5}&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log(setOptions(data)))
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTerm(value)

    if (value === '') return
    getSearchOption(value)
  }
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        {
          const getForecastdata = {
            ...data.city,
            list: data.list.slice(0, 16),
          }
        }

        setForecast(data)
      })
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name.toString())
      setOptions([])
    }
  }, [city])
  return { term, options, forecast, onInputChange, onOptionSelect, onSubmit }
}

export default useForecast
