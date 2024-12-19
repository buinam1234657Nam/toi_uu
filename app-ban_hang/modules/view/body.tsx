import { Footer } from "@/layouts/Footer/container"
import { FooterAppBar } from "@/layouts/FooterAppBar"
import { Box, HStack, Image, ScrollView, Select, Text } from "native-base"
import { Pressable, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import CardProduct from "@/components/common/Product/CardProduct"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types"
import { useNavigation } from "expo-router"
import { useRoute } from "@react-navigation/native"
import { useGetProductNew } from "@/hooks/useGetProductNew"
import { useGetProductDiscount } from "@/hooks/useGetProductDiscount"
import { useGetProductSale } from "@/hooks/useGetProductSale"
import React, { useEffect, useMemo, useState } from "react"
import { IProduct } from "@/types"
import { ScrollView as RNScrollView } from "react-native";
type RootStackParamList = {
    Home: undefined
};
type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const View = () => {
    const { type } = useRoute().params as { type: string };
    const [params, setParams] = useState({
        page: 0,
        limit: 8
    })
    const { data: productNews } = useGetProductNew(params, type === "new");
    const { data: productDiscount } = useGetProductDiscount(params, type === "discount");
    const { data: productSale } = useGetProductSale(params, type === "sale");
    const [codeChoose, setCodeChoose] = useState<string>("0");
    const [codeFilter, setCodeFilter] = useState<string>("0");
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const dataProduct = useMemo(() => {
        if (type === "new" && productNews) {
            setTotalDocs(productNews.totalDocs);
            return productNews.docs;
        }
        else if (type === "discount" && productDiscount) {
            setTotalDocs(productDiscount.totalDocs);
            return productDiscount.docs;
        }
        else if (type === "sale" && productSale) {
            setTotalDocs(productSale.totalDocs);
            return productSale.docs;
        };
        return [];
    }, [type, productNews, productDiscount, productSale]);
    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    // useEffect(() => {
    //     if (Array.isArray(dataProduct) && dataProduct.length > 0) {
    //         const data = dataProduct.map((item) => item).filter((item) => !listProduct.map((item) => item._id).includes(item._id));
    //         setListProduct(prevList => [...prevList, ...data]);
    //     }
    // }, [dataProduct]);
    const dataProductType = useMemo(() => {
        if (codeFilter === "0") return dataProduct;
        const data = Array.isArray(dataProduct) ? dataProduct.filter((item: IProduct) => item.type === parseInt(codeFilter)) : [];
        return data;
    }, [codeFilter, dataProduct]);

    const dataChoose = useMemo(() => {
        if (!Array.isArray(dataProductType)) return [];
        switch (codeChoose) {
            case "1":
                return [...dataProductType].sort((a, b) => a.real_price - b.real_price);
            case "2":
                return [...dataProductType].sort((a, b) => b.real_price - a.real_price);
            case "3":
                return [...dataProductType].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case "4":
                return [...dataProductType].sort((a, b) => b.quantity_sales - a.quantity_sales);
            default:
                return dataProductType;
        }
    }, [codeChoose, dataProductType, listProduct]);
    const optionFilter = [
        { value: "Bộ lọc", code: "0" },
        { value: "Váy", code: "1" },
        { value: "Quần", code: "2" },
        { value: "Áo", code: "3" },
        { value: "Giày", code: "4" },
        { value: "Balo", code: "5" },
        { value: "Mắt kính", code: "6" },
        { value: "Tất", code: "7" },
    ];
    const optionChoose = [
        { value: "Tùy chọn", code: "0" },
        { value: "Giá: Tăng dần", code: "1" },
        { value: "Giá: Giảm dần", code: "2" },
        { value: "Mới nhất", code: "3" },
        { value: "Bán chạy nhất", code: "4" },
    ];
    const scrollViewRef = React.createRef<RNScrollView>();
    const [lastOffset, setLastOffset] = useState(0);
    // const handleScroll = (event: any) => {
    //     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    //     const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    //     if (contentOffset.y > lastOffset) {
    //         if (isEndReached && totalDocs !== listProduct.length) {
    //             setParams(prevParams => ({
    //                 ...prevParams,
    //                 page: prevParams.page + 1
    //             }));
    //         }
    //     }
    //     setLastOffset(contentOffset.y);
    // };
    const renderTitle = () => {
        switch (type) {
            case "new":
                return "Sản phẩm mới nhất";
            case "sale":
                return "Sản phẩm bán chạy nhất";
            case "discount":
                return "Sản phẩm sale";
        }
    }
    return (
        <Box backgroundColor={"white"} flex={1}>
            <ScrollView
                ref={scrollViewRef}
                // onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Box bg="white" safeAreaTop width="100%" alignSelf="center">
                    <HStack height={60} style={{ backgroundColor: "white" }} alignItems="center" safeAreaBottom shadow={6}>
                        <Pressable
                            style={{
                                display: "flex",
                                marginBottom: 10
                            }}
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                        >
                            <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }} paddingX={4}>
                                <AntDesign name="arrowleft" size={24} color="#ee4d2d" />
                                <Text pr={"20px"} ml={4} flex={1} textAlign={"center"} color="black" fontWeight={"bold"} fontSize="20">
                                    {renderTitle()}
                                </Text>
                            </Box>
                        </Pressable>
                    </HStack>
                </Box>
                <Box width={"100%"}>
                    <Image resizeMode="cover" style={{ width: "100%", height: 200 }}
                        source={{
                            uri: "https://file.hstatic.net/1000003969/collection/dc9ec786-0251-4f94-9571-263da3ac3a78_f60f18467816481d97d7512ec2061953.jpeg"
                        }}
                        alt=""
                    />
                </Box>
                <Box paddingX={5}>
                    <Text mt={4} fontSize={18} fontWeight={"500"} display={"block"} textAlign={"center"} width={"100%"}>Bạn đang xem các sản phẩm mới nhất</Text>
                    <HStack mt={4} justifyContent="center" display="flex" flexDirection="row" width="100%" space={0}>
                        <Select onValueChange={(value) => setCodeFilter(value)} fontSize={18} dropdownIcon={<AntDesign name="filter" size={24} color="black" />} placeholder="Bộ lọc" defaultValue="Bộ lọc" width="180px" >
                            {optionFilter.map((item, index) => {
                                return (
                                    <Select.Item label={item.value} key={item.code} value={item.code} />
                                )
                            })}
                        </Select>
                        <Select onValueChange={(value) => setCodeChoose(value)} fontSize={18} dropdownIcon={<Entypo name="select-arrows" size={24} color="black" />} placeholder="Tùy chọn" defaultValue="Tùy chọn" width="180px" >
                            {optionChoose.map((item, index) => {
                                return (
                                    <Select.Item label={item.value} key={item.code} value={item.code} />
                                )
                            })}
                        </Select>
                    </HStack>
                </Box>
                <Box mt={6} ml={4}>
                    <CardProduct products={dataChoose} />
                </Box>
                {
                    // && dataProduct.length === totalDocs
                    Array.isArray(dataProduct)  && (
                        <Box marginTop={4} marginBottom={3} paddingX={5}>
                            <Footer />
                        </Box>
                    )
                }
            </ScrollView>
            <FooterAppBar />
        </Box>
    )
}