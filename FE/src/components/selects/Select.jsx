import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { subjects, minScores } from "../../consts/consts";

import "./styles.css";

import { ReactComponent as AddSubject } from "../../images/icons/addSubject.svg";
import { ReactComponent as DeleteSubject } from "../../images/icons/deleteSubject.svg";

export const Selector = (selectedOptions) => {
  const navigate = useNavigate();

  const [selects, setSelects] = useState([
    { id: 1, value: null, score: null },
    { id: 2, value: null, score: null },
    { id: 3, value: null, score: null },
  ]);

  const [inputs, setInputs] = useState([
    { id: 1, value: "", score: null },
    { id: 2, value: "", score: null },
    { id: 3, value: "", score: null },
  ]);
  const [result, setResult] = useState();

  const addSelect = () => {
    const newId = selects[selects.length - 1].id + 1;
    setSelects([...selects, { id: newId, value: null, score: null }]);
    setInputs([...inputs, { id: newId, value: null, score: null }]);
  };

  const removeSelect = () => {
    if (selects.length > 3) {
      const newSelects = [...selects];
      const newInputs = [...inputs];
      newSelects.pop();
      newInputs.pop();
      setSelects(newSelects);
      setInputs(newInputs);
    }
  };

  const handleSelectChange = (value, index) => {
    const newSelects = [...selects];
    // Check if the selected value is already selected
    const isValueAlreadySelected = newSelects.some((select, i) => {
      return select.value && i !== index && select.value.value === value.value;
    });
    // If the selected value is already selected, don't update the state
    if (isValueAlreadySelected) {
      return;
    }
    newSelects[index].value = value;
    setSelects(newSelects);
  };

  const handleInputChange = (id, value) => {
    const inputValue = parseInt(value);

    if (
      value === "" ||
      (!isNaN(inputValue) &&
        inputValue > 0 &&
        inputValue <= 100 &&
        !value.includes("-"))
    ) {
      setInputs(
        inputs.map((input) => {
          if (input.id === id) {
            return { ...input, value: value };
          } else {
            return input;
          }
        })
      );
    }
  };

  const [fetchedData, setFetchedData] = useState(null);

  async function handleSum() {
    let isValid = true;
    const insufficientSubjects = [];

    selects.forEach((select, index) => {
      const selectedSubject = select.value.label;
      const subjectScore = inputs[index].value;

      if (subjectScore < minScores[selectedSubject]) {
        isValid = false;
        insufficientSubjects.push(selectedSubject);
      }
    });

    if (!isValid) {
      const errorMessage = `Недостаточно баллов для следующих предметов: ${insufficientSubjects.join(
        ", "
      )}`;
      return toast.error(errorMessage);
    }

    // Считаем сумму значений в inputs
    const sum = inputs.reduce((total, input) => total + Number(input.value), 0);

    const subjects = selects.reduce((total, select) => {
      total.push(select.value.id);
      return total;
    }, []);

    const selectedForm = selectedOptions.selectedForm.reduce(
      (total, select) => {
        total.push(select.label);
        return total;
      },
      []
    );

    const selectedFormat = selectedOptions.selectedForm.reduce(
      (total, select) => {
        total.push(select.label);
        return total;
      },
      []
    );

    const selectedAchiev = selectedOptions.selectedForm.reduce(
      (total, select) => {
        total.push(select.label);
        return total;
      },
      []
    );

    // Обновляем результат
    setResult(sum);

    // Считаем средний балл
    const mean = (sum / inputs.length).toFixed(2);

    const url = "http://192.168.1.102:8000/api/get_universities/";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Тело запроса
      body: JSON.stringify({
        total_score: sum,
        subjects: subjects,
        forms: selectedForm,
        formats: selectedFormat,
        achievs: selectedAchiev,
      }),
    };
    // Выполнение Fetch-запроса
    const res = await fetch(url, options);

    const data = await res.json();

    if (sum > 0 && mean > 0) {
      navigate("/results", {
        state: {
          result: sum,
          mean: mean,
          inputs: inputs,
          subjects: subjects,
          selectedForm: selectedForm,
          selectedFormat: selectedFormat,
          selectedAchiev: selectedAchiev,
          universities: data,
        },
      });
    }

    // console.log(data);
    // console.log(navigate("/results", { state: { result: sum, mean: mean } }));
  }

  return (
    <div className="wrapperS">
      <div className="header">
        <div className="selectHeader">Предметы</div>
        <div className="scoreHeader">Баллы</div>
      </div>
      <div className="selectWrapperS">
        <div className="selects">
          {selects.map((select, index) => (
            <div key={select.id} className="selectWrapper">
              <Select
                options={subjects}
                value={select.value}
                onChange={(value) => handleSelectChange(value, index)}
                placeholder="Выберите предмет"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: 40,
                    alignContent: "center",
                    fontSize: 14,
                    width: 200,
                  }),
                }}
              />
            </div>
          ))}
        </div>
        <div className="inputs">
          {inputs.map((input, index) => (
            <div key={input.id} className="inputDeleteWrapper">
              <input
                id={`input-${input.id}`}
                type="number"
                value={input.value}
                onChange={(event) =>
                  handleInputChange(input.id, event.target.value)
                }
                min="0"
                max="100"
                pattern="[0-9]+"
                title="Введите число от 0 до 100"
              />
              {inputs.length > 3 && index === inputs.length - 1 && (
                <button className="removeSelect" onClick={removeSelect}>
                  <DeleteSubject className="deleteSub" placeholder="delete" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="addSelectWrapper">
        <button className="addSelect" onClick={addSelect}>
          <AddSubject className="addSub" />
        </button>
      </div>
      <div className="totalScoreWrapper">
        <button id="calculate" className="calculateScore" onClick={handleSum}>
          Рассчитать
        </button>
      </div>
    </div>
  );
};

{
  /* <label htmlFor="result">Результат: </label>
        <input id="result" type="text" value={result} disabled /> */
}
