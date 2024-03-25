import BalanceTracker from "../BalanceTracker/BalanceTracker";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <BalanceTracker />
    </div>
  );
};

export default Dashboard;
