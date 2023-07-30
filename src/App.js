import { useState } from "react";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";

const initialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

function App() {
  const [userInput, setUserInput] = useState(initialUserInput);
  const [yearlyData, setYearlyData] = useState([]);

  const resetHandler = () => {
    setUserInput(initialUserInput);
    setYearlyData([]);
  };

  const calculateHandler = () => {
    if (userInput) {
      let newYearlyData = [...yearlyData];
      let currentSavings = +userInput["current-savings"];
      const yearlyContribution = +userInput["yearly-contribution"];
      const expectedReturn = +userInput["expected-return"] / 100;
      const duration = +userInput["duration"];

      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        newYearlyData.push({
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution,
        });
      }
      setYearlyData(newYearlyData);
    }
  };

  const isCalcDisabled = yearlyData.length > 0;
  console.log("Data", yearlyData);

  return (
    <div>
      <Header />
      <UserInput
        onCalculate={calculateHandler}
        onReset={resetHandler}
        userInput={userInput}
        setUserInput={setUserInput}
        isCalcDisabled={isCalcDisabled}
      />
      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
      )}
      {userInput && (
        <ResultsTable
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
