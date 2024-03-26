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
