import { React } from "react";
import Select from "react-select";
import "./styles.css";

import { form, format, achiev } from "../../consts/consts";

export const Filters = ({
  onSelectedFormChange,
  onSelectedFormatChange,
  onSelectedAchievChange,
}) => {
  const handleFormChange = (selectedOptions) => {
    onSelectedFormChange(selectedOptions);
  };

  const handleFormatChange = (selectedOptions) => {
    onSelectedFormatChange(selectedOptions);
  };

  const handleAcvievChange = (selectedOptions) => {
    onSelectedAchievChange(selectedOptions);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: 40,
      alignContent: "center",
      fontSize: 14,
      width: 270,
      flexWrap: "nowrap",
    }),
    multiValue: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "80%", // Максимальная ширина выбранных значений
    }),
  };

  return (
    <div className="filtersWrapper">
      <Select
        isMulti
        options={form}
        onChange={handleFormChange}
        placeholder="Форма обучения"
        styles={customStyles}
      />
      <Select
        isMulti
        options={format}
        onChange={handleFormatChange}
        placeholder="Формат обучения"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: 40,
            alignContent: "center",
            fontSize: 14,
            width: 270,
          }),
        }}
      />
      <Select
        isMulti
        options={achiev}
        onChange={handleAcvievChange}
        placeholder="Индивидуальные достижения"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: 40,
            alignContent: "center",
            fontSize: 14,
            width: 270,
          }),
        }}
      />
    </div>
  );
};
