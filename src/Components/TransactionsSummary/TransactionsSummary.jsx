import RecentTransactions from "../RecentTransactions/RecentTransactions";
import TopExpenses from "../TopExpenses/TopExpenses";
import styles from "./TransactionsSummary.module.css";

const TransactionsSummary = () => {

  return (
    <div className={styles.container}>
      <div className={styles.recentTransactions}>
        <span className={styles.heading}>Recent Transactions</span>
          <RecentTransactions />
      </div>
      <div className={styles.topExpenses}>
        <span className={styles.heading}>Top Expenses</span>
        <TopExpenses />
      </div>
    </div>
  );
};

export default TransactionsSummary;
