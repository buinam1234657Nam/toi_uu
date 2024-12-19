import { Box, Modal } from "native-base"
import CButton from "../Button"
import { useState } from "react";
import { Dimensions } from "react-native";
import { ShowRow } from "@/layouts/Footer/ShowRoom";
const screenWidth = Dimensions.get('window').width;
export const CFindproductsatshowroom = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <Box mt={8}>
            <CButton onPress={() => { setShowModal(true) }} icon="map-marker" fontSize="13px" color="black" backgroundCustom="white" title=" TÌM SẢN PHẨM TẠI SHOWROOM" />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content width={screenWidth} minHeight="400px">
                    <Modal.CloseButton />
                    <Modal.Body>
                        {/* <ShowRow /> */}
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}