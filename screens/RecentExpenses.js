import { useContext, useEffect, useState } from "react";

import { getDateMinusDays } from "../util/date";
import { ExpenseContext } from "../store/context/expenses";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { fetchExpenses } from "../util/api";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const initData = async () => {
    try {
      const response = await fetchExpenses();
      setExpenses(response);
    } catch (error) {
      setError("Could not fetch expenses!");
    }

    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  useEffect(() => {
    initData();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  // if (error && !isFetching) {
  //   return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  // }

  return (
    <ExpensesOutput
      period="Last 7 Days"
      expenses={expenses.filter((x) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);

        return x.date > date7daysAgo;
      })}
      fallbackText="No expenses registered for the last 7 days!"
    />
  );
};

export default RecentExpenses;
