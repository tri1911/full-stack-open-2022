import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";

import theme from "../theme";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { GET_CURRENT_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: "row",
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "white",
  },
  tabGroupContainer: {
    flexDirection: "row",
  },
});

const AppBarTab = ({ children, to, ...props }) => {
  const content = (
    <View style={styles.tabContainer} {...props}>
      <Text fontWeight="bold" style={styles.tabText}>
        {children}
      </Text>
    </View>
  );

  return to ? (
    <Link to={to} {...props}>
      {content}
    </Link>
  ) : (
    <Pressable {...props}>{content}</Pressable>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_CURRENT_USER);
  const currentUser = data?.me;
  // console.log("[AppBar] currentUser:", currentUser);

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {currentUser ? (
          <View style={styles.tabGroupContainer}>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/user-reviews">My Reviews</AppBarTab>
            <AppBarTab onPress={onSignOut}>Sign Out</AppBarTab>
          </View>
        ) : (
          <View style={styles.tabGroupContainer}>
            <AppBarTab to="/sign-in">Sign In</AppBarTab>
            <AppBarTab to="/sign-up">Sign Up</AppBarTab>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
