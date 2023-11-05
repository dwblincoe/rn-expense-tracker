import { useContext } from "react";

import { ExpenseContext } from "../store/context/expenses";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  const { expenses } = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      period="Total"
      expenses={expenses}
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
