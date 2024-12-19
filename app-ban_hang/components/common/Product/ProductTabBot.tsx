import { AnyElement } from "@/constants";
import { Box, Pressable, Text, useColorModeValue, View } from "native-base";
import React from "react";
import { Animated, Dimensions, StatusBar, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
export const ProductTabBot = () => {
    function FirstRoute() {
        return (
            <Box flex={1} my={4}>
                <Text style={{ lineHeight: 24 }}>
                    JUNO hiện đang áp dụng chính sách Đổi/Trả cho các sản phẩm như sau:
                </Text>
                <Text style={{ lineHeight: 24 }}>- Trong vòng 30 ngày kể từ ngày nhận sản phẩm Túi, Ví, Giày (Hàng Nguyên Giá)</Text>
                <Text style={{ lineHeight: 24 }}>- Trong vòng 7 ngày đối với sản phẩm Khuyến mãi</Text>
                <Text style={{ lineHeight: 24 }}>- Phụ kiện (chỉ áp dụng với mắt kính, trang sức) và túi canvas được đổi/trả trong 7 ngày trong trường hợp có lỗi sản xuất</Text>
                <Text style={{ lineHeight: 24 }}>
                    - Không áp dụng đổi trả Online với đơn hàng tại hệ thống Cửa hàng Đại lý và Cửa hàng Juno tại TTTM Sense City Phạm Văn Đồng, các Cửa Hàng Aeon Mall Bình Dương, Aeon Mall Tân Phú, Aeon Mall Bình Tân.
                </Text>
            </Box>
        )
    };

    const SecondRoute = () => (
        <Box flex={1} my="4">
            <Text style={{ lineHeight: 24 }}>
                HƯỚNG DẪN BẢO QUẢN GIÀY &gt;&gt; Xem chi tiết
            </Text>
            <Text style={{ lineHeight: 24 }}>
                HƯỚNG DẪN BẢO QUẢN TÚI XÁCH &gt;&gt; Xem chi tiết
            </Text>
            <Text style={{ lineHeight: 24 }}>
                HƯỚNG DẪN BẢO QUẢN PHỤ KIỆN &gt;&gt; Xem chi tiết
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
        { key: "first", title: "CHÍNH SÁCH ĐỔI TRẢ" },
        { key: "second", title: "HƯỚNG DẪN BẢO QUẢN" },
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
                                <Animated.Text style={{ color, fontSize: 12 }}>{route.title}</Animated.Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <View >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={{ marginTop: StatusBar.currentHeight, height: index === 0 ? 400 : 160 }}
            />
        </View>
    );
}
const styles = StyleSheet.create({

})