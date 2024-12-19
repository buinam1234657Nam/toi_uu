import AppBar from "@/layouts/AppBar";
import { Footer } from "@/layouts/Footer/container";
import { FooterAppBar } from "@/layouts/FooterAppBar";
import Header from "@/layouts/Header";
import { Box, HStack, Image, ScrollView, Select, Text } from "native-base";
import { Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import CardProduct from "@/components/common/Product/CardProduct";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { useGetProductByCategory } from "@/hooks/useGetProductByCategory";

type RootStackParamList = {
    Home: undefined;
};
type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ViewCategory = () => {
    const { type } = useRoute().params as { type: string };
    const { data: productType } = useGetProductByCategory(Number(type));
    const [codeChoose, setCodeChoose] = useState<string>("0");
    const navigation = useNavigation<FooterAppBarNavigationProp>();

    const dataProduct = useMemo(() => {
        return productType?.data || [];
    }, [productType]);

    const dataChoose = useMemo(() => {
        if (!Array.isArray(dataProduct)) return [];
        switch (codeChoose) {
            case "1":
                return [...dataProduct].sort((a, b) => a.real_price - b.real_price);
            case "2":
                return [...dataProduct].sort((a, b) => b.real_price - a.real_price);
            case "3":
                return [...dataProduct].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            case "4":
                return [...dataProduct].sort((a, b) => b.quantity_sales - a.quantity_sales);
            default:
                return dataProduct;
        }
    }, [codeChoose, dataProduct]);

    const optionChoose = [
        { value: "Tùy chọn", code: "0" },
        { value: "Giá: Tăng dần", code: "1" },
        { value: "Giá: Giảm dần", code: "2" },
        { value: "Mới nhất", code: "3" },
        { value: "Bán chạy nhất", code: "4" },
    ];

    return (
        <Box backgroundColor={"white"} flex={1}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box bg="white" safeAreaTop width="100%" alignSelf="center">
                    <HStack height={60} style={{ backgroundColor: "white" }} alignItems="center" safeAreaBottom shadow={6}>
                        <Pressable py="3" flex={1} onPress={() => navigation.navigate("Home")}>
                            <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }} paddingX={4}>
                                <AntDesign style={{ marginRight: 10 }} name="arrowleft" size={24} color="#ee4d2d" />
                                <Text pr={"20px"} flex={1} textAlign={"center"} color="black" fontWeight={"bold"} fontSize="20">
                                    Trang chủ
                                </Text>
                            </Box>
                        </Pressable>
                    </HStack>
                </Box>
                <Box width={"100%"}>
                    <Image
                        resizeMode="cover"
                        style={{ width: "100%", height: 200 }}
                        source={{
                            uri: "https://file.hstatic.net/1000003969/collection/dc9ec786-0251-4f94-9571-263da3ac3a78_f60f18467816481d97d7512ec2061953.jpeg",
                        }}
                        alt=""
                    />
                </Box>
                <Box paddingX={5}>
                    <Text mt={4} fontSize={18} fontWeight={"500"} display={"block"} textAlign={"center"} width={"100%"}>
                        Bạn đang xem các sản phẩm mới nhất
                    </Text>
                    <HStack mt={4} justifyContent="center" display="flex" flexDirection="row" width="100%" space={0}>
                        <Select
                            onValueChange={(value) => setCodeChoose(value)}
                            fontSize={18}
                            dropdownIcon={<Entypo name="select-arrows" size={24} color="black" />}
                            width="180px"
                            defaultValue="0"
                        >
                            {optionChoose.map((item, index) => {
                                return <Select.Item label={item.value} key={item.code} value={item.code} />;
                            })}
                        </Select>
                    </HStack>
                </Box>
                <Box mt={6} ml={4}>
                    <CardProduct products={dataChoose ?? []} />
                </Box>
                <Box marginTop={4} marginBottom={3} paddingX={5}>
                    <Footer />
                </Box>
            </ScrollView>
            <FooterAppBar />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
    },
});
