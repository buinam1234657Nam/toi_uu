import { Box, Button, Center, HStack, Pressable, ScrollView, Spinner, Text, View } from "native-base"
import { SlickReviewProduct } from "./SlickReviewProduct"
import { StyleSheet } from "react-native";
import { CFindproductsatshowroom } from "../Findproductsatshowroom";
import { PolicyProduct } from "./PolicyProduct";
import { DescribeProduct } from "./DescribeProduct";
import { ProductTabBot } from "./ProductTabBot";
import React, { useCallback, useMemo, useState } from 'react';
import ProductThumb from "./ProductThumb";
import AntDesign from '@expo/vector-icons/AntDesign';
import CButton from "../Button";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useGetProductById } from "@/hooks/useGetProductById";
import { formatCurrency } from "@/constants";
import { IUpdateCart, useUpdateCart } from "@/modules/cart/hook/updateCart";
import { appStore } from "@/store";
import { AlertTypes, Notification } from "@/components/Notification";
type RootStackParamList = {
    Home: undefined
};
export interface IImages {
    url: string;
    color: string;
    bgColor: string;
    id: string;
}
type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const ViewDetailProduct = () => {
    const { id } = useRoute().params as { id: string }
    const [selectedIndexSize, setSelectedIndexSize] = useState(0);
    const [quantity, setQuantity] = useState<number>(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const { data: product, isFetched: loading } = useGetProductById(id)
    const { mutate: updateCart } = useUpdateCart(() => {
        Notification({
            description: "Cập nhật giỏ hàng thành công",
            alertType: AlertTypes.SUCCESS
        })
        navigation.navigate("Home")
    })
    const handlePressSize = (index: any) => {
        setSelectedIndexSize(index);
    };
    const stock = product ? product.quantity_imported - product.quantity_sales : 0
    const color = product ? product.preview[currentImageIndex].color : ""
    const bgColor = product ? product.preview[currentImageIndex].bgColor : ""
    const { user_info } = appStore()
    const images = useMemo(() => {
        if (product) {
            return product.preview.map((item: {
                image: string;
                color: string;
                bgColor: string;
                id: string;
            }) => {
                return {
                    url: item.image,
                    color: item.color,
                    bgColor: item.bgColor,
                    id: item.id
                }
            })
        }
        return []
    }, [product])
    const values = useMemo(() => {
        if (product) return {
            userId: user_info._id,
            products: [{
                productId: id,
                quantity: quantity,
                detail: {
                    preview: {
                        image: product.preview[currentImageIndex].image,
                        color: product.preview[currentImageIndex].color,
                        bgColor: product.preview[currentImageIndex].bgColor,
                    },
                    name: product.name,
                    size: product.size[selectedIndexSize],
                    real_price: product.real_price,
                    sale_price: product.sale_price || 0,
                    quantity_import: product.quantity_imported,
                    quantity_sale: product.quantity_sales,
                }
            }]
        }
        return { userId: '', products: [] }
    }, [product, currentImageIndex, selectedIndexSize, quantity, id, user_info._id])
    const handleFinish = useCallback(() => {
        if (values && values.products.length > 0) {
            updateCart(values as IUpdateCart)
        }
    }, [values, updateCart])
    return (
        <>
            {!loading ? (
                <Spinner />
            ) : (
                <Box backgroundColor={"white"} flex={1}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <Box bg="white" safeAreaTop width="100%" alignSelf="center">
                            <HStack height={60} style={{ backgroundColor: "white" }} alignItems="center" safeAreaBottom shadow={6}>
                                <Pressable
                                    py="3"
                                    flex={1}
                                    onPress={() => {
                                        navigation.navigate('Home');
                                    }}
                                >
                                    <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }} paddingX={4}>
                                        <AntDesign name="arrowleft" size={24} color="#ee4d2d" />
                                        <Text pr={"20px"} flex={1} textAlign={"center"} color="black" fontWeight={"bold"} fontSize="20">
                                            Xem chi tiết
                                        </Text>
                                    </Box>
                                </Pressable>
                            </HStack>
                        </Box>
                        <View h={360}>
                            <SlickReviewProduct images={images} currentIndex={currentImageIndex} />
                        </View>
                        <ProductThumb images={images} currentIndex={currentImageIndex} setCurrentIndex={setCurrentImageIndex} />
                        <Box px={4}>
                            {/* desc */}
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{product.name}</Text>
                            <HStack pl={4} mt={2} flex={1} space={2}>
                                {
                                    product.sale_price ? (
                                        <>
                                            <Text style={{ color: "red" }} fontSize={16} fontWeight="500" ml="-0.5" mt="-1">
                                                {formatCurrency(product.sale_price)}
                                            </Text>
                                            <Text fontSize={16} style={{ color: "black", textDecorationLine: "line-through" }} fontWeight="500" ml="-0.5" mt="-1">
                                                {formatCurrency(product.real_price)}
                                            </Text>
                                        </>
                                    ) : (
                                        <Text fontSize={16} style={{ color: "black", textDecorationLine: "line-through" }} fontWeight="500" ml="-0.5" mt="-1">
                                            {formatCurrency(product.real_price)}
                                        </Text>
                                    )
                                }
                            </HStack>
                            <Box mt={2} display={"flex"} flexDirection={"row"}>
                                <Text style={{ fontSize: 13 }}>
                                    <Text style={{ marginRight: 4 }}>Mã sản phẩm:</Text>
                                    <Text style={styles.code}>
                                        {product.code}
                                    </Text>
                                </Text>
                                <Text style={{ fontSize: 13, marginLeft: 12 }}>Màu sắc:
                                    <Text style={[styles.code, { color: bgColor === "#FFFFFF" ? "#cbd5e1" : bgColor }]}>
                                        {color}
                                    </Text>
                                </Text>
                            </Box>
                            <Box mt={2}>
                                <Text style={{ fontWeight: "bold" }}>Kích thước</Text>
                                <HStack width="100%" flexWrap="wrap" mt={2}>
                                    {product.size.map((item: string, index: number) => {
                                        return (
                                            <Pressable key={item} mr={"12px"} w={"18%"} onPress={() => handlePressSize(index)}>
                                                <Box
                                                    w={"100%"}
                                                    overflow="hidden"
                                                    mb={3}
                                                    py={"6px"}
                                                    style={[
                                                        styles.size,
                                                        {
                                                            borderColor: selectedIndexSize === index ? "black" : "#bdbfbe",
                                                            borderWidth: selectedIndexSize === index ? 2 : 1,
                                                        }
                                                    ]}

                                                >
                                                    <Center>{item}</Center>
                                                </Box>
                                                {selectedIndexSize === index && (
                                                    <>
                                                        <Box style={styles.tick}></Box>
                                                        <AntDesign style={styles.icon} name="check" size={10} color="white" />
                                                    </>
                                                )}
                                            </Pressable>
                                        )
                                    })}
                                </HStack>
                                {/* Desc */}
                                {/* Chọn số lượng */}
                                <Box style={styles.quantity} display={"flex"} flexDirection={"row"} mt={3}>
                                    <Button
                                        onPress={() => {
                                            if (quantity <= 1) {
                                                setQuantity(1)
                                            }
                                            else {
                                                setQuantity(quantity - 1)
                                            }
                                        }}
                                        _pressed={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                                        style={styles.buttonQuantity}
                                        bg={"rgba(0, 0, 0, 0.03)"}
                                    >
                                        <AntDesign name="minus" size={20} color="black" />
                                    </Button>
                                    <Center>
                                        <Text style={{ fontSize: 16 }}>{quantity}</Text>
                                    </Center>
                                    <Button
                                        onPress={() => {
                                            if (quantity >= stock) {
                                                setQuantity(stock)
                                            }
                                            else {
                                                setQuantity(quantity + 1)
                                            }
                                        }}
                                        _pressed={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                                        style={styles.buttonQuantity}
                                        bg={"rgba(0, 0, 0, 0.03)"}
                                    >
                                        <AntDesign name="plus" size={20} color="black" />
                                    </Button>
                                </Box>
                                {/* Chọn số lượng */}
                            </Box>
                            <Text style={{ marginTop: 4, color: "red", display: "flex" }}>Số hàng trong kho: {stock}</Text>
                            <Box mt={4}><CButton onPress={handleFinish} title="Thêm vào giỏ hàng" /></Box>
                            <CFindproductsatshowroom />
                            <PolicyProduct />
                            <DescribeProduct product={product} />
                            <ProductTabBot />
                        </Box>
                    </ScrollView >
                </Box >
            )}
        </>
    );
}
const styles = StyleSheet.create({
    code: {
        fontWeight: "bold",
        fontSize: 13,
    },
    size: {
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
    },
    tick: {
        position: "absolute",
        right: -8,
        top: -1,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderBottomWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black',
        transform: [{ rotate: "45deg" }]
    },
    icon: {
        position: "absolute",
        top: 2,
        right: 2,
    },
    quantity: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.03)",
        width: 180,
        justifyContent: "space-between"
    },
    buttonQuantity: {
        borderRadius: 0,
        width: "34%"
    }
});
