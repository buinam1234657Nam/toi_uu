import CardProduct from "@/components/common/Product/CardProduct";
import { IProduct } from "@/types";
import { useNavigation } from "expo-router";
import { Box, Container, Heading, Pressable, Spinner } from "native-base"
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
interface Props {
    title: string;
    total: number;
    data: IProduct[];
    type: string;
    loading: boolean
}
type RootStackParamList = {
    View: undefined
};
type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const Trending = ({ title, total, data, loading, type }: Props) => {
    const dataProduct = useMemo(() => {
        if (Array.isArray(data) && data.length > 0) return data;
        return [];
    }, [data])
    const navigator = useNavigation<FooterAppBarNavigationProp>();
    return (
        loading && data ? (
            <Spinner size="2xl" />
        ) : (
            <Box style={{
                marginBottom: 42,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingBottom: 42
            }}>
                <Heading style={{ fontSize: 20, textAlign: "center" }}>{title}</Heading>
                <Text style={{ textAlign: "center", marginTop: 8, fontSize: 14 }}>{`(${total} sản phẩm)`}</Text>
                <Container style={styles.container}>
                    <CardProduct products={dataProduct ?? []} />
                </Container>
                <Pressable onPress={() => navigator.navigate("View", { type: type } as never)} style={styles.footer}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 15,
                        width: "28%",
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                        paddingBottom: 6
                    }}>XEM TẤT CẢ</Text>
                </Pressable>
            </Box>
        )
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        maxWidth: "100%",
    },
    footer: {
        marginTop: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})