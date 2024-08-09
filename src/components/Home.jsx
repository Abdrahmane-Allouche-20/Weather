import { useContext } from "react";
import {
  FaCalendarAlt,
  FaRegMoon,
  FaRegSun,
  FaTemperatureHigh,
  FaWind,
} from "react-icons/fa";
import Error from '../assets/error.gif'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdWater } from "react-icons/io";
import { LuWaves } from "react-icons/lu";
import { MdOutlineVisibility } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css";
import PuffLoader from "react-spinners/PuffLoader";
import Searching from "../assets/searching.gif";
import { WeatherContext } from "../context/context"; // Adjust the import path as needed
import "./Home.css";
import WeekWeather from "./WeekWeather";

const Home = () => {
  const { search, location, CurrentWeather, week, loading, error } =
    useContext(WeatherContext);
  const sunrise = week[0]?.astro?.sunrise;
  const sunset = week[0]?.astro?.sunset;

  const FormatHours = (Hours) => {
    const suffix = Hours >= 12 ? Hours + " " + "PM" : Hours + " " + "AM";
    return suffix;
  };
  const HoursIconsTemp = week[0]?.hour?.map((item) => {
    const Hours24 = parseInt(item.time.split(" ")[1].split(":")[0]);
    return {
      hour: FormatHours(Hours24),
      icon: item?.condition?.icon,
      temp: item?.temp_c,
    };
  });

  if (loading)
    return (
      <div className="flex flex-col gap-7 justify-center items-center mt-10">
        <h1 className="text-center text-lg md:text-3xl text-white font-bold">
          Data is loading please wait ...
        </h1>
        <PuffLoader
          color="#e70000"
          cssOverride={{}}
          size={100}
          speedMultiplier={1}
        />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center mt-5 flex-col">
        <p className="text-red-600 text-center text-xl font-black md:text-4xl">
          Error: {error.message || "Something went wrong"}
        </p>
        <div className="flex justify-center item-center">
          <img src={Error} className="w-[400px]" />
        </div>
      </div>
    );

  const iconUrl = CurrentWeather?.condition?.icon;
  const text = CurrentWeather?.condition?.text;
  const time = CurrentWeather?.last_updated;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className="max-w-6xl mx-auto my-3">
      <div>
        {search != "" ? (
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="w-full lg:basis-1/3">
                <div className="p-3 md:p-6 lg:p-5 bg-[#1e1e1e] shadow-lg shadow-[#2b2b2b] rounded-2xl">
                  <h1 className="text-white text-xl md:text-3xl lg:text-2xl font-black">
                    Now
                  </h1>
                  <div className="border-b-2 border-white/30 mb-2">
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <h1 className="text-3xl md:text-5xl text-white font-black">
                          {CurrentWeather?.temp_c}
                          <span>&#176;</span>
                        </h1>
                      </div>
                      <div>
                        {iconUrl && (
                          <img
                            src={`https:${iconUrl}`} // Added protocol to the URL
                            alt="Weather Icon"
                            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[80px] lg:h-[80px]"
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-lg md:text-2xl lg:text-xl text-white font-bold block my-3">
                      {text}
                    </p>
                  </div>
                  <ul>
                    <li className="flex gap-3 items-center mb-2">
                      <FaCalendarAlt className="text-white/30 text-base md:text-lg" />
                      <p className=" text-base md:text-xl lg:text-lg text-white/30 font-bold">
                        {formatDate(time)}
                      </p>
                    </li>
                    <li className="flex gap-3 items-center">
                      <FaLocationDot className="text-white/30 text-base md::text-lg" />
                      <p className=" text-base md:text-xl lg:text-lg text-white/30 font-bold">
                        {`${location?.name}${
                          location?.region ? `, ${location?.region}` : ""
                        }, ${location?.country}`}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <h1 className="lg:ml-0 ml-2 my-2 text-white font-black text-lg md:text-3xl lg:text-2xl">
                Weekly Weather :
              </h1>
              <div className="w-full lg:basis-1/3">
                <div className="md:p-1 p-2 lg:p-2 bg-[#1e1e1e] shadow-lg shadow-[#2b2b2b] rounded-2xl">
                  <ul className="weekly scrollBar">
                    {week && week.length > 0
                      ? week.map((day, index) => (
                          <li key={index} className="p-2 lg:p-2 w-full">
                            <WeekWeather day={day} />
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <div className="p-3 md:p-5 bg-[#1e1e1e] shadow-lg w-full shadow-[#2b2b2b] rounded-2xl">
                <h1 className="text-white text-lg md:text-2xl font-extrabold">
                  Todays Highlights:
                </h1>
                <div className="flex flex-col lg:flex-row justify-between gap-3 mt-3">
                  <div className="flex flex-1 flex-col">
                    <div className="flex-1 p-2 md:p-3 bg-[#141414] rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-base md:text-xl lg:text-lg text-white/30 font-bold">
                          Air Quality Index
                        </span>
                        <span className="px-2 md:px-3 py-0.5 font-semibold bg-green-400 rounded-full text-sm md:text-lg lg:text-base text-white">
                          Good
                        </span>
                      </div>
                      <ul className="flex justify-between md:justify-around lg:justify-between gap-2 items-center mt-6">
                        <li className="text-2xl md:text-5xl lg:text-4xl text-white">
                          <FaWind />
                        </li>
                        <li className="text-center">
                          <p className="text-[10px] md:text-lg lg:text-sm font-bold text-white block mb-1 lg:mb-2">
                            Speed
                          </p>
                          <span className="text-[12px] md:text-xl lg:text-base font-bold text-white">
                            {CurrentWeather?.wind_kph} kph
                          </span>
                        </li>
                        <li className="text-center">
                          <p className="text-[10px]  md:text-lg lg:text-sm font-bold text-white block  mb-1 lg:mb-2">
                            Gust
                          </p>
                          <span className="text-[12px] md:text-xl lg:text-base font-bold text-white">
                            {CurrentWeather?.gust_kph} kph
                          </span>
                        </li>
                        <li className="text-center">
                          <p className="text-[10px]  md:text-lg lg:text-sm font-bold text-white block  mb-1 lg:mb-2">
                            Chill
                          </p>
                          <span className="text-[12px] md:text-xl lg:text-base font-bold text-white">
                            {CurrentWeather?.windchill_c}
                            <span>&#176;</span>C
                          </span>
                        </li>
                        <li className="text-center">
                          <p className="text-[10px]  md:text-lg lg:text-sm font-bold text-white block  mb-1 lg:mb-2">
                            Direction
                          </p>
                          <span className="text-[12px] md:text-xl lg:text-base font-bold text-white">
                            {CurrentWeather?.wind_dir}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between gap-4 mt-4">
                      <div className="p-2 md:p-4 lg:p-3 flex-1 bg-[#141414] rounded-xl">
                        <h1 className="text-sm md:text-2xl lg:text-lg font-bold text-white/40">
                          Humidity:
                        </h1>
                        <div className="flex justify-between md:justify-around lg:justify-between items-center mt-3">
                          <div>
                            <IoMdWater className="text-xl md:text-4xl lg:text-3xl text-white/40" />
                          </div>
                          <div>
                            <h1 className="text-base md:text-3xl lg:text-xl text-white/40 font-bold">
                              {CurrentWeather?.humidity}%
                            </h1>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 md:p-4 lg:p-3 flex-1 bg-[#141414] rounded-xl">
                        <h1 className="text-sm md:text-2xl lg:text-lg font-bold text-white/40">
                          Pressure :
                        </h1>
                        <div className="flex justify-between md:justify-around lg:justify-between items-center mt-3">
                          <div>
                            <LuWaves className="text-xl  md:text-4xl lg:text-3xl text-white/40" />
                          </div>
                          <div>
                            <h1 className="text-base  md:text-3xl lg:text-xl text-white/40 font-bold">
                              {CurrentWeather?.pressure_in}hPa
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex-1 p-2 md:p-4 lg:p-3 bg-[#141414] rounded-xl">
                      <span className="text-base md:text-2xl lg:text-lg text-white/30 font-bold">
                        Sunrise & Sunset
                      </span>

                      <ul className="flex justify-between md:justify-around lg:justify-between gap-2 items-center mt-6">
                        <li className="  text-white/30 flex justify-between  gap-1.5 md:gap-4 lg:gap-3  items-center">
                          <span className=" text-2xl md:text-5xl lg:text-4xl">
                            <FaRegSun />
                          </span>
                          <span className="text-lg md:text-3xl lg:text-2xl">
                            {sunrise}
                          </span>
                        </li>
                        <li className=" text-white/30 flex justify-between gap-1.5 md:gap-4 lg:gap-3 items-center">
                          <span className=" text-2xl md:text-5xl lg:text-4xl">
                            <FaRegMoon />
                          </span>
                          <span className="text-lg md:text-3xl lg:text-2xl">
                            {sunset}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between gap-4 mt-4">
                      <div className="p-2 md:p-4 lg:p-3 flex-1 bg-[#141414] rounded-xl">
                        <h1 className="text-base md:text-2xl lg:text-lg font-bold text-white/40">
                          Visibility:
                        </h1>
                        <div className="flex justify-between md:justify-around lg:justify-between items-center mt-3 md:mt-5 lg:mt-3">
                          <div>
                            <MdOutlineVisibility className="text-xl md:text-4xl lg:text-3xl mt-1 text-white/40" />
                          </div>
                          <div>
                            <h1 className="text-base md:text-2xl lg:text-xl text-white/40 font-bold">
                              {CurrentWeather?.vis_km}Km
                            </h1>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 md:p-4 lg:p-3 flex-1 bg-[#141414] rounded-xl">
                        <h1 className="text-base  md:text-2xl lg:text-lg font-bold text-white/40">
                          Feels Like :
                        </h1>
                        <div className="flex justify-between md:justify-around lg:justify-between items-center mt-3 md:mt-5 lg:mt-3">
                          <div>
                            <FaTemperatureHigh className="text-xl md:text-4xl lg:text-3xl text-white/40" />
                          </div>
                          <div>
                            <h1 className="text-base  md:text-2xl lg:text-xl text-white/40 font-bold">
                              {CurrentWeather?.feelslike_c} <span>&#176;</span>C
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="lg:ml-0 my-2 ml-2 text-lg md:text-3xl lg:text-2xl text-white font-black">
                Today At:
              </h1>

              <div className="slider-container mx-auto w-[240px] md:w-[750px] lg:w-[800px] overflow-hidden flex-1">
                <ul className="slider-list">
                  {HoursIconsTemp && HoursIconsTemp.length > 0
                    ? HoursIconsTemp.map((item, index) => (
                        <li key={index} className=" bg-[#1e1e1e] slider-item">
                          <div>
                            <h1 className="nowrap text-white text-base md:text-2xl lg:text-xl font-bold">
                              {item.hour}
                            </h1>
                            <div className="flex justify-center items-center my-2">
                              <img
                                key={index}
                                src={`https:${item.icon}`}
                                alt="Weather Icon"
                                className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] lg:w-[80px] lg:h-[80px]"
                              />
                            </div>
                            <h1 className="nowrap text-white text-base  md:text-2xl  lg:text-xl font-bold">
                              {item.temp} <span>&#176;</span>C
                            </h1>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-xl text-center md:text-3xl capitalize text-white font-black">
              grave the weather wisdom by searching
            </h1>

            <div className="flex justify-center items-center">
              <img src={Searching} alt="" className="w-1/2 md:w-2/3" />
            </div>
            <h1 className="text-xl md:text-3xl capitalize text-white font-black">
              SEARCH PLEASE
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
