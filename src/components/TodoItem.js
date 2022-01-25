const getMovementClass = (movimiento) => {
  let dictionary = {
    gasto: "red",
    ingreso: "green",
  };
  return dictionary[movimiento];
};

const formatNumber = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(number);
};

const TodoItem = ({ todo, handleDelete, completed, setEdit }) => {
  return (
    <ul className="p-2" >
      {/* <button className="button-complete material-icons" onClick={() => completed(todo)}>
        check
        </button> */}
      <button
        className="button-delete material-icons"
        onClick={() => handleDelete(todo)}
      >
        clear
      </button>
      <button
        className="button-complete material-icons"
        onClick={() => setEdit(todo)}
      >
        edit
      </button>
      <input
        type="text"
        value={todo.nombre}
        disabled
        className={`nombre ${todo.nombre}`}
        onChange={(e) => e.preventDefault}
      />
      <input
        type="text"
        disabled
        value={formatNumber(todo.cantidad)}
        className={`${getMovementClass(todo.movimiento)} redondear text-center`}
        onChange={(e) => e.preventDefault}
      />
      <div></div>
    </ul>
  );
};

export default TodoItem;
