import "./App.css";
import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoLists from "./components/TodoLists";
import GlobalStyle from "./ulties/globalstyle";

function App() {
  const [todoLists, setTodoLists] = useState([]);
  const [checked, setChecked] = useState(false);
  const [currentId, setCurrentId] = useState("1");
  const [displayMode, setDisplayMode] = useState("light");

  const changeDisplayMode = () => {
    if (displayMode === "light") {
      setDisplayMode("dark");
    } else {
      setDisplayMode("light");
    }
  };

  return (
    <>
      <GlobalStyle displayMode={displayMode} />
      <div className="container todo-app mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 px-5">
            <div className="row mb-3">
              <div className="col text-start text-light p-0">
                <h2>TODO</h2>
              </div>
              <div className="col text-end p-0">
                <i
                  className={
                    displayMode === "light"
                      ? "bi text-white fs-3 bi-moon-fill"
                      : "bi text-white fs-3 bi-sun-fill"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={changeDisplayMode}
                ></i>
              </div>
            </div>
            <div className="row">
              <div className="col p-0 shadow">
                <TodoInput
                  checked={checked}
                  setChecked={setChecked}
                  todoLists={todoLists}
                  setTodoLists={setTodoLists}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  displayMode={displayMode}
                />
              </div>
            </div>
            <TodoLists
              todoLists={todoLists}
              setTodoLists={setTodoLists}
              displayMode={displayMode}
            />
            <div className="row mt-3">
              <div
                className={
                  displayMode === "dark"
                    ? "col text-center text-secondary"
                    : "col text-center"
                }
                style={{ opacity: 0.8 }}
              >
                <small>Drag and drop to reorder list</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
