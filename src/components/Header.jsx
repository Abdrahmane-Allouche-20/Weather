import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Closed from "../assets/closed.png";
import Latitude from "../assets/latitude.png";
import LocalTime from "../assets/localtime.png";
import LOGO from "../assets/logo.png";
import Longitude from "../assets/longitude.png";
import Map from "../assets/map.png";
import { WeatherContext } from "../context/context";

function Header() {
  const {
    location,
    setLocation,
    setWeek,
    setCurrentWeather,
    search,
    setSearch,
  } = useContext(WeatherContext);
  const [ShowGoeState, setShowGoeState] = useState(false);
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (search === "") {
      setCurrentWeather({});
      setLocation({});
      setWeek({});
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function Geo() {
    if (location) {
      setShowGoeState(true);
    }
  }

  return (
    <header className="p-3  text-white shadow-lg">
      <div className="flex md:flex-row flex-col gap-2   justify-between items-center">
        <div className="flex w-full md:w-fit justify-between items-center flex-nowrap">
          <div className="flex-1 flex- flex  items-center">
            <img
              src={LOGO}
              className="h-5 w-5 md:w-12 md:h-12 lg:w-10 lg:h-10 "
              alt="logo:Clouds picture"
            />
            <span className=" text-sm md:text-2xl lg:text-xl font-bold">
              Weather Info
            </span>
          </div>
          <div className="block md:hidden">
            <button
              onClick={Geo}
              className={`
        flex gap-2 rounded-full justify-center items-center px-3 py-1 bg-red-500 `}
            >
              <FaLocationCrosshairs className="text-sm text-black" />
              <span className="capitalize text-sm  text-black font-bold">
                Geo Info
              </span>
            </button>
          </div>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full md:w-1/3 relative"
        >
          <input
            type="text"
            placeholder="Location..."
            className="rounded-lg text-black pl-9 p-2 w-full h-10 font-bold outline-none"
            value={search}
            onChange={handleChange}
          />
          <button className="absolute top-1/2 -translate-y-1/2 left-2 pr-1 border-r-2 border-black text-black">
            <FaSearch />
          </button>
        </form>

        <div className="md:block hidden">
          <button
            onClick={Geo}
            className={`flex gap-4 rounded-full justify-center items-center px-6 py-3 bg-red-500 `}
          >
            <FaLocationCrosshairs className="text-xl text-black" />
            <span className="capitalize text-xl  text-black font-bold">
              Geo Info
            </span>
          </button>
        </div>
      </div>
      {location && ShowGoeState && (
        <div className="fixed top-0 left-0 h-screen w-full bg-black/80 flex justify-center items-center">
          <div className="p-3 md:p-5 relative w-11/12 lg:w-1/2 bg-[#1e1e1e] border-2 border-white/30 rounded-xl">
            <button
              onClick={() => setShowGoeState(false)}
              className="absolute top-1 right-1"
            >
              <img
                src={Closed}
                className="w-8 h-8 md:w-14 md:h-14 lg:w-12 lg:h-12"
                alt="close button"
              />
            </button>
            <h1 className="text-center text-white font-bold text-xl md:text-3xl mt-6 lg:mt-4">
              Your Geo Information
            </h1>
            <ul className="p-1 md:p-3 flex flex-col gap-3 mt-4">
              <li className="text-sm md:text-2xl lg:text-xl text-white font-black flex justify-between items-center flex-nowrap">
                <div className=" flex  items-center">
                  <img
                    src={Latitude}
                    className="w-4 h-4 md:w-8 md:h-8   lg:w-6 lg:h-6 mr-2"
                    alt="Latitude"
                  />
                  Latitude:
                </div>
                <span className="text-white">{location?.lat}</span>
              </li>
              <li className="text-sm md:text-2xl lg:text-xl text-white font-black  flex justify-between items-center flex-nowrap">
                <div className=" flex  items-center">
                  <img
                    src={Longitude}
                    className="w-4 h-4   md:w-8 md:h-8 lg:w-6 lg:h-6 mr-2"
                    alt="Latitude"
                  />
                  Longitude:
                </div>
                <span className="text-white">{location?.lon}</span>
              </li>
              <li className="text-sm md:text-2xl lg:text-xl text-white font-black flex justify-between items-center flex-nowrap">
                <div className=" flex  items-center">
                  <img
                    src={Map}
                    className="w-4 h-4 md:w-8 md:h-8 lg:w-6 lg:h-6 mr-2"
                    alt="Latitude"
                  />
                  Location:
                </div>
                <span className="text-white">{location?.tz_id}</span>
              </li>
              <li className="text-xs md:text-2xl lg:text-xl text-white font-black flex justify-between items-center flex-nowrap">
                <div className=" flex  items-center flex-nowrap">
                  <img
                    src={LocalTime}
                    className="w-4 h-4 md:w-8 md:h-8 lg:w-6  lg:h-6 mr-2"
                    alt="Latitude"
                  />
                  Local Time:
                </div>
                <span className="text-white">{location?.localtime}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
