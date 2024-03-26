import ReactModal from "react-modal";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";
import { useContext } from "react";
import styles from "./AddExpense.module.css";

const AddExpense = () => {
  const { isAddExpenseModalOpen, setIsAddExpenseModalOpen } = useContext(
    BalanceTrackerContext
  );

  const handleExpenseAdd = () => {};

  return (
    <>
      <ReactModal
        style={{
          content: {
            position: "absolute",
            top: "50%",
            height: "335px",
            width: "538px",
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
          <form onClick={handleExpenseAdd} className={styles.form}>
            <input placeholder="Title" className={styles.inputs} />
            <input
              type="number"
              placeholder="Price"
              className={styles.inputs}
            />
            <select name="category" className={styles.inputs}>
              <option value="select-category" default disabled>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
            <input type="date" className={styles.inputs} />
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
