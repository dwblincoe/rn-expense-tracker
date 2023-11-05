import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { getFormattedDate } from "../../util/date";

import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../ui/Button";

const { colors } = GlobalStyles;

const ExpenseForm = ({
  submitButtonLabel,
  defaultValues,
  onCancel,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const handleSubmit = () => {
    const data = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(data.amount) && data.amount > 0;
    const dateIsValid = data.date.toString() !== "Invalid Date";
    const descriptionIsValue = data.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValue) {
      setInputs((prevState) => ({
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValue,
        },
      }));
      return;
    }

    onSubmit(data);
  };

  const handleChangeValues = (name, value) =>
    setInputs((prevState) => ({
      ...prevState,
      [name]: { value, isValid: true },
    }));

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.innerContainer}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          inputProps={{
            keyboardType: "decimal-pad",
            onChangeText: handleChangeValues.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          inputProps={{
            placeholder: "YYYY-MM-DD",
            onChangeText: handleChangeValues.bind(this, "date"),
            maxLength: 10,
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        inputProps={{
          onChangeText: handleChangeValues.bind(this, "description"),
          multiline: true,
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: colors.error500,
    margin: 8,
  },
});
