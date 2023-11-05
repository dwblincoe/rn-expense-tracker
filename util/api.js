import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-95c85-default-rtdb.firebaseio.com";

export const storeExpense = async (data) => {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, data);

  return response.data.name;
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/expenses.json`);

    return Object.entries(response.data).map(([key, value]) => {
      return {
        id: key,
        ...value,
        date: new Date(value.date),
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = (expenseId, data) => {
  return axios.put(`${BACKEND_URL}/expenses/${expenseId}.json`, data);
};

export const deleteExpense = (expenseId) => {
  return axios.delete(`${BACKEND_URL}/expenses/${expenseId}.json`);
};
