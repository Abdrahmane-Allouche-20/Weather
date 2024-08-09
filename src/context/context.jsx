import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

export default function GlobalState({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [CurrentWeather, setCurrentWeather] = useState();
  const [week, setWeek] = useState([]);
  const [location, setLocation] = useState();

  async function fetchData() {
    const apiKey = "b976d189d54740fea2e172654240408";
    setLoading(true);
    if (!search) {
      setError("Search query is empty");
      return;
    }
    try {
      const Data = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search}&days=7`
      );
      if (Data) {
        
        setCurrentWeather(Data?.data?.current);
        setLocation(Data?.data?.location);
        setWeek(Data?.data?.forecast?.forecastday);

        setLoading(false);
      } }catch (e) {
      if (error.response) {
        // Handle 4xx/5xx responses
        console.error('Error:', error.response.data);
      } else if (error.request) {
        // Handle no response received
        console.error('No response:', error.request);
      } else {
        // Handle other errors
        console.error('Error:', error.message);
    }}finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search.length >= 3) {
      // Ensure search query is sufficiently specific
      fetchData();
    }
  }, [search]);

  return (
    <WeatherContext.Provider
      value={{
        setLocation,
        setWeek,
        fetchData,
        search,
        location,
        setCurrentWeather,
        CurrentWeather,
        week,
        loading,
        error,
        setSearch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
