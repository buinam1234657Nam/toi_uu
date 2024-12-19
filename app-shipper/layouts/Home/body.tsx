import { apiOrigin } from "@/constants";
import useGetOrder from "@/hooks/useGetAllOrder";
import useUpdateLocationShipper from "@/hooks/useUpdateLocationShipper";
import { useUpdateStatusOrder } from "@/hooks/useUpdateStatusOrder";
import axios from "axios";
import { Button, Container, Heading, HStack, ScrollView, Text, View } from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
const Body = () => {
    const { data: dataOrder } = useGetOrder();
    const { mutate: updateLocationShipper } = useUpdateLocationShipper()
    const { mutate: updateStatusOrder, isPending: loadingUpdate } = useUpdateStatusOrder((data) => {
        updateLocationShipper({ orderId: data._id, address: data.shippingAddress })
    })
    const listOrder = useMemo(() => {
        if (!dataOrder) return [];
        return dataOrder;
    }, [dataOrder]);
    const handleAcceptOrder = useCallback((id: string) => {
        updateStatusOrder({ orderStatus: 2, id })
    }, [updateStatusOrder])
    return (
        <ScrollView style={styles.container}>
            <Heading>Tổng số đơn hàng ({listOrder.length})</Heading>
            <Container maxWidth={"100%"} style={{ marginTop: 10 }}>
                {listOrder.map((item: any) => {
                    return (
                        <HStack key={item._id} style={styles.orderContainer}>
                            <View width="70%">
                                <Text style={styles.orderNo}>Đơn hàng: {item.orderNo}</Text>
                                <Text>Khách hàng: {item.customerName}</Text>
                                <Text>Điện thoại: {item.customerPhone}</Text>
                                <Text>Địa chỉ giao hàng: {item.shippingAddress}</Text>
                                <Text>Trạng thái: {item.orderStatus === 1 ? "Đang xử lý" : "Hoàn thành"}</Text>
                                <Text fontWeight={"bold"} color={"red"}>Tổng tiền: {item.totalAmount.toLocaleString()} VNĐ</Text>
                            </View>
                            <View style={{ height: "100%", display: "flex", justifyContent: "flex-end" }}>
                                {
                                    item.orderStatus !== 3 ? (
                                        <Button opacity={item.orderStatus !== 1 || loadingUpdate ? 0.5 : 1} disabled={item.orderStatus !== 1 || loadingUpdate} onPress={() => handleAcceptOrder(item._id)} style={{ height: 40 }}>
                                            {item.orderStatus === 1 ? "Nhận đơn" : "Đã nhận"}
                                        </Button>
                                    )
                                        : (
                                            <Text style={{ color: "green", fontWeight: "700" }}>Đã giao hàng</Text>
                                        )
                                }
                            </View>
                        </HStack>
                    );
                })}
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    orderContainer: {
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    orderNo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Body;
