import TodoItem from "./TodoItem";
import { useReducer } from "react";

const TodoList = ({
  todos,
  setTodos,
  setEdit,
  todosBU,
  estadoActual,
  setestadoActual,
}) => {
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // console.log(todos,todosBU)
  const reducer = (state = todos, action) => {
    setTodos(todosBU);
    todos = todosBU;
    if (action.type === "ingreso") {
      setTodos(todos.filter((row) => row.movimiento === "ingreso"));
      setestadoActual(action.type);
    } else if (action.type === "gasto") {
      setestadoActual(action.type);
      setTodos(todos.filter((row) => row.movimiento === "gasto"));
    } else if (action.type === "all") {
      setestadoActual(action.type);
      setTodos(todosBU);
    } else if (action.type === "filter_keyup") {
      setTodos(
        todos.filter((todo) => {
          if (estadoActual === "gasto" || estadoActual === "ingreso") {
            return (
              todo.nombre.toLowerCase().includes(action.query.toLowerCase()) &&
              todo.movimiento.toLowerCase().includes(estadoActual)
            );
          } else if (estadoActual === "all") {
            return todo.nombre
              .toLowerCase()
              .includes(action.query.toLowerCase());
          } else {
            return todo.nombre
              .toLowerCase()
              .includes(action.query.toLowerCase());
          }
        })
      );
    }
  };

  const [state, dispatch] = useReducer(reducer, todos);

  const filterText = (e) => {
    dispatch({ type: "filter_keyup", query: e.target.value });
  };
  return (
    <>
      <div className="header-options">
        <input type="text" className="filtrador" onChange={filterText} />
        <div className="form-check form-check-inline">
          <input
            onClick={() => dispatch({ type: "all" })}
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Todos
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            onClick={() => dispatch({ type: "ingreso" })}
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Ingresos
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            onClick={() => dispatch({ type: "gasto" })}
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Gastos
          </label>
        </div>
      </div>
      <li className="list-item">
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              setEdit={setEdit}
            />
          ))}
        </div>
      </li>
    </>
  );
};

export default TodoList;
