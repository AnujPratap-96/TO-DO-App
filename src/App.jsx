import { useState, useEffect } from "react";
import InputData from "./InputData";

function GetData() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(GetData());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  const handleComplete = (indexToComplete) => {
    setList(
      list.map((item, index) =>
        index === indexToComplete
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const handleRemove = (indexToRemove) => {
    setList(list.filter((_, index) => index !== indexToRemove));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(list[index].text);
  };

  const handleUpdate = (index) => {
    setList(
      list.map((item, i) => (i === index ? { ...item, text: editText } : item))
    );
    setEditingIndex(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 md:mb-6">
          TODO APP ✍️
        </h1>
        <div className="mb-4 md:mb-5">
          <InputData setList={setList} />
        </div>

        {list.length === 0 ? (
          <h1 className="text-center text-gray-500">No Items</h1>
        ) : (
          <div className="space-y-3">
            {list.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-md p-3 shadow-sm"
              >
                {editingIndex === index ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full md:w-[60%] px-4 py-2 border-2 border-gray-300 rounded-md"
                    />
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleUpdate(index)}
                    >
                      Save ✔️
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded-md"
                      onClick={handleCancel}
                    >
                      Cancel ✖️
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <span
                      className={`text-lg font-medium flex-grow ${
                        item.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.text}
                    </span>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <button
                        className={`border border-green-500 px-3 py-1 rounded ${
                          item.completed
                            ? "bg-green-500 text-white"
                            : "bg-white text-green-500"
                        }`}
                        onClick={() => handleComplete(index)}
                      >
                        {item.completed ? "Undo 🔀" : "Completed ✅"}
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 font-bold border border-blue-500 hover:border-blue-700 rounded px-3 py-1"
                        onClick={() => handleEdit(index)}
                      >
                        Edit ✍️
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-bold border border-red-500 hover:border-red-700 rounded px-3 py-1"
                        onClick={() => handleRemove(index)}
                      >
                        Remove ❌
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
