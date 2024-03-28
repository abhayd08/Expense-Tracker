import styles from "./TopExpenses.module.css";
import BalanceTrackerContext from "../Contexts/BalanceTrackerContext";
import { useContext } from "react";

const TopExpenses = () => {
  const {
    entertainmentExpenses,
    setEntertainmentExpenses,
    foodExpenses,
    setFoodExpenses,
    travelExpenses,
    setTravelExpenses,
  } = useContext(BalanceTrackerContext);

  return <div className={styles.container}></div>;
};

export default TopExpenses;
