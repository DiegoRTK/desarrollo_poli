import { useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import { Modal, Button } from "react-bootstrap";
import { reverseFormatNumber } from "./utils/utils";
// const modalStyles = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
// };

const Registro = ({
  input,
  setInput,
  input1,
  setInput1,
  select,
  setSelect,
  todos,
  setTodos,
  edit,
  cancel,
  setEdit,
  todosBU,
  setTodosBU,
  show,
  setShow,
  titulo,
  setTitulo,
  mensaje,
  setMensaje,
  estadoActual,
  formatter,
}) => {
  const handleHide = () => setShow(false);

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  const handleInput1Change = ({ target }) => {
    setInput1(target.value);
  };

  const handleSelectChange = ({ target }) => {
    setSelect(target.value);
  };

  const handleSubmit = (e) => {
    // console.log(estadoActual);
    e.preventDefault();
    let salarioFinal = document.getElementById("salarioFinal").value;
    salarioFinal = reverseFormatNumber(salarioFinal, "en");
    salarioFinal = Number(salarioFinal);
    let movimientoType = select;
    if (
      (salarioFinal === "$0" || salarioFinal < input1) &&
      movimientoType === "gasto"
    ) {
      setShow(true);
      setTitulo("Error");
      setMensaje(`No cuenta con saldo suficiente, su saldo es ${formatter.format(salarioFinal)}`);
    } else {
      setShow(true);
      setTitulo("Registro exitoso");
      setMensaje(
        `El ${
          movimientoType === "gasto" ? "Gasto" : "Ingreso"
        } fue agregado con éxito`
      );
      if (edit) {
        updateTodo(edit.id, input, input1, select);
      } else {
        const newtodo = {
          id: uuid4(),
          nombre: input,
          movimiento: select,
          cantidad: input1,
        };
        setTodos([...todos, newtodo]);
        setTodosBU([...todos, newtodo]);
        setInput("");
        setInput1("");
        setSelect("");
      }
    }
  };

  const updateTodo = (id, nombre, cantidad, movimiento) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { id, nombre, cantidad, movimiento } : todo
    );
    setTodos(newTodos);
    setTodosBU(newTodos);
    setEdit(null);
  };

  useEffect(() => {
    if (edit) {
      setInput(edit.nombre);
      setInput1(edit.cantidad);
      setSelect(edit.movimiento);
    } else if (cancel) {
      setInput("");
      setInput1("");
      setSelect("");
    }
  }, [cancel, edit, setInput, setInput1, setSelect]);
  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 text-left">Tipo movimiento:</div>
          <div className="col-md-6 left-inner-addon input-container">
            <select
              className="form-select"
              name="movimiento"
              onChange={handleSelectChange}
              value={select}
              required
            >
              <option default value="">
                Selecciona un movimiento
              </option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>
          <br />
          <br />
          <div className="col-md-4 text-left">
            <label>Nombre: </label>
          </div>
          <div className="col-md-6">
            <div className="left-inner-addon input-container">
              <i className="fa fa-file-text"></i>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={handleInputChange}
                value={input}
                required
              />
            </div>
          </div>
          <br />
          <br />
          <div className="col-md-4 text-left">
            <label>Cantidad: </label>
          </div>
          <div className="col-md-6 left-inner-addon input-container">
            <i className="fa fa-usd"></i>
            <input
              min="1"
              className="form-control"
              type="number"
              name="cantidad"
              onChange={handleInput1Change}
              value={input1}
              required
            />
          </div>
        </div>
        <div className="options">
          <button className="btn btn-light cancel" type="button">
            Cancelar
          </button>
          <button className="btn btn-primary add" type="submit">
            {edit ? "Editar movimiento" : "Agregar movimiento"}
          </button>
        </div>
      </form>

      <Modal show={show}>
        <Modal.Header closeButton onClick={handleHide}>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensaje}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Registro;
