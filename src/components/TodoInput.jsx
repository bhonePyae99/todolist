const TodoInput = ({
  checked,
  setChecked,
  todoLists,
  setTodoLists,
  currentId,
  setCurrentId,
  displayMode,
}) => {
  const darkMode = { backgroundColor: "hsl(233, 14%, 35%)", color: "white" };
  const checkHandler = (e) => {
    setChecked(e.target.checked);
  };
  const handleInput = (e) => {
    if (e.key === "Enter") {
      setCurrentId((parseInt(currentId) + 1).toString());
      const todo = { done: checked, content: e.target.value, id: currentId };
      const copyTodoList = [...todoLists];
      copyTodoList.push(todo);
      setTodoLists(copyTodoList);
      e.target.value = "";
    }
  };
  return (
    <div className="input-group p-0">
      <div
        className="input-group-text resize border-0"
        style={displayMode === "dark" ? darkMode : {}}
      >
        <input
          className="form-check-input mt-0"
          style={displayMode === "dark" ? darkMode : {}}
          type="checkbox"
          onChange={checkHandler}
          aria-label="Checkbox for following text input"
        />
      </div>
      <input
        style={displayMode === "dark" ? darkMode : {}}
        type="text"
        className="form-control border-0"
        onKeyUp={handleInput}
        placeholder="Create a new todo..."
      />
    </div>
  );
};

export default TodoInput;
