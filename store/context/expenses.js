import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const foundIndex = state.findIndex((x) => x.id === action.payload.id);
      const updateableItem = state[foundIndex];
      const updatedItem = { ...updateableItem, ...action.payload.data };
      const newState = [...state];

      newState[foundIndex] = updatedItem;

      return newState;
    case "DELETE":
      return state.filter((x) => x.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (data) => dispatch({ type: "SET", payload: data });

  const addExpense = (data) => {
    dispatch({ type: "ADD", payload: data });
  };

  const updateExpense = (id, data) => {
    dispatch({ type: "UPDATE", payload: { id, data } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpensesProvider;
