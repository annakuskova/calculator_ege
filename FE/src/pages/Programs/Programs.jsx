import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardUniversity } from "../../components/cardUniversity/CardUniversity";

import "./styles.css";

export const Programs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result;
  const mean = location.state?.mean;
  const data = location.state?.data;

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="wrapper">
      <header>Калькулятор баллов ЕГЭ</header>
      <div className="info">
        <div className="points">
          <p>{`Сумма баллов: ${result}`}</p>
          <p>{`Средний балл: ${mean}`}</p>
        </div>
        <div className="enter-again">
          <button className="calculateScore" onClick={handleBack}>
            Назад
          </button>
        </div>
      </div>
      <div className="title">{data[0].university}</div>
      <div className="header">Подходящие программы:</div>
      <CardUniversity data={data} />
    </div>
  );
};
