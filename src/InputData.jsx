/* eslint-disable react/prop-types */

import { useState } from "react";

function handleClick(inputValue, setList, setInputValue, setErrorMessage) {
  if (inputValue.trim() === "") {
    setErrorMessage("Please enter a task!");
  } else {
    setList((prevList) => [...prevList, { text: inputValue, completed: false }]);
    setErrorMessage("");
    setInputValue("");
  }
}

function InputData({ setList }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex flex-col w-full mb-4 md:mb-5">
      <div className="flex flex-col md:flex-row w-full">
        <input
          type="text"
          placeholder="Add your task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-2 md:mb-0 md:mr-2"
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
          onClick={() =>
            handleClick(inputValue, setList, setInputValue, setErrorMessage)
          }
        >
          Add Task ✍️
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputData;
