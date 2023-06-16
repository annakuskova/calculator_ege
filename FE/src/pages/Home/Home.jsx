import { React, useState } from "react";
import { Selector } from "../../components/selects/Select";
import { Filters } from "../../components/filters/Filters";
import "./styles.css";

export const Home = () => {
  const [selectedForm, setSelectedForm] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [selectedAchiev, setSelectedAchiev] = useState([]);

  const handleSelectedFormChange = (selectedForm) => {
    setSelectedForm(selectedForm);
  };
  const handleSelectedFormatChange = (selectedFormat) => {
    setSelectedFormat(selectedFormat);
  };
  const handleSelectedAchievChange = (selectedAchiev) => {
    setSelectedAchiev(selectedAchiev);
  };

  return (
    <div className="wrapper">
      <header>Калькулятор баллов ЕГЭ</header>
      <Filters
        onSelectedFormChange={handleSelectedFormChange}
        onSelectedFormatChange={handleSelectedFormatChange}
        onSelectedAchievChange={handleSelectedAchievChange}
      />
      <Selector
        selectedForm={selectedForm}
        selectedFormat={selectedFormat}
        selectedAchiev={selectedAchiev}
      />
    </div>
  );
};

export default Home;
