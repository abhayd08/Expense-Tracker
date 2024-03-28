import ReactModal from "react-modal";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";
import { useContext } from "react";
import styles from "./AddExpense.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const AddExpense = () => {
  const {
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    expensesSummary,
    setExpensesSummary,
    setExpenses,
    walletBalance,
    setWalletBalance,
    transactionToBeEditted,
    setTransactionToBeEditted,
  } = useContext(BalanceTrackerContext);

  const [modalWidth, setModalWidth] = useState("530px");
  const [modalHeight, setModalHeight] = useState("341px");

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        setModalWidth("300px");
        setModalHeight("561px");
      } else if (window.innerWidth <= 610) {
        setModalWidth("428px");
        setModalHeight("491px");
      } else {
        setModalWidth("530px");
        setModalHeight("341px");
      }
    });
  });
  console.log(expensesSummary);

  const handleExpenseAdd = (e) => {
    e.preventDefault();
    if (Number(e.target.elements.price.value) > 0) {
      if (transactionToBeEditted === null) {
        const expensesData = {
          id: `${
            expensesSummary.length
          }_${e.target.elements.title.value.trim()}`,
          title: e.target.elements.title.value.trim(),
          price: Number(e.target.elements.price.value),
          category: e.target.elements.category.value.trim(),
          time: new Date().toISOString(),
          date: e.target.elements.date.value,
        };

        if (Number(e.target.elements.price.value) <= walletBalance) {
          setWalletBalance((prevBalance) => prevBalance - expensesData.price);
          setExpenses((prevExpenses) => prevExpenses + expensesData.price);
          setExpensesSummary((prevSummary) => {
            return [...prevSummary, expensesData];
          });
          setIsAddExpenseModalOpen(false);
          setTransactionToBeEditted(null);
          enqueueSnackbar("Expense added.", {
            variant: "success",
          });
          e.target.reset();
        } else {
          enqueueSnackbar("Expenses must not exceed income.", {
            variant: "warning",
          });
        }
      } else {
        const otherTransactions = expensesSummary.filter((expense) => {
          return expense.id !== transactionToBeEditted;
        });

        const previousTransaction = expensesSummary.filter(
          (expense) => expense.id === transactionToBeEditted
        );

        const transactionToAdd = {
          id: transactionToBeEditted,
          title: e.target.elements.title.value.trim(),
          price: Number(e.target.elements.price.value),
          category: e.target.elements.category.value.trim(),
          time:
            new Date(previousTransaction[0].date) ===
            new Date(e.target.elements.date.value)
              ? previousTransaction[0].time
              : new Date().toISOString(),
          date: e.target.elements.date.value,
        };

        setWalletBalance(
          (prevBalance) =>
            prevBalance + previousTransaction[0].price - transactionToAdd.price
        );
        setExpenses(
          (prevExpenses) =>
            prevExpenses - previousTransaction[0].price + transactionToAdd.price
        );

        setExpensesSummary([...otherTransactions, transactionToAdd]);
        enqueueSnackbar("Transaction edited.", {
          variant: "success",
        });
        setTransactionToBeEditted(null);
        setIsAddExpenseModalOpen(false);
      }
    } else {
      enqueueSnackbar("Expenses cannot be negative.", {
        variant: "error",
      });
      e.target.elements.price.value = null;
    }
  };

  return (
    <>
      <ReactModal
        style={{
          content: {
            position: "absolute",
            top: "50%",
            width: modalWidth,
            height: modalHeight,
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#EFEFEF",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "15px",
            outline: "none",
            padding: "0",
          },
        }}
        isOpen={isAddExpenseModalOpen}
        contentLabel="Add Expense"
      >
        <div className={styles.container}>
          <h3 className={styles.heading}>Add Expenses</h3>
          <form onSubmit={handleExpenseAdd} className={styles.form}>
            <input
              required
              name="title"
              placeholder="Title"
              className={styles.inputs}
            />
            <input
              required
              name="price"
              type="number"
              placeholder="Price"
              className={styles.inputs}
            />
            <select name="category" required className={styles.inputs}>
              <option value="select-category" selected disabled>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>
            <input required name="date" type="date" className={styles.inputs} />
            <div className={styles.controls}>
              <button className={styles.submitBtn} type="submit">
                Add Expense
              </button>
              <button
                onClick={() => {
                  setTransactionToBeEditted(null);
                  setIsAddExpenseModalOpen(false);
                }}
                className={styles.cancelBtn}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default AddExpense;
