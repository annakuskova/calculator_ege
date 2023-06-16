import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardUniversities } from "../../components/cardUniversities/CardUniversities";

import "./styles.css";

export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result;
  const mean = location.state?.mean;
  const subjects = location.state?.subjects;
  const selectedForm = location.state?.selectedForm;
  const selectedFormat = location.state?.selectedFormat;
  const selectedAchiev = location.state?.selectedAchiev;
  const universities = location.state?.universities;

  const handleEnterAgain = () => {
    navigate("/");
  };

  // console.log(universities);

  return (
    <div className="wrapper">
      <header>Калькулятор баллов ЕГЭ</header>
      <div className="info">
        <div className="points">
          <p>{`Сумма баллов: ${result}`}</p>
          <p>{`Средний балл: ${mean}`}</p>
        </div>
        <div className="enter-again">
          <button className="calculateScore" onClick={handleEnterAgain}>
            Ввести заново
          </button>
        </div>
      </div>
      <div className="header">Подходящие ВУЗы:</div>
      <CardUniversities
        universities={universities}
        result={result}
        mean={mean}
        subjects={subjects}
        selectedForm={selectedForm}
        selectedFormat={selectedFormat}
        selectedAchiev={selectedAchiev}
      />
    </div>
  );
};
