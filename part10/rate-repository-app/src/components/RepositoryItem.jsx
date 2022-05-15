import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-start",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    marginTop: 5,
  },
  spaceY: {
    paddingVertical: 5,
  },
  counterContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

const CounterView = ({ label, value }) => {
  const valueToShow =
    value > 1000 ? `${Number(value / 1000).toFixed(1)}k` : value;

  return (
    <View style={styles.counter}>
      <Text fontWeight="bold" style={styles.spaceY}>
        {valueToShow}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={{ marginLeft: 25 }}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.spaceY}>
            {repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.spaceY}>
            {repository.description}
          </Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <CounterView label="Stars" value={repository.stargazersCount} />
        <CounterView label="Forks" value={repository.forksCount} />
        <CounterView label="Reviews" value={repository.reviewCount} />
        <CounterView label="Rating" value={repository.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
