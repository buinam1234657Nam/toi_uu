import BasicTimeLine from "@/components/common/Timeline";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router";
import { Box, Button, Image, Modal, ScrollView, Text, View } from "native-base"
import { Dimensions, Pressable, StyleSheet, TouchableOpacity } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import useGetOrder from "./hook/getOrder";
import { appStore } from "@/store";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/constants";
//import MyMapOrder from "@/components/common/Map/MyMapOrder";

type RootStackParamList = {
    Home: undefined;
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Order = () => {
    const width = Dimensions.get('window').width
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const { user_info } = appStore()
    const { data: dataOrder, isPending: loadingOrder } = useGetOrder(user_info._id)
    const listOrder = useMemo(() => {
        if (!dataOrder) return []
        return dataOrder
    }, [dataOrder])

    const [hiddenModal, setHiddenModal] = useState<boolean>(false);
    const [showModalMap, setShowModalMap] = useState<boolean>(false);
    return (
        <Box style={styles.container}>
            <ScrollView flex={1}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Ionicons name="arrow-back" size={24} color="#ee4d2d" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Đơn hàng</Text>
                </View>
                {listOrder.map((item: any, index: number) => {
                    return (
                        <Box key={item.orderNo} marginTop={4} marginBottom={3} paddingX={5}>
                            <View paddingX={4} paddingY={2} style={{ borderWidth: 1, borderColor: '#d9d8d3', borderRadius: 8, display: "flex", flexDirection: "row" }}>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <Text style={{ color: "#97a7ae", fontSize: 14, fontWeight: "bold" }}>{item.orderNo}</Text>
                                    <Text style={{ color: "#98adba", fontSize: 14, fontWeight: "bold" }}>{item.orderStatus === 1 ? "Chờ lấy hàng" : item.orderStatus === 2 ? "Đang giao hàng" : "Đã giao hàng"}</Text>
                                    <Text style={{ fontSize: 13 }}>{item.customerName}</Text>
                                    <Text style={{ fontSize: 13 }}>{item.customerPhone}</Text>
                                    <Text style={{ fontSize: 13 }}>{item.shippingAddress}</Text>
                                    <Text style={{ fontSize: 13 }}>Chuyển khoản</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "red" }}>{formatCurrency(item.totalAmount)}</Text>
                                </View>
                                <Box marginLeft={4}>
                                    <Button onPress={() => setHiddenModal(true)} style={{ marginRight: 12 }}>Chi tiết</Button>
                                    <Modal isOpen={hiddenModal} onClose={() => setHiddenModal(false)}>
                                        <Modal.Content width={width} minHeight="400px">
                                            <Modal.CloseButton />
                                            <Modal.Header>
                                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chi tiết đơn hàng</Text>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Box width={width} height={"100%"}> <BasicTimeLine /></Box>
                                            </Modal.Body>
                                        </Modal.Content>
                                    </Modal>
                                    {item.orderStatus === 2 ?
                                        (
                                            <>
                                                <Button mt={2} onPress={() => setShowModalMap(true)}>
                                                    Xem vị trí
                                                </Button>
                                                <Modal isOpen={showModalMap} onClose={() => setShowModalMap(false)}>
                                                    <Modal.Content width={width} minHeight="400px">
                                                        <Modal.CloseButton />
                                                        <Modal.Header>
                                                            <Text>
                                                                Thông tin giao hàng
                                                            </Text>
                                                        </Modal.Header>
                                                        <Modal.Body style={{
                                                            width: width,
                                                            height: "100%"
                                                        }}>
                                                            {item._id && <MyMapOrder id={item._id} />}
                                                        </Modal.Body>
                                                    </Modal.Content>
                                                </Modal>
                                            </>
                                        ) : null}
                                </Box>
                            </View>
                        </Box>
                    )
                })}
            </ScrollView>
        </Box >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerAction: {
        color: '#ee4d2d',
    },
});
