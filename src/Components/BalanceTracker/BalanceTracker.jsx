import styles from "./BalanceTracker.module.css";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import AddExpense from "../AddExpense/AddExpense";
import AddIncome from "../AddIncome/AddIncome";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";

const BalanceTracker = () => {
  const [entertainmentExpenses, setEntertainmentExpenses] = useState(0);
  const [foodExpenses, setFoodExpenses] = useState(0);
  const [travelExpenses, setTravelExpenses] = useState(0);

  const {
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
  } = useContext(BalanceTrackerContext);

  useEffect(() => {
    if (localStorage.getItem("walletBalance")) {
      setWalletBalance(Number(localStorage.getItem("walletBalance")));
    } else {
      setWalletBalance(5000);
      localStorage.setItem("walletBalance", walletBalance);
    }
    if (localStorage.getItem("expenses")) {
      setExpenses(Number(localStorage.getItem("expenses")));
    } else {
      setExpenses(0);
      localStorage.setItem("expenses", expenses);
    }
    if (localStorage.getItem("expensesSummary")) {
      setExpensesSummary(JSON.parse(localStorage.getItem("expensesSummary")));
    } else {
      setExpensesSummary([]);
      localStorage.setItem("expensesSummary", JSON.stringify(expenses));
    }

    if (localStorage.getItem("entertainmentExpenses")) {
      setEntertainmentExpenses(
        Number(localStorage.getItem("entertainmentExpenses"))
      );
    } else {
      setEntertainmentExpenses(0);
      localStorage.setItem("entertainmentExpenses", entertainmentExpenses);
    }

    if (localStorage.getItem("foodExpenses")) {
      setFoodExpenses(Number(localStorage.getItem("foodExpenses")));
    } else {
      setFoodExpenses(0);
      localStorage.setItem("foodExpenses", foodExpenses);
    }

    if (localStorage.getItem("travelExpenses")) {
      setTravelExpenses(Number(localStorage.getItem("travelExpenses")));
    } else {
      setTravelExpenses(0);
      localStorage.setItem("travelExpenses", travelExpenses);
    }
  }, []);

  useEffect(() => {
    let entertainment = 0;
    let food = 0;
    let travel = 0;

    expensesSummary.forEach((expense) => {
      if (expense.category === "Entertainment") {
        entertainment += expense.price;
      }

      if (expense.category === "Food") {
        food += expense.price;
      }

      if (expense.category === "Travel") {
        travel += expense.price;
      }
    });

    setEntertainmentExpenses(entertainment);

    setFoodExpenses(food);

    setTravelExpenses(travel);
  }, [expenses, walletBalance, expensesSummary]);

  const [data, setData] = useState(
    [
      entertainmentExpenses > 0
        ? { name: "Entertainment", value: entertainmentExpenses }
        : null,
      foodExpenses > 0 ? { name: "Food", value: foodExpenses } : null,
      travelExpenses > 0 ? { name: "Travel", value: travelExpenses } : null,
    ].filter((entry) => entry !== null)
  );

  useEffect(() => {
    setData(
      [
        entertainmentExpenses > 0
          ? { name: "Entertainment", value: entertainmentExpenses }
          : null,
        foodExpenses > 0 ? { name: "Food", value: foodExpenses } : null,
        travelExpenses > 0 ? { name: "Travel", value: travelExpenses } : null,
      ].filter((entry) => entry !== null)
    );
  }, [entertainmentExpenses, foodExpenses, travelExpenses]);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", expenses);
    localStorage.setItem("expensesSummary", JSON.stringify(expensesSummary));
    localStorage.setItem("entertainmentExpenses", entertainmentExpenses);
    localStorage.setItem("foodExpenses", foodExpenses);
    localStorage.setItem("travelExpenses", travelExpenses);
  }, [
    walletBalance,
    expenses,
    expensesSummary,
    entertainmentExpenses,
    foodExpenses,
    travelExpenses,
  ]);

  const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={styles.balanceTracker}>
      <div className={styles.balanceContainer}>
        <div className={styles.walletBalance}>
          <h3 className={styles.heading}>
            Wallet Balance:{" "}
            <span className={styles.balance}>
              ₹{walletBalance.toLocaleString("en-IN")}
            </span>
          </h3>
          <button
            onClick={() => setIsAddIncomeModalOpen((isOpen) => !isOpen)}
            className={styles.addIncomeBtn}
          >
            + Add Income
          </button>
          <AddIncome />
        </div>
        <div className={styles.expensesContainer}>
          <h3 className={styles.heading}>
            Expenses:{" "}
            <span className={styles.expenses}>
              ₹{expenses.toLocaleString("en-IN")}
            </span>
          </h3>
          <button
            onClick={() => setIsAddExpenseModalOpen((isOpen) => !isOpen)}
            className={styles.addExpenseBtn}
          >
            + Add Expense
          </button>
          <AddExpense />
        </div>
      </div>
      <div className={styles.balanceChart}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#626262"
            stroke="none"
            dataKey="value"
            activeShape={null}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className={styles.indicatorsContainer}>
          <div className={styles.indicator}>
            <span className={styles.indicator1Color}></span>
            <div className={styles.indicatorName}>Food</div>
          </div>
          <div className={styles.indicator}>
            <span className={styles.indicator2Color}></span>
            <div className={styles.indicatorName}>Entertainment</div>
          </div>
          <div className={styles.indicator}>
            <span className={styles.indicator3Color}></span>
            <div className={styles.indicatorName}>Travel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTracker;
