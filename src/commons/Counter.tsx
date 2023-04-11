import { type } from "os";
import { useState, useEffect } from "react";
import axios from "axios";
import EndTime from "./alerts/EndTime";

function Counter() {
  const [contador, setContador] = useState(300); // Contador inicia en 5 minutos (300 segundos)
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [showModal, setShowModal] = useState(0);

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (contador > 0 && !reservaConfirmada) {
      intervalo = setInterval(() => {
        setContador((preContador: number) => Math.max(preContador - 1, 0));
      }, 1000);
    } else if (contador === 0 && !reservaConfirmada) {
      asyncFunction();
      setContador(300);
    }
    return () => clearInterval(intervalo);
  }, [contador, reservaConfirmada]);

  const minutosRestantes = Math.floor(contador / 60);
  const segundosRestantes = contador % 60;

  const asyncFunction = () => {
    return new Promise(function (resolve, reject) {
      setShowModal(1);
      setTimeout(() => {
        window.location.reload(); // Actualiza la página después de 2 segundos
      }, 3000);
    });
  };

  return (
    <>
      <div>
        {!reservaConfirmada ? (
          <div>
            <p>
              Quedan: {minutosRestantes < 10 ? "0" : ""}
              {minutosRestantes}:{segundosRestantes < 10 ? "0" : ""}
              {segundosRestantes}
            </p>
          </div>
        ) : null}
      </div>
      {showModal === 1 && <EndTime />}
    </>
  );
}

export default Counter;
