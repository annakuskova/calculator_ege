import React, { useState } from "react";

export function SumInputs() {
  const [inputs, setInputs] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ]);
  const [result, setResult] = useState("");

  const handleInputChange = (id, value) => {
    // Обновляем значение в inputs по id
    setInputs(
      inputs.map((input) => {
        if (input.id === id) {
          return { ...input, value };
        } else {
          return input;
        }
      })
    );
  };

  const handleSum = () => {
    // Считаем сумму значений в inputs
    const sum = inputs.reduce((total, input) => total + Number(input.value), 0);

    // Обновляем результат
    setResult(sum);
  };

  return (
    <div>
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={`input-${input.id}`}>Введите число {input.id}:</label>
          <input
            id={`input-${input.id}`}
            type="number"
            value={input.value}
            onChange={(event) =>
              handleInputChange(input.id, event.target.value)
            }
          />
        </div>
      ))}
      <br />
      <button onClick={handleSum}>Посчитать сумму</button>
      <br />
      <br />
      <label htmlFor="result">Результат: </label>
      <input id="result" type="text" value={result} disabled />
    </div>
  );
}

export default SumInputs;
