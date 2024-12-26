import React, { useEffect, useState } from "react";
import CImagePicker from "@/components/common/ImagePicker";
import { Box, Button, FormControl, Heading, HStack, Input, Pressable, ScrollView, Text } from "native-base";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { appStore } from "@/store";
import useUpdateAccount from "./hook/useUpdateAccount";
import useGetUserDetail from "@/hooks/useGetUserDetail";
import { AlertTypes, Notification } from "@/components/Notification";
type RootStackParamList = {
    Home: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const Accounts = () => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const { user_info } = appStore();
    const { mutate: detailUser } = useGetUserDetail()
    const { mutate: updateAccount } = useUpdateAccount(() => {
        detailUser(user_info._id)
        navigation.goBack()
    })
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        oldPassword: "",
        newPassword: "",
        avatar: null,
    });

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };
    useEffect(() => {
        if (user_info) {
            setForm({
                ...form,
                name: user_info.name,
                email: user_info.email,
                address: user_info.address,
                phoneNumber:user_info.phone
            })
        }
    }, [user_info])
    const handleSubmit = async () => {
        if(String(form.newPassword) === String(form.oldPassword)){
            Notification({
                description:"Mật khẩu cũ và mới không được trùng nhau",
                alertType: AlertTypes.ERROR
            })
            return;
        }
        updateAccount({
            _id: user_info._id,
            name:form.name,
            password: form.oldPassword,
            avatar:form.avatar,
            phone:form.phoneNumber,
            address:form.address,
            newPassWord: form.newPassword,
            email:form.email
        })
    };

    return (
        <Box flex={1}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box bg="white" safeAreaTop width="100%" alignSelf="center">
                    <HStack height={60} style={{ backgroundColor: "white" }} alignItems="center" safeAreaBottom shadow={6}>
                        <Pressable
                            py="3"
                            flex={1}
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                        >
                            <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }} paddingX={4}>
                                <AntDesign name="arrowleft" size={24} color="#ee4d2d" />
                                <Text pr={"20px"} flex={1} textAlign={"center"} color="black" fontWeight={"bold"} fontSize="20">
                                    Thông tin tài khoản
                                </Text>
                            </Box>
                        </Pressable>
                    </HStack>
                </Box>
                <Box style={styles.container}>
                    <Heading style={{ fontSize: 16, marginBottom: 24 }}>
                        THÔNG TIN TÀI KHOẢN
                    </Heading>
                    <Box style={{ marginTop: 12 }}>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Tên</FormControl.Label>
                            <Input
                                variant="underlined"
                                placeholder="Tên"
                                value={form.name}
                                onChangeText={(value) => handleChange('name', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Email</FormControl.Label>
                            <Input
                                variant="underlined"
                                placeholder="Email"
                                value={form.email}
                                onChangeText={(value) => handleChange('email', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Địa chỉ</FormControl.Label>
                            <Input
                                variant="underlined"
                                placeholder="Địa chỉ"
                                value={form.address}
                                onChangeText={(value) => handleChange('address', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Số điện thoại</FormControl.Label>
                            <Input
                                variant="underlined"
                                placeholder="Số điện thoại"
                                value={form.phoneNumber}
                                onChangeText={(value) => handleChange('phoneNumber', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Mật khẩu cũ</FormControl.Label>
                            <Input
                                type="password"
                                variant="underlined"
                                placeholder="Mật khẩu cũ"
                                value={form.oldPassword}
                                onChangeText={(value) => handleChange('oldPassword', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={4}>Mật khẩu mới</FormControl.Label>
                            <Input
                                type="password"
                                variant="underlined"
                                placeholder="Mật khẩu mới"
                                value={form.newPassword}
                                onChangeText={(value) => handleChange('newPassword', value)}
                            />
                        </FormControl>
                        <FormControl mb="5">
                            <FormControl.Label mb={1}>Ảnh đại diện</FormControl.Label>
                            <CImagePicker onChange={(value) => {
                                handleChange('avatar', value)
                            }} />
                        </FormControl>
                        <Box style={styles.buttonContainer}>
                            <Button style={styles.button} onPress={handleSubmit}>
                                Cập Nhật Thông Tin
                            </Button>
                            <Button
                                style={[styles.button, { width: "30%", marginLeft: 24 }]}
                                onPress={() => navigation.goBack()}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: "row",
    },
    button: {
        backgroundColor: "black",
        color: "white",
        fontSize: 18,
        width: "48%",
    },
});