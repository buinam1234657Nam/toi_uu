import { useNavigation } from "expo-router";
import { Pressable } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
type RootStackParamList = {
    Home: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Header = () => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();

    return (
        <Pressable onPress={() => navigation.navigate("Home")}>
            <ImageBackground
                alt=""
                source={{ uri: "https://file.hstatic.net/1000003969/file/mb_700x70_2765802b3ec2481e95eeb0aae1a45f43.jpg" }}
                style={styles.container}
            >
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 43,
    },
});

export default Header;
