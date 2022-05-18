import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

import Button from "./Button";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    // flexDirection: "row",
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: theme.roundness,
  },
  languageText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  openBtn: { marginTop: 15 },
});

const CountView = ({ label, value }) => {
  const valueToShow =
    value > 1000 ? `${Number(value / 1000).toFixed(1)}k` : value;

  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {valueToShow}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, openBtn }) => {
  if (!repository) return null;

  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText} fontWeight="bold">
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountView label="Stars" value={stargazersCount} />
        <CountView label="Forks" value={forksCount} />
        <CountView label="Reviews" value={reviewCount} />
        <CountView label="Rating" value={ratingAverage} />
      </View>
      {openBtn && (
        <Button
          style={styles.openBtn}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          Open in GitHub
        </Button>
      )}
    </View>
  );
};

export default RepositoryItem;
