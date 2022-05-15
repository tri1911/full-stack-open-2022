import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
  },
  errorBorder: {
    borderColor: theme.colors.red,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.container, error && styles.errorBorder, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
