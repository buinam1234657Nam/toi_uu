import { Box, View } from "native-base"
import { Text } from "react-native"

export const PolicyProduct = () => {
    return (
        <Box mt={6}>
            <View>
                <Text  >
                    MIỄN PHÍ GIAO HÀNG TOÀN QUỐC
                </Text>
                <Text style={{ fontSize: 12, color: "#252a2b", marginTop: 8 }} >
                    (Cho hóa đơn từ 300.000đ)
                </Text>
            </View>
            <View mt={4} >
                <Text  >
                    ĐỔI TRẢ DỄ DÀNG
                </Text>
                <Text style={{ fontSize: 12, color: "#252a2b", marginTop: 8, lineHeight: 18 }} >
                    (Đổi trả 30 ngày cho Giày và Túi; 7 ngày cho Phụ kiện nếu lỗi nhà sản xuất)
                </Text>
            </View>
            <View mt={4} >
                <Text  >
                    TỔNG ĐÀI BÁN HÀNG 1800 1162
                </Text>
                <Text style={{ fontSize: 12, color: "#252a2b", marginTop: 8 }} >
                    (Miễn phí từ 8:00 - 21:00 mỗi ngày)
                </Text>
            </View>
        </Box>
    )
}