import React from "react";

const WeekWeather = ({ day }) => {
  const { date, day:dayData } = day;
  const iconUrl = dayData?.condition?.icon;
  const text = dayData?.condition?.text;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "short" };
    const dateParts = date.toLocaleDateString("en-US", options).split(" ");
    const [weekday, month, day] = dateParts;
    return { weekday, month, day };
  }

  const { weekday, month, day: dayOfMonth } = formatDate(date);

  return (
    <div className="flex justify-between items-center gap-5">
    <div className="flex items-center justify-center">
      <div>
        {iconUrl && (
          <img
            src={`https:${iconUrl}`} // Add protocol to the URL if necessary
            alt="Weather Icon"
            className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[50px] lg:h-[50px]"
            
          />
        )}
      </div>
      <h1 className=" text-sm md:text-xl lg:text-base text-white font-bold">
        {dayData?.avgtemp_c}
        <span>&#176;</span>
      </h1>
    </div>
    <div className="justify-end flex text-sm md:text-xl lg:text-base w-12 md:w-24">
      <div className="text-white/30">{dayOfMonth} {month}</div>
   
    </div>
    <div className="justify-end flex text-sm  md:text-xl lg:text-base w-12 md:w-24">
      <div className=" text-white/30">{weekday} </div>
   
    </div>
  </div>
  );
};

export default WeekWeather;
