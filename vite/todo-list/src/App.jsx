import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [Todo, setTodo] = useState("");





  const [Finished, setFinished] = useState(false)


  const [REALtodo, setREALtodo] = useState(() => {
    const savedTodos = localStorage.getItem("REALtodo");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("REALtodo", JSON.stringify(REALtodo));
  }, [REALtodo]);

  const HandelTodo = (e) => {
    setTodo(e.target.value);
  };

  const Handlesbt = () => {
    if (Todo.trim() === "") return;

    setREALtodo([
      ...REALtodo,
      {
        id: Date.now(),
        todo: Todo,
        Tick: false,
        edit: false,
      },
    ]);

    setTodo("");
  };

  const tickhandle = (id) => {
    setREALtodo(
      REALtodo.map((item) =>
        item.id === id
          ? { ...item, Tick: !item.Tick }
          : item
      )
    );
  };







  const deletetodo = (id) => {
    setREALtodo(
      REALtodo.filter((item) => item.id !== id)
    );


  };

  const [EditedTodo, setEditedTodo] = useState("")

  const handleedit = (e) => {

    setEditedTodo(e.target.value)

  }
  const Edittodo = (id) => {
    const currentTodo = REALtodo.find(item => item.id === id);

    if (!currentTodo.edit) {
      setEditedTodo(currentTodo.todo);

      setREALtodo(
        REALtodo.map(item =>
          item.id === id
            ? { ...item, edit: true }
            : item
        )
      );
    }
      else {
    setREALtodo(
      REALtodo.map(item =>
        item.id === id
          ? {
              ...item,
              todo: EditedTodo,
              edit: false
            }
          : item
      )
    );
  }
};


return (
  <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-purple-300 flex justify-center items-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[45%] h-[90vh] overflow-y-auto">

      {/* Heading */}
      <div className="sticky top-0 bg-white rounded-t-2xl border-b p-5 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700">
          📝 DoIT - Manage your Todo
        </h1>
      </div>

      <div className="p-5">

        {/* Add Todo */}
        <h2 className="font-semibold text-lg mb-3">
          Add Todo
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            value={Todo}
            onChange={HandelTodo}
            placeholder="Enter Todo"
            className="flex-1 border-2 border-purple-300 rounded-xl p-3 outline-none focus:border-purple-600"
          />

          <button
            onClick={Handlesbt}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-3 transition"
          >
            Save
          </button>

        </div>

        {/* Show Finished */}
        <div className="flex items-center gap-3 mt-6">

          <svg
            onClick={() => setFinished(!Finished)}
            fill="#fff"
            className={`${
              Finished ? "bg-green-500" : "bg-gray-400"
            } rounded w-6 cursor-pointer`}
            viewBox="0 0 1024 1024"
          >
            <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
          </svg>

          <span className="font-medium">
            Show Finished
          </span>

        </div>

        <hr className="my-6" />

        <h3 className="font-semibold text-lg mb-5">
          Your Todos
        </h3>

        {REALtodo.length === 0 ? (
          <p className="text-gray-500 text-center">
            No Todos Available
          </p>
        ) : (
          REALtodo
            .filter((item) =>
              Finished ? item.Tick : !item.Tick
            )
            .map((item) => (
              <div
                key={item.id}
                className="bg-purple-50 rounded-xl shadow p-4 mb-4"
              >

                <div className="flex justify-between items-start gap-3">

                  <div className="flex gap-3 flex-1">

                    <svg
                      fill="#fff"
                      onClick={() => tickhandle(item.id)}
                      className={`${
                        item.Tick
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } rounded w-6 h-6 cursor-pointer flex-shrink-0`}
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                    </svg>

                    <div className="flex-1">

                      {item.edit ? (
                        <input
                          value={EditedTodo}
                          onChange={handleedit}
                          className="w-full border rounded-lg p-2"
                        />
                      ) : (
                        <p
                          className={`break-words ${
                            item.Tick
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {item.todo}
                        </p>
                      )}

                    </div>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">

                  <button
                    onClick={() => Edittodo(item.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition"
                  >
                    {item.edit ? "Save" : "Edit"}
                  </button>

                  <button
                    onClick={() => deletetodo(item.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
        )}
      </div>
    </div>
  </div>
);
  }

  export default App;