import { Box, Text, Modal, Image, View } from "native-base"
import { Dimensions, Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useState } from "react";
import MyMapCS1 from "@/components/common/Map/MyMapCS1";
import MyMapCS2 from "@/components/common/Map/MyMapCS2";
import MyMapCS3 from "@/components/common/Map/MyMapCS3";
import MyMapOrder from "@/components/common/Map/MyMapOrder";
const screenWidth = Dimensions.get('window').width;
export const ShowRow = () => {
    const [showModalMap1, setShowModalMap1] = useState(false)
    const [showModalMap2, setShowModalMap2] = useState(false)
    const [showModalMap3, setShowModalMap3] = useState(false)
    return (
        <Box>
            <Text style={{ fontSize: 13, marginBottom: 12 }}>HỆ THỐNG SHOWROOM</Text>
            <Pressable style={{
                width: "100%",
                height: 200
            }} onPress={() => { setShowModalMap2(true) }}>
                <Image
                    alt=""
                    height={"100%"}
                    width={"100%"}
                    resizeMode="contain"
                    source={{ uri: "https://file.hstatic.net/1000003969/file/chikh_ce44b1a9f11b4cbda1d4d319967d7932.jpg" }}
                />
            </Pressable>
            <Modal isOpen={showModalMap2} onClose={() => setShowModalMap2(false)}>
                <Modal.Content width={screenWidth} minHeight="400px">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <MyMapCS2 />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Box style={{
                marginTop: 12,
            }}>
                <Text style={{
                    color: "red", fontWeight: "bold", borderBottomWidth: 2,
                    borderBottomColor: "red",
                    paddingBottom: 12,
                }}>THẾ GIỚI ĐỒ THỜI TRANG 01</Text>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <FontAwesome name="map-marker" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16 }}>Địa chỉ:122 Trần Hưng Đạo,TP.Thái Bình</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Feather name="phone-call" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "blue" }}>Hotline: 034 444 55 66</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Entypo name="old-phone" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "green" }}>Điện thoại: (028) 625.66.777</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Fontisto name="email" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "#164e63" }}>buinam7122002@gmail.com</Text>
                </View>
            </Box>

            <Pressable style={{
                width: "100%",
                height: 200,
                marginTop: 12
            }} onPress={() => { setShowModalMap1(true) }}>
                <Image
                    alt=""
                    height={"100%"}
                    width={"100%"}
                    resizeMode="contain"
                    source={{ uri: "https://file.hstatic.net/1000003969/file/2_6b6ce8a0c8d24afeb7be42cca41c3794.jpg" }}
                />
            </Pressable>
            <Modal isOpen={showModalMap1} onClose={() => setShowModalMap1(false)}>
                <Modal.Content width={screenWidth} minHeight="400px">
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text>
                            THẾ GIỚI ĐỒ THỜI TRANG 02
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <MyMapOrder id="6712aa01c433cfb63fb15475" />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Box style={{
                marginTop: 12,
            }}>
                <Text style={{
                    color: "red", fontWeight: "bold", borderBottomWidth: 2,
                    borderBottomColor: "red",
                    paddingBottom: 12,
                }}>THẾ GIỚI ĐỒ THỜI TRANG 02</Text>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <FontAwesome name="map-marker" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16 }}>Địa chỉ:236 Quang Trung,TP.Hà Nội</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Feather name="phone-call" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "blue" }}>Hotline: 1800 1160</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Entypo name="old-phone" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "green" }}>Điện thoại: (028) 625.66.888</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Fontisto name="email" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "#164e63" }}>buinam7122002@gmail.com</Text>
                </View>
            </Box>
            <Pressable style={{
                width: "100%",
                height: 200
            }} onPress={() => { setShowModalMap3(true) }}>
                <Image
                    alt=""
                    height={"100%"}
                    width={"100%"}
                    resizeMode="contain"
                    source={{ uri: "https://file.hstatic.net/1000003969/file/cvn.jpg" }}
                />
            </Pressable>
            <Modal isOpen={showModalMap3} onClose={() => setShowModalMap3(false)}>
                <Modal.Content width={screenWidth} minHeight="400px">
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text>
                            THẾ GIỚI ĐỒ THỜI TRANG 03
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <MyMapCS3 />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Box style={{
                marginTop: 12,
            }}>
                <Text style={{
                    color: "red", fontWeight: "bold", borderBottomWidth: 2,
                    borderBottomColor: "red",
                    paddingBottom: 12,
                }}>THẾ GIỚI ĐỒ THỜI TRANG 03</Text>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <FontAwesome name="map-marker" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16 }}>Địa chỉ:162Q-162R Trường Chinh,TP.Hồ Chí Minh</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Feather name="phone-call" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "blue" }}>Hotline: 1800 1160</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Entypo name="old-phone" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "green" }}>Điện thoại: (028) 625.66.999</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginTop: 12 }}>
                    <Fontisto name="email" size={16} color="black" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: "#164e63" }}>buinam7122002@gmail.com</Text>
                </View>
            </Box>
        </Box>
    )
}