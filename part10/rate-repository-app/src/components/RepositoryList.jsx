import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Button, Menu, Provider } from "react-native-paper";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuBarText: { marginLeft: 10 },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryContainer = ({ repositories, ListHeaderComponent }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        navigate(`/repositories/${item.id}`);
      }}
    >
      <RepositoryItem repository={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const orderPrinciples = {
  default: {
    title: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  ratingDesc: {
    title: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  ratingAsc: {
    title: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const SortMenuBar = ({ sortTitle, handleSelection }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuBarText} fontSize="subheading">
        {sortTitle}
      </Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            compact
            color="black"
            icon="menu-down"
            onPress={() => setVisible(true)}
          />
        }
      >
        <Menu.Item title="Select an item..." disabled />
        {Object.entries(orderPrinciples).map(([key, { title }]) => (
          <Menu.Item
            key={key}
            title={title}
            onPress={() => handleSelection(key)}
          />
        ))}
      </Menu>
    </View>
  );
};

const RepositoryList = () => {
  const [orderKey, setOrderKey] = useState("default");

  const { title, orderBy, orderDirection } = orderPrinciples[orderKey];

  const { repositories } = useRepositories({ orderBy, orderDirection });

  return (
    <Provider>
      <RepositoryContainer
        repositories={repositories}
        ListHeaderComponent={() => (
          <SortMenuBar
            sortTitle={title}
            handleSelection={(key) => setOrderKey(key)}
          />
        )}
      />
    </Provider>
  );
};

export default RepositoryList;
