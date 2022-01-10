import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const darkMode = { backgroundColor: "hsl(233, 14%, 35%)", color: "white" };

const TodoLists = ({ todoLists, setTodoLists, displayMode }) => {
  const [notDoneItems, setNotDoneItems] = useState(0);
  const [selectTag, setSelectTag] = useState("All");

  //reordering items
  const reorder = (result) => {
    const copyTodoLists = [...todoLists];
    const { source, destination } = result;
    const [remove] = copyTodoLists.splice(source.index, 1);
    copyTodoLists.splice(destination.index, 0, remove);
    setTodoLists(copyTodoLists);
  };

  //clear complete
  const clearComplete = () => {
    const newTodos = todoLists.filter((item) => item.done === false);
    setTodoLists(newTodos);
  };

  //handle tag select
  const handleTagSelect = (e) => {
    setSelectTag(e.currentTarget.id);
  };

  //remove item from list
  const handleRemove = (id) => {
    const newlist = todoLists.filter((item) => item.id !== id);
    setTodoLists(newlist);
  };
  useEffect(() => {
    let count = 0;
    todoLists.forEach((element) => {
      if (!element.done) {
        count++;
      }
    });
    setNotDoneItems(count);
  }, [todoLists]);

  let showTodoLists = [];
  if (selectTag === "Active") {
    showTodoLists = todoLists.filter((item) => item.done === false);
  } else if (selectTag === "Complete") {
    showTodoLists = todoLists.filter((item) => item.done === true);
  } else {
    showTodoLists = todoLists;
  }

  return (
    <DragDropContext onDragEnd={reorder}>
      <div className="row mt-3">
        <div className="col p-0 shadow">
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="list-group"
              >
                {showTodoLists &&
                  showTodoLists.map((item, index) => (
                    <Draggable
                      key={item.id.toString()}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="list-group-item resize justify-content-between"
                          key={item.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            displayMode === "dark"
                              ? {
                                  ...provided.draggableProps.style,
                                  ...darkMode,
                                }
                              : { ...provided.draggableProps.style }
                          }
                        >
                          <div>
                            <input
                              className={
                                item.done
                                  ? "form-check-input me-3"
                                  : "form-check-input me-3"
                              }
                              style={displayMode === "dark" ? darkMode : {}}
                              type="checkbox"
                              value={item.id}
                              aria-label="..."
                              checked={item.done}
                              onChange={(e) => {
                                let checked = e.target.checked;
                                setTodoLists(
                                  todoLists.map((list) => {
                                    if (list.id === item.id) {
                                      list.done = checked;
                                    }
                                    return list;
                                  })
                                );
                              }}
                            />
                            <span className={item.done ? "done" : ""}>
                              {item.content}
                            </span>
                          </div>
                          <span
                            className="float-end"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleRemove(item.id);
                            }}
                          >
                            <i className="bi fs-4 bi-x-lg"></i>
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                <li
                  className="list-group-item d-md-flex d-none justify-content-between"
                  style={
                    displayMode === "dark"
                      ? {
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          userSelect: "none",
                          ...darkMode,
                        }
                      : {
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          userSelect: "none",
                        }
                  }
                >
                  <div>
                    <small style={{ fontSize: "0.7rem" }}>
                      {notDoneItems} items left
                    </small>
                  </div>
                  <div>
                    <ul style={{ cursor: "pointer" }}>
                      <li
                        className={
                          selectTag === "All" ? "ms-2 text-primary" : "ms-2"
                        }
                        id="All"
                        onClick={handleTagSelect}
                      >
                        <small>All</small>
                      </li>
                      <li
                        className={
                          selectTag === "Active" ? "ms-2 text-primary" : "ms-2"
                        }
                        id="Active"
                        onClick={handleTagSelect}
                      >
                        <small>Active</small>
                      </li>
                      <li
                        className={
                          selectTag === "Complete"
                            ? "ms-2 text-primary"
                            : "ms-2"
                        }
                        id="Complete"
                        onClick={handleTagSelect}
                      >
                        <small>Complete</small>
                      </li>
                    </ul>
                  </div>
                  <div style={{ cursor: "pointer" }} onClick={clearComplete}>
                    <small>Clear Completed</small>
                  </div>
                </li>
                <li
                  className="list-group-item d-md-none d-flex justify-content-between"
                  style={displayMode === "dark" ? darkMode : {}}
                >
                  <div>
                    <small
                      style={{ fontSize: "0.7rem" }}
                      className={displayMode === "light" ? "text-muted" : ""}
                    >
                      {notDoneItems} items left
                    </small>
                  </div>
                  <div
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={clearComplete}
                  >
                    <small
                      className={displayMode === "light" ? "text-muted" : ""}
                    >
                      Clear Completed
                    </small>
                  </div>
                </li>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
      <div className="row mt-3 d-md-none">
        <div className="col p-0 shadow text-center">
          <ul className="list-group" style={{ userSelect: "none" }}>
            <li
              className="list-group-item"
              style={displayMode === "dark" ? darkMode : {}}
            >
              <span
                className={
                  selectTag === "All" ? "me-4 text-primary" : "me-4 text-muted"
                }
                style={{ userSelect: "none", cursor: "pointer" }}
                onClick={handleTagSelect}
                id="All"
              >
                All
              </span>
              <span
                className={
                  selectTag === "Active"
                    ? "me-4 text-primary"
                    : "me-4 text-muted"
                }
                style={{ userSelect: "none", cursor: "pointer" }}
                onClick={handleTagSelect}
                id="Active"
              >
                Active
              </span>
              <span
                className={
                  selectTag === "Complete" ? "text-primary" : "text-muted"
                }
                style={{ userSelect: "none", cursor: "pointer" }}
                onClick={handleTagSelect}
                id="Complete"
              >
                Complete
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TodoLists;
