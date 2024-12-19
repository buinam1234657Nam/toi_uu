import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "native-base";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
type RootStackParamList = {
    Home: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const width = Dimensions.get("window").width;
const Header = () => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    return (
        <Pressable onPress={() => navigation.navigate("Home")}>
            <View style={{
                width: width,
                height: 48,
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>App Shipper</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 43,
    },
});

export default Header;
