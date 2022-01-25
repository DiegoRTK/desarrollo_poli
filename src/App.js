import { useState } from "react";
import "./App.css";
// import Form from "./components/Form";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Banner from "./components/Banner";
import Registro from "./components/Registro";
import "bootstrap/dist/css/bootstrap.min.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function App() {
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [select, setSelect] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [salario, setSalario] = useState("");
  const [todosBU, setTodosBU] = useState([]);
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estadoActual, setestadoActual] = useState("");
  return (
    <>
      <div className="container-fluid">
        <div className="row banner">
          <Banner
            todos={todos}
            setTodos={setTodos}
            salario={salario}
            setSalario={setSalario}
            formatter={formatter}
          />
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-12 balance-wrapper">
            <div className="row">
              <div className="app-wrapper col-md-6">
                <div className="card border-dark">
                  <div className="card-header">
                    <strong>Registro</strong>
                  </div>
                  <Registro
                    formatter={formatter}
                    input={input}
                    setInput={setInput}
                    input1={input1}
                    setInput1={setInput1}
                    select={select}
                    setSelect={setSelect}
                    todos={todos}
                    setTodos={setTodos}
                    edit={edit}
                    setEdit={setEdit}
                    show={show}
                    setShow={setShow}
                    titulo={titulo}
                    setTitulo={setTitulo}
                    mensaje={mensaje}
                    setMensaje={setMensaje}
                    todosBU={todosBU}
                    setTodosBU={setTodosBU}
                    estadoActual={estadoActual}
                    setestadoActual={setestadoActual}
                  />
                </div>
              </div>
              <div className="app-wrapper col-md-6 ">
                <div className="card  border-dark">
                  <div>
                    <button type="button" className="counter">
                      {todos.length}
                    </button>
                    <Header />
                  </div>
                  <div>{/* <Form /> */}</div>
                  <div>
                    <TodoList
                      todos={todos}
                      setTodos={setTodos}
                      setEdit={setEdit}
                      todosBU={todosBU}
                      setTodosBU={setTodosBU}
                      estadoActual={estadoActual}
                      setestadoActual={setestadoActual}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
