
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
const width = Dimensions.get('window').width
const BasicTimeLine = () => {
    const data = [
        {
            time: '09:00',
            title: 'Tạo mới đơn hàng',
            description:
                'Tạo mới thành công đơn hàng - 241008_427083',
        },
        {
            time: '10:45',
            title: 'Đang giao hàng',
            description:
                'Đang hàng đang trong quá trình vận chuyển đến người mua hàng',
        },
        {
            time: '12:00',
            title: 'Giao hàng thành công',
            description:
                'Đơn hàng đã được giao thành công',
        },
        {
            time: '14:00',
            title: 'Xác nhận đơn hàng',
            description:
                'Bạn đã xác nhận thành công đơn hàng - 241008_427083.',
        },
        {
            time: '16:30',
            title: 'Hoàn thành',
            description:
                'Hoàn thành đơn hàng',
        },
    ];

    return (
        <View style={styles.container}>
            <Timeline titleStyle={{ color: 'red' }} data={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        height: "auto",
    },
    title: {
        padding: 16,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default BasicTimeLine;