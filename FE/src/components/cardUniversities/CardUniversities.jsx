import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

export const CardUniversities = ({
  universities,
  result,
  mean,
  subjects,
  selectedForm,
  selectedFormat,
  selectedAchiev,
}) => {
  const [programData, setProgramData] = React.useState(null);

  const navigate = useNavigate();
  console.log(universities);

  const url = "http://192.168.1.102:8000/api/get_directions/";
  return (
    <>
      <div className="cardWrapper">
        {universities.map((info) => {
          async function handleClickShow() {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // Тело запроса
              body: JSON.stringify({
                total_score: result,
                subjects: subjects,
                forms: selectedForm,
                formats: selectedFormat,
                achievs: selectedAchiev,
                university: info.name,
              }),
            };

            setProgramData({
              result,
              mean,
              subjects,
              selectedForm,
              selectedFormat,
              selectedAchiev,
              universities,
            });

            // Выполнение Fetch-запроса
            const res = await fetch(url, options);

            const data = await res.json();
            console.log(data);
            navigate("/results/programs", {
              state: { result: result, mean: mean, data: data },
            });
          }

          return (
            <div className="card">
              <div className="nameUniversity">{info.name}</div>
              <div className="param">
                <div className="average">
                  <div className="score">
                    Средний балл: {info.avg_passing_score}
                  </div>
                  <div className="tuition_fee">
                    Средняя стоимость: {info.avg_tuition_fee} ₽
                  </div>
                </div>
                <div className="show">
                  <button className="showPrograms" onClick={handleClickShow}>
                    Посмотреть программы
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
