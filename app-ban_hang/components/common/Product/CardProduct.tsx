import React from "react";
import { Box, Heading, Image, Text, HStack, Stack, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "expo-router";
import { IProduct } from "@/types";
import { formatCurrency } from "@/constants";
type RootStackParamList = {
    ViewDetailProduct: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const CardProduct = ({ products }: { products: IProduct[] }) => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    return (
        <HStack space={3} justifyContent="flex-start" width={"100%"} flexWrap="wrap">
            {products.map((item: IProduct) => {
                return (
                    <Pressable key={item._id} onPress={() => {
                        navigation.navigate("ViewDetailProduct", { id: item._id } as never)
                    }} width="46%" overflow="hidden">
                        <Box >
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{
                                    uri: item.preview[0].image
                                }} alt="image" />
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading style={{ fontSize: 12, textAlign: "center" }} ml="-1">
                                    {item.name}
                                </Heading>
                                <HStack flex={1} justifyContent="center" space={2}>
                                    {item.sale_price ? (
                                        <>
                                            <Text style={{ color: "red" }} textAlign="center" fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                                                {formatCurrency(item.sale_price)}
                                            </Text>
                                            <Text textAlign="center" fontSize="xs" style={{ color: "black", textDecorationLine: "line-through" }} fontWeight="500" ml="-0.5" mt="-1">
                                                {formatCurrency(item.real_price)}
                                            </Text>
                                        </>
                                    ) : (
                                        <Text textAlign="center" fontSize="xs" style={{ color: "black" }} fontWeight="500" ml="-0.5" mt="-1">
                                            {formatCurrency(item.real_price)}
                                        </Text>
                                    )}
                                </HStack>
                            </Stack>
                        </Stack>
                    </Pressable>
                )
            })}
        </HStack>
    );
};

export default CardProduct;

const styles = StyleSheet.create({
    image: {
        height: 227,
        width: "100%"
    }
});
