import { AnyElement } from "@/constants";
import { IProduct } from "@/types";
import { Box, Pressable, useColorModeValue, View } from "native-base";
import React from "react";
import { Animated, Dimensions, StatusBar, StyleSheet, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";


export const DescribeProduct = ({ product }: { product: IProduct }) => {
    function FirstRoute() {
        return (
            <Box flex={1} my="4">
                <Text style={{ lineHeight: 24 }}>
                    {product.describe}
                </Text>
            </Box>
        )
    };

    const SecondRoute = () => (
        <Box flex={1} my="4">
            <Text style={{ lineHeight: 24 }}>
                - Kiểu: {product.type}
            </Text>
            <Text style={{ lineHeight: 24 }}>
                - Chất liệu: {product.material}
            </Text>
            <Text style={{ lineHeight: 24 }}>
                - Xuất xứ: {product.origin}
            </Text>
            <Text style={{ lineHeight: 24 }}>
                - Kiểu: {product.type}
            </Text>
            <Text>
                - Màu sắc: {product.color.map(color => color).join(' - ')}
            </Text>
            <Text style={{ lineHeight: 24 }}>
                - Kích thước: {product.size.map(size => size).join(' - ')}
            </Text>
        </Box>
    );

    const initialLayout = {
        width: Dimensions.get("window").width,
    };

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "first", title: "MÔ TẢ SẢN PHẨM" },
        { key: "second", title: "CHI TIẾT SẢN PHẨM" },
    ]);

    const renderTabBar = (props: AnyElement) => {
        const inputRange = props.navigationState.routes.map((_: string, i: number) => {
            return i
        })
        return (
            <Box flexDirection="row">
                {props.navigationState.routes.map((route: AnyElement, i: number) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex: number) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    const color =
                        index === i
                            ? useColorModeValue("#000", "#e5e5e5")
                            : useColorModeValue("#1f2937", "#a1a1aa");
                    const borderColor =
                        index === i
                            ? "black"
                            : useColorModeValue("coolGray.200", "gray.400");

                    return (
                        <Box
                            key={route.key}
                            borderBottomWidth="3"
                            borderColor={borderColor}
                            flex={1}
                            alignItems="center"
                            p="3"
                        >
                            <Pressable
                                onPress={() => {
                                    setIndex(i);
                                }}
                            >
                                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={{ marginTop: StatusBar.currentHeight, height: index === 0 ? 160 : 200 }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        width: "100%"
    }

})