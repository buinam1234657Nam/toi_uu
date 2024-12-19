import { Box } from "native-base"
import { StyleSheet, Text } from "react-native"
import { ItemCategory } from "./Item"

export const Category = () => {
    return (
        <Box marginBottom={6} >
            <Text style={styles.text}>Danh Mục Sản Phẩm</Text>
            <Box marginTop={4}>
                <ItemCategory />
            </Box>
        </Box>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: '700',
    }
})