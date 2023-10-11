import React from "react";

function Card(props) {
  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-1/5">
      <div class="flex items-center mt-8 w-full justify-center">
        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-3xl py-3">
            <div class="photo-wrapper p-4">
              <img
                class="w-32 h-32 rounded-full mx-auto"
                src={props.photoUrl}
                alt="Student"
              />
            </div>
            <div class="p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                {props.displayName}
              </h3>
              <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Class: {props.className}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
