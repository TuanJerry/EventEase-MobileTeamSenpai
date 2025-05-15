import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar/>
            <Text>Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

export default HomeScreen;