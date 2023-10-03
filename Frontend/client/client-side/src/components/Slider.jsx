import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { sliderItems } from '../data';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((prev) => (prev > 0 ? prev - 1 : sliderItems.length - 1));
    } else {
      setSlideIndex((prev) => (prev < sliderItems.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="w-1/12 flex items-center justify-center bg-white rounded-full absolute top-0 bottom-0 left-10 cursor-pointer opacity-50 z-10" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="w-10/12 flex transition-transform duration-500 ease-in-out transform" style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
        {sliderItems.map((item) => (
          <div className="w-screen h-screen flex items-center bg-[#${item.bg}]" key={item.id}>
            <div className="flex-1 h-full">
              <img src={item.img} alt="Slider Image" className="h-4/5 m-auto" />
            </div>
            <div className="flex-1 p-10">
              <h1 className="text-5xl font-bold">{item.title}</h1>
              <p className="mt-5 text-lg font-medium">{item.desc}</p>
              <button className="mt-5 px-6 py-2 border-2 border-gray-500 rounded-full text-lg cursor-pointer">SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/12 flex items-center justify-center bg-white rounded-full absolute top-0 bottom-0 right-10 cursor-pointer opacity-50 z-10" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;