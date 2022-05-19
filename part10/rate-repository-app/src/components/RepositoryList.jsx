import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Button, Menu, Provider, Searchbar } from "react-native-paper";
import Text from "./Text";
import { useDebounce } from "use-debounce";

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
  listHeaderContainer: {},
  searchBarContainer: {
    padding: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryContainer = ({
  children,
  repositories,
  // ListHeaderComponent,
  onEndReach,
}) => {
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
    <View>
      {children}
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        // ListHeaderComponent={ListHeaderComponent}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.2}
      />
    </View>
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

const SortMenuBar = ({ sortTitle, setOrderKey }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleSelection = (key) => () => {
    setOrderKey(key);
    closeMenu();
  };

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuBarText} fontSize="subheading">
        {sortTitle}
      </Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button compact color="black" icon="menu-down" onPress={openMenu} />
        }
      >
        <Menu.Item title="Select an item..." disabled />
        {Object.entries(orderPrinciples).map(([key, { title }]) => (
          <Menu.Item key={key} title={title} onPress={handleSelection(key)} />
        ))}
      </Menu>
    </View>
  );
};

const RepositoryList = () => {
  const [orderKey, setOrderKey] = useState("default");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { title, orderBy, orderDirection } = orderPrinciples[orderKey];

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedQuery,
  });

  const onEndReach = () => {
    console.log("[RepositoryList] You have reached the end of the list");
    fetchMore();
  };

  return (
    <Provider>
      <RepositoryContainer
        repositories={repositories}
        // ListHeaderComponent={}
        onEndReach={onEndReach}
      >
        <View style={styles.listHeaderContainer}>
          <View style={styles.searchBarContainer}>
            <Searchbar
              style={styles.shadowProp}
              placeholder="Search"
              onChangeText={(query) => setSearchQuery(query)}
              value={searchQuery}
            />
          </View>
          <SortMenuBar sortTitle={title} setOrderKey={setOrderKey} />
        </View>
      </RepositoryContainer>
    </Provider>
  );
};

export default RepositoryList;
