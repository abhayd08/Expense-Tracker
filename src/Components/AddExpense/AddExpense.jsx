import ReactModal from "react-modal";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";
import { useContext } from "react";
import styles from "./AddExpense.module.css";
import { useState } from "react";
import { useEffect } from "react";

const AddExpense = () => {
  const {
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    expensesSummary,
    setExpensesSummary,
    setExpenses,
    walletBalance,
    setWalletBalance,
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

  const handleExpenseAdd = (e) => {
    e.preventDefault();
    const expensesData = {
      title: e.target.elements.title.value,
      price: Number(e.target.elements.price.value),
      category: e.target.elements.category.value,
      date: new Date(e.target.elements.date.value),
    };

    if (Number(e.target.elements.price.value) <= walletBalance) {
      setWalletBalance((prevBalance) => prevBalance - expensesData.price);
      setExpenses((prevExpenses) => prevExpenses + expensesData.price);
      setExpensesSummary((prevSummary) => {
        return [...prevSummary, expensesData];
      });
      setIsAddExpenseModalOpen(false);
      e.target.reset();
    } else {
      alert("BSDK");
    }
  };

  console.log(expensesSummary);

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
                onClick={() => setIsAddExpenseModalOpen(false)}
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
