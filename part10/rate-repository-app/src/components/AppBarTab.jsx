import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  navItem: { paddingHorizontal: 10 },
});

const AppBarTab = ({ label, href }) => {
  return (
    <Link to={href} style={styles.navItem}>
      <Text fontWeight="bold" style={{ color: "white" }}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
