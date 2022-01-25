import logo from "../assets/sources/logo.jpg";
import { FaMoneyBill } from "react-icons/fa";

const Banner = ({ todos, salario, setSalario , formatter}) => {
  const handleSalarioHandler = ({ target }) => {
    setSalario(target.value);
  };

  const getSalario = () => {
    let numero = document.getElementById("salario_inicial");
    if (numero) {
      return Number(numero.value);
    } else {
      return 0;
    }
  };

  

  const calcularSaldo = () => {
    let total = 0;
    let salarioInicial = getSalario();
    // console.log(salarioInicial);
    total = Number(total) + Number(salarioInicial);
    todos.forEach((todo) => {
      if (todo.movimiento) {
        if (todo.movimiento === "ingreso") {
          total = Number(total) + Number(todo.cantidad);
        } else if (todo.movimiento === "gasto") {
          total = Number(total) - Number(todo.cantidad);
        }
      }
    });

    return formatter.format(total);
  };
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-3">
              <img src={logo} alt="imagen de logo" className="logo" />
            </div>
            <div className="col-md-3 align-self-center">
              <span className="app-title">Credivalores</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-md-5 row-saldo">
              <span>Saldo Inicial: </span>
              <input
                type="number"
                id="salario_inicial"
                min="1"
                step="any"
                onChange={handleSalarioHandler}
                value={salario}
                className="salarioInicial"
              />
              <FaMoneyBill className="dollar-icon right-inner-addon" />
            </div>
            <div className="col-md-5">
              <span>Saldo Final: </span>
              <input
                type="text"
                disabled
                value={calcularSaldo()}
                id="salarioFinal"
                className="salarioFinal"
              />
              <FaMoneyBill className="dollar-icon right-inner-addon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
