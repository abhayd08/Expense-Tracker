import Header from "../Header/Header";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import TransactionsSummary from "../TransactionsSummary/TransactionsSummary";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";

const Home = () => {
  const [expensesSummary, setExpensesSummary] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState(0);
  const [transactionToBeEditted, setTransactionToBeEditted] = useState(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);

  return (
    <>
      <Header />
      <BalanceTrackerContext.Provider
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
        }}
      >
        <Dashboard />
        <TransactionsSummary />
      </BalanceTrackerContext.Provider>
    </>
  );
};

export default Home;
