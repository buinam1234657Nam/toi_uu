import React from "react";
import { HStack, Text, Box, Image, IButtonProps } from "native-base";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchBar } from "@/components/common/Search";
const Cart = ({ numbers = 0, onPress }: { numbers: number; onPress?: () => void }) => {
    return (
        <Box>
            <Text style={styles.numbers}>{numbers < 10 ? `0${numbers}` : numbers}</Text>
            <Ionicons
                name="bag-outline"
                size={26}
                style={{ width: 28, height: 28 }}
                color="black"
                onPress={onPress}
            />
        </Box>
    )
}
interface Props extends IButtonProps {
    numbers?: number;
    onSearchPress: null | ((event: GestureResponderEvent) => void) | undefined;
    onCartPress: null | ((event: GestureResponderEvent) => void) | undefined;
    onMenuPress: null | ((event: GestureResponderEvent) => void) | undefined;
}
function AppBar() {
    return (
        <HStack style={styles.container} alignItems="center" w="100%">
            <HStack alignItems="center">
                <TouchableOpacity activeOpacity={1} onPress={() => console.log(123)}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/images/logo.png")}
                        resizeMode="contain"
                        alt="image"
                    />
                </TouchableOpacity>
            </HStack>
            <SearchBar />
        </HStack>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 48,
        paddingTop: 10,
        paddingRight: 6,
        paddingBottom: 10,
        paddingLeft: 15,
        position: "relative",
        zIndex: 999,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        borderStyle: 'solid',
    },
    image: {
        width: 32,
        height: 32,
    },
    numbers: {
        position: "absolute",
        left: 7,
        top: 6,
        fontSize: 12
    }
});

export default AppBar;
