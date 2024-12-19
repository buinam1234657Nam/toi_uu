import { Box } from "native-base"
import { Linking, StyleSheet, Text, View } from "react-native"
export const Contact = () => {
    return (
        <Box style={styles.container}>
            <View style={styles.contact}>
                <Text style={styles.information}>
                    GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)
                </Text>
                <Text onPress={() => Linking.openURL('tel:+18001162')} style={styles.phone}>
                    1800 1162
                </Text>
                <Text style={styles.desc}>
                    Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                </Text>
            </View>
            <View style={styles.contact}>
                <Text style={styles.information}>
                    GÓP Ý & KHIẾU NẠI (08:30 - 20:30)
                </Text>
                <Text onPress={() => Linking.openURL('tel:+18001160')} style={styles.phone}>
                    1800 1160
                </Text>
                <Text style={styles.desc}>
                    Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                </Text>
            </View>
        </Box>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    contact: {

    },
    information: {
        fontSize: 13,
        marginBottom: 13
    },
    phone: {
        fontSize: 24,
        marginBottom: 13
    },
    desc: {
        fontSize: 13,
        marginBottom: 32
    }
})