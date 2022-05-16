import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getKey(key) {
    return `${this.namespace}:${key}`;
  }

  getAccessToken() {
    return AsyncStorage.getItem(this.getKey("accessToken"));
  }

  setAccessToken(newAccessToken) {
    return AsyncStorage.setItem(this.getKey("accessToken"), newAccessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(this.getKey("accessToken"));
  }
}

export default AuthStorage;
