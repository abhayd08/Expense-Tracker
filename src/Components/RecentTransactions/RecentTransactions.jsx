import { useContext, useState, useEffect } from "react";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";
import styles from "./RecentTransactions.module.css";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaGift } from "react-icons/fa6";
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const RecentTransactions = () => {
  const {
    expensesSummary,
    setExpensesSummary,
    setWalletBalance,
    setExpenses,
    transactionToBeEditted,
    setTransactionToBeEditted,
    setIsAddExpenseModalOpen,
  } = useContext(BalanceTrackerContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(3);
  const [currentItems, setCurrentItems] = useState(
    expensesSummary
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 3)
  );
  const [maxPagesAllowed, setMaxPagesAllowed] = useState(
    Math.floor((expensesSummary.length - 1) / 3)
  );

  useEffect(() => {
    setCurrentItems(expensesSummary.slice(0, 3));
    setStartingIndex(0);
    setEndingIndex(3);
    setCurrentPage(1);
    setMaxPagesAllowed(Math.floor((expensesSummary.length - 1) / 3));
  }, [expensesSummary]);

  useEffect(() => {
    setCurrentItems(
      expensesSummary
        .sort((a, b) => {
          if (new Date(a.date) === new Date(b.date)) {
            return new Date(b.time) - new Date(a.time);
          } else {
            return new Date(b.date) - new Date(a.date);
          }
        })
        .slice(startingIndex, endingIndex)
    );
  }, [currentPage, startingIndex, endingIndex, expensesSummary]);

  return (
    <div className={styles.container}>
      {currentItems.length < 1 ? (
        <h6 className={styles.altText}>
          You have not done any transactions yet.
        </h6>
      ) : (
        currentItems.map((expense) => {
          return (
            <div key={expense.id}>
              <div className={styles.expenseContainer}>
                <div className={styles.section1}>
                  {expense.category === "Entertainment" ? (
                    <FaGift
                      style={{
                        padding: "0.7rem",
                        background: "#D9D9D9",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  ) : expense.category === "Food" ? (
                    <IoFastFoodOutline
                      style={{
                        padding: "0.7rem",
                        background: "#D9D9D9",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  ) : (
                    <FaSuitcaseRolling
                      style={{
                        padding: "0.7rem",
                        background: "#D9D9D9",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  )}
                  <div className={styles.details}>
                    <h5 className={styles.expenseName}>{expense.title}</h5>
                    <h6 className={styles.date}>
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h6>
                  </div>
                </div>
                <div className={styles.section2}>
                  <span className={styles.expensePrice}>₹{expense.price}</span>
                  <div className={styles.controls}>
                    <button
                      className={styles.btns}
                      onClick={() => {
                        setExpensesSummary((prevSummary) => {
                          const newSummary = [...prevSummary];
                          newSummary.splice(prevSummary.indexOf(expense), 1);
                          return newSummary;
                        });
                        setWalletBalance(
                          (prevBalance) => prevBalance + expense.price
                        );
                        setExpenses(
                          (prevExpenses) => prevExpenses - expense.price
                        );
                      }}
                    >
                      <MdDelete
                        style={{
                          padding: "0.7rem",
                          width: "20px",
                          height: "20px",
                          borderRadius: "15px",
                          fontSize: "1rem",
                          backgroundColor: "#f31260",
                          color: "white",
                        }}
                      />
                    </button>
                    <button
                      onClick={() => {
                        setTransactionToBeEditted(expense.id);
                        setIsAddExpenseModalOpen(true);
                      }}
                      className={styles.btns}
                    >
                      <GrEdit
                        style={{
                          padding: "0.7rem",
                          width: "20px",
                          height: "20px",
                          borderRadius: "15px",
                          fontSize: "1rem",
                          backgroundColor: "yellow",
                          color: "#f31260",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.divider}></div>
            </div>
          );
        })
      )}
      <div className={styles.paginationControls}>
        <FaArrowAltCircleLeft
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prevPage) => prevPage - 1);
              setStartingIndex((prevIndex) => prevIndex - 3);
              setEndingIndex((prevIndex) => prevIndex - 3);
            }
          }}
          style={{
            width: "37px",
            height: "37px",
            cursor: "pointer",
          }}
        />
        <div className={styles.pageNumber}>{currentPage}</div>
        <FaArrowAltCircleRight
          onClick={() => {
            if (currentPage <= maxPagesAllowed) {
              setCurrentPage((prevPage) => prevPage + 1);
              setStartingIndex((prevIndex) => prevIndex + 3);
              setEndingIndex((prevIndex) => prevIndex + 3);
            }
          }}
          style={{
            width: "37px",
            height: "37px",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default RecentTransactions;
