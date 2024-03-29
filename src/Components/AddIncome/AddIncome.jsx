import ReactModal from "react-modal";
import ExpenseTrackerContext from "../Contexts/ExpenseTrackerContext";
import { useContext } from "react";
import styles from "./AddIncome.module.css";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const AddIncome = () => {
  const { isAddIncomeModalOpen, setIsAddIncomeModalOpen, setWalletBalance } =
    useContext(ExpenseTrackerContext);

  const [modalWidth, setModalWidth] = useState(null);
  const [modalHeight, setModalHeight] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= 310) {
      setModalWidth("92vw");
      setModalHeight("318px");
    } else if (window.innerWidth <= 400) {
      setModalWidth("290px");
      setModalHeight("318px");
    } else if (window.innerWidth <= 640) {
      setModalWidth("340px");
      setModalHeight("260px");
    } else {
      setModalWidth("565px");
      setModalHeight("190px");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 310) {
        setModalWidth("92vw");
        setModalHeight("318px");
      } else if (window.innerWidth <= 400) {
        setModalWidth("290px");
        setModalHeight("318px");
      } else if (window.innerWidth <= 640) {
        setModalWidth("340px");
        setModalHeight("260px");
      } else {
        setModalWidth("565px");
        setModalHeight("190px");
      }
    });
  });

  const handleIncomeAdd = (e) => {
    e.preventDefault();
    if (Number(e.target.elements.income.value) > 0) {
      const income = Number(e.target.elements.income.value);
      setWalletBalance((prevBalance) => prevBalance + income);
      enqueueSnackbar("Income added.", {
        variant: "success",
      });
      setIsAddIncomeModalOpen(false);
      e.target.reset();
    } else {
      enqueueSnackbar("Income cannot be negative.", {
        variant: "error",
      });
      e.target.reset();
    }
  };

  return (
    <>
      <ReactModal
        ariaHideApp={false}
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
            maxHeight: "90vh",
            overflow: "auto",
          },
        }}
        isOpen={isAddIncomeModalOpen}
        contentLabel="Add Income"
      >
        <div className={styles.container}>
          <h3 className={styles.heading}>Add Income</h3>
          <form onSubmit={handleIncomeAdd} className={styles.form}>
            <input
              placeholder="Income Amount"
              name="income"
              required
              type="number"
              className={styles.inputs}
            />
            <div className={styles.controls}>
              <button className={styles.submitBtn} type="submit">
                Add Balance
              </button>
              <button
                onClick={() => setIsAddIncomeModalOpen(false)}
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

export default AddIncome;
