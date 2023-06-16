import React from "react";

import { subjects as consts } from "../../consts/consts";

import "./styles.css";

export const CardUniversity = ({ data }) => {
  return (
    <div className="cardWrapper">
      {data.map((info) => {
        const handleClickDetails = () => {
          console.log(info);
          window.open(info.link);
        };
        if (info.passing_score) {
          return (
            <div className="card">
              <div className="firstRow">
                <div className="nameUniversity">{info.name}</div>
                <div className="probability">
                  {info.chance !== -1
                    ? `Вероятность поступления: ${info.chance}`
                    : ""}
                </div>
              </div>
              <div className="secondRow">
                <div className="code">
                  {info.code} {info.name}
                </div>
                <div className="subjects">
                  ЕГЭ: {consts[info.subjects[0] - 1].label},{" "}
                  {consts[info.subjects[1] - 1].label},{" "}
                  {consts[info.subjects[2] - 1].label}
                </div>
              </div>
              <div className="thirdRow">
                <div className="info">
                  <div className="coast">
                    <b>Стоимость:</b> от {info.tuition_fee} ₽
                  </div>
                  <div className="budget">
                    <b>Бюджет:</b> {info.budget_seats} мест
                  </div>
                  <div className="paid">
                    <b>Платное:</b> {info.paid_seats} мест
                  </div>
                  <div className="format">
                    <b>Форма обучения:</b> {info.form}
                  </div>
                  <div className="format">
                    <b>Проходной балл: </b>{" "}
                    {info.passing_score ? info.passing_score : "  –"}
                  </div>
                </div>
                <div className="show">
                  <button
                    className="showProgramsU"
                    onClick={handleClickDetails}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
