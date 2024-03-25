import styles from "./BalanceTracker.module.css";
import { useState } from "react";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const BalanceTracker = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState(500);

  const data = [
    { name: "Entertainment", value: 300 },
    { name: "Food", value: 150 },
    { name: "Travel", value: 50 },
  ];

  const COLORS = ['#FF9304', '#A000FF', '#FDE006'];

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
      <div className={styles.walletBalance}>
        <h3 className={styles.heading}>
          Wallet Balance:{" "}
          <span className={styles.balance}>₹{walletBalance}</span>
        </h3>
        <button className={styles.addIncomeBtn}>+ Add Income</button>
      </div>
      <div className={styles.expensesContainer}>
        <h3 className={styles.heading}>
          Expenses: <span className={styles.expenses}>₹{expenses}</span>
        </h3>
        <button className={styles.addExpenseBtn}>+ Add Expense</button>
      </div>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default BalanceTracker;
