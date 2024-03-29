import Header from "../Header/Header";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import TransactionsSummary from "../TransactionsSummary/TransactionsSummary";
import ExpenseTrackerContext from "../Contexts/ExpenseTrackerContext";

const Home = () => {
  const [expensesSummary, setExpensesSummary] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState(0);
  const [transactionToBeEditted, setTransactionToBeEditted] = useState(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [entertainmentExpenses, setEntertainmentExpenses] = useState(0);
  const [foodExpenses, setFoodExpenses] = useState(0);
  const [travelExpenses, setTravelExpenses] = useState(0);
  const [data, setData] = useState(
    [
      entertainmentExpenses > 0
        ? { name: "Entertainment", value: entertainmentExpenses }
        : null,
      foodExpenses > 0 ? { name: "Food", value: foodExpenses } : null,
      travelExpenses > 0 ? { name: "Travel", value: travelExpenses } : null,
    ].filter((entry) => entry !== null)
  );

  return (
    <>
      <Header />
      <ExpenseTrackerContext.Provider
        value={{
          expensesSummary,
          setExpensesSummary,
          walletBalance,
          setWalletBalance,
          expenses,
          setExpenses,
          transactionToBeEditted,
          setTransactionToBeEditted,
          isAddExpenseModalOpen,
          setIsAddExpenseModalOpen,
          isAddIncomeModalOpen,
          setIsAddIncomeModalOpen,
          entertainmentExpenses,
          setEntertainmentExpenses,
          foodExpenses,
          setFoodExpenses,
          travelExpenses,
          setTravelExpenses,
          data,
          setData,
        }}
      >
        <Dashboard />
        <TransactionsSummary />
      </ExpenseTrackerContext.Provider>
    </>
  );
};

export default Home;
