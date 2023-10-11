import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [clock, setClock] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-center align-middle text-center">
      <div className="carousel w-11/12 lg:w-1/2 m-4 lg:m-2">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide1"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/1100008/pexels-photo-1100008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide2"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.pexels.com/photos/2721507/pexels-photo-2721507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-3xl"
            alt="slide3"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://static.sliit.lk/wp-content/uploads/2021/07/07031851/sliit-international-section-transfer-options-Deakin-university.jpg"
            className="w-full rounded-3xl"
            alt="slide4"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col w-11/12 lg:w-1/2 m-4 lg:m-2 align-middle">
        {/* Time Section */}

        <div className="flex flex-col lg:flex-row align-middle justify-center rounded-3xl shadow gap-2 p-4">
          <div className="lg:w-1/2 w-full mb-4 font-mono font-thin text-5xl text-center mt-4 justify-center align-middle m-2 p-2">
            Current Time
          </div>
          <div className="lg:w-1/2 w-full text-center align-middle justify-center p-4">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="font-mono text-5xl">
                  {clock}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="rounded-3xl shadow mt-8 flex flex-row justify-center w-11/12 lg:w-max m-4">
          <Link to={"/onbus"}>
            <button className="btn btn-neutral m-5 rounded-3xl">
              Students On Bus
            </button>
          </Link>
          <Link to={"/testing"}>
            <button className="btn btn-neutral m-5 rounded-3xl">
              View Live
            </button>
          </Link>
        </div>

        {/* Another Section */}
        <div className="flex flex-row justify-center">
          {/* Your Profile */}
          {auth.currentUser ? (
            <div className="flex flex-col w-1/2">
              <div class="flex items-center mt-8 w-full justify-center">
                <div class="max-w-xs">
                  <div class="bg-white shadow-xl rounded-3xl py-3">
                    <div class="photo-wrapper p-2">
                      <img
                        class="w-32 h-32 rounded-full mx-auto"
                        src={auth.currentUser.photoURL}
                        alt="John Doe"
                      />
                    </div>
                    <div class="p-2">
                      <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                        {auth.currentUser.displayName}
                      </h3>
                      <div class="text-center text-gray-400 text-xs font-semibold">
                        <p>Web Developer</p>
                      </div>
                      <table class="text-xs my-3">
                        <tbody>
                          <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">
                              Address
                            </td>
                            <td class="px-2 py-2">
                              Chatakpur-3, Dhangadhi Kailali
                            </td>
                          </tr>
                          <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">
                              Phone
                            </td>
                            <td class="px-2 py-2">+977 9955221114</td>
                          </tr>
                          <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">
                              Email
                            </td>
                            <td class="px-2 py-2">{auth.currentUser.email}</td>
                          </tr>
                        </tbody>
                      </table>
                      {/* 
                              <div class="text-center my-3">
                                <a
                                  class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                                  href="#"
                                >
                                  View Profile
                                </a>
                              </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
