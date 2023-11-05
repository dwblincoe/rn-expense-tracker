import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { storeExpense, updateExpense, deleteExpense } from "../util/api";

import { ExpenseContext } from "../store/context/expenses";
import { GlobalStyles } from "../constants/styles";

const { colors } = GlobalStyles;

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expenseCtx = useContext(ExpenseContext);
  const editingExpenseId = route.params?.id;
  const isEditing = !!editingExpenseId;
  const selectedExpense = expenseCtx.expenses.find(
    (x) => x.id === editingExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDeleteExpense = async () => {
    setIsSubmitting(true);
    setTimeout(async () => {
      await deleteExpense(editingExpenseId);
      expenseCtx.deleteExpense(editingExpenseId);
      handleCloseModal();
    }, 1000);
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => navigation.goBack();

  const handleConfirm = async (data) => {
    setIsSubmitting(true);
    setTimeout(async () => {
      if (isEditing) {
        await updateExpense(editingExpenseId, data);
        expenseCtx.updateExpense(editingExpenseId, data);
      } else {
        const expenseId = await storeExpense(data);
        expenseCtx.addExpense({ id: expenseId, ...data });
      }
    }, 1000);

    handleCloseModal();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={handleConfirm}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={colors.error500}
            size={32}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
