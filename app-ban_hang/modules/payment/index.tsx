import { StyleSheet } from "react-native"
import { Text, HStack, Pressable, Box, Image, Heading, ScrollView, Popover, FormControl, Input, Select, VStack } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CButton from "@/components/common/Button";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appStore } from "@/store";
import { AnyElement, formatCurrency } from "@/constants";
import useCreatePayment from "./hook/useCreatePayment";
type RootStackParamList = {
    Home: undefined;
};
type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;


interface District {
    name: string;
    code: number;
}

export const Payment = () => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<AnyElement | null>(null);
    const { listPayment, user_info } = appStore()
    const router = useRouter();
    const { control, handleSubmit } = useForm();

    useEffect(() => {
        const handleDeepLink = (event: any) => {
            const url = event.url;
        };
    }, []);

    const getCities = async () => {
        const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        return res.data.data;
    };


    const { data: cities, isLoading: loadingCities } = useQuery({
        queryKey: ["cities"],
        queryFn: getCities
    });

    const queryClient = useQueryClient();

    const getDistricts = async (cityCode: number) => {
        const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${cityCode}.htm`);
        return res.data.data;
    };

    const { mutate: fetchDistricts, data: districtData, isPending: loadingDistrict } = useMutation({
        mutationFn: getDistricts,
        onSuccess: (data) => {
            queryClient.setQueryData(['districts', selectedCity?.code], data.districts);
        },
    });
    const { mutate: createPayment } = useCreatePayment((data) => {
        if (data.data.order_url) {
            router.push(data.data.order_url);
        }
    })
    const amount = useMemo(() => {
        if (listPayment.length === 0) return 0;
        return listPayment.reduce((total, item) => {
            const price = item.detail.sale_price ?? item.detail.real_price;
            return total + price * item.quantity;
        }, 0)
    }, [listPayment])
    const handleCityChange = (cityName: string) => {
        const city = cities.find((c: any) => c.name === cityName);
        if (city) {
            setSelectedCity(city);
            fetchDistricts(city.id);
        }
    };
    const onSubmit = (data: any) => {
        const dataAdress = `${data.city},${data.district},${data.address}`
        createPayment({
            user_id: `${user_info._id} - ${data.name}`,
            amount: amount,
            items: listPayment,
            address: dataAdress,
            phone: data.phone
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
                                    Thanh toán
                                </Text>
                            </Box>
                        </Pressable>
                    </HStack>
                </Box>
                <Box>
                    {listPayment && listPayment.map((item) => {
                        return (
                            <Box key={item._id} style={styles.container}  >
                                <Image
                                    width={"100px"}
                                    height={"100%"}
                                    source={{
                                        uri: item.detail.preview.image
                                    }}
                                    resizeMode='cover'
                                    alt="Ảnh sản phẩm" />
                                <Box w={"68%"} ml={8}>
                                    <Heading numberOfLines={1} fontWeight={500} style={{ fontSize: 14 }} ml="-1">
                                        {item.detail.name}
                                    </Heading>
                                    <HStack mt={4} flex={1} justifyContent={"space-between"} space={2}>
                                        {
                                            item.detail.sale_price ? (
                                                <Box display={"flex"} flexDirection={"row"}>
                                                    <Text style={{ color: "red" }} fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                                                        {formatCurrency(item.detail.sale_price)}
                                                    </Text>
                                                    <Text fontSize="xs" marginLeft={"10px"} style={{ color: "black", textDecorationLine: "line-through" }} fontWeight="500" ml="-0.5" mt="-1">
                                                        {formatCurrency(item.detail.real_price)}
                                                    </Text>
                                                </Box>
                                            ) : (
                                                <Text fontSize="xs" marginLeft={"10px"} style={{ color: "black", textDecorationLine: "line-through" }} fontWeight="500" ml="-0.5" mt="-1">
                                                    {formatCurrency(item.detail.real_price)}
                                                </Text>
                                            )
                                        }
                                        <Text marginRight={8} style={{ color: "red" }} fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                                            x{item.quantity}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                {/* Phuong thuc thanh toan va van chuyen */}
                <VStack space={4} p={4}>
                    <Text color="#06b6d4">Phương thức vận chuyển (Vận chuyển nhanh)</Text>

                    <HStack justifyContent="space-between" alignItems="center">
                        <HStack alignItems="center">
                            <FontAwesome name="dollar" size={16} color="red" />
                            <Text ml={2}>Phương thức</Text>
                        </HStack>
                        <Controller
                            control={control}
                            name="paymentMethod"
                            defaultValue="Thanh toán khi nhận hàng"
                            render={({ field: { onChange, value } }) => (
                                <Popover
                                    onClose={() => setIsOpen(false)}
                                    isOpen={isOpen}
                                    trigger={triggerProps => (
                                        <Pressable {...triggerProps} onPress={() => setIsOpen(true)} flexDirection="row" alignItems="center">
                                            <Text>{value}</Text>
                                            <SimpleLineIcons name="arrow-down" size={16} color="black" ml={2} />
                                        </Pressable>
                                    )}
                                >
                                    <Popover.Content w="56">
                                        <Popover.Body p={0}>
                                            <Pressable onPress={() => {
                                                onChange("Thanh toán khi nhận hàng");
                                                setIsOpen(false);
                                            }} flexDirection="row" justifyContent="space-between" alignItems="center" p={2} borderBottomWidth={1} borderBottomColor="#dfe0e1">
                                                <Text>Thanh toán khi nhận hàng</Text>
                                                <FontAwesome name="money" size={24} color="black" />
                                            </Pressable>
                                            <Pressable onPress={() => {
                                                onChange("Chuyển khoản");
                                                setIsOpen(false);
                                            }} flexDirection="row" justifyContent="space-between" alignItems="center" p={2}>
                                                <Text>Chuyển khoản</Text>
                                                <MaterialIcons name="payment" size={24} color="black" />
                                            </Pressable>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover>
                            )}
                        />
                    </HStack>
                </VStack>

                {/* Payment Details */}
                <VStack space={2} p={4} borderBottomWidth={1} borderBottomColor="#dfe0e1">
                    <Heading size="sm">CHI TIẾT THANH TOÁN</Heading>
                    <HStack justifyContent="space-between">
                        <Text>Tiền hàng</Text>
                        <Text fontWeight="bold">{formatCurrency(amount)}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text>Phí giao hàng</Text>
                        <Text fontWeight="bold">0đ</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text>Mã giảm giá</Text>
                        <Text fontWeight="bold">0đ</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold">Tổng thanh toán</Text>
                        <Text color="red.500" fontWeight="bold">{formatCurrency(amount)}</Text>
                    </HStack>
                </VStack>

                {/* Contact Information */}
                <VStack space={2}>
                    <Box bg="#d4d4d8" p={2}>
                        <Text fontWeight="bold">Liên hệ</Text>
                    </Box>
                    <VStack space={2} p={4}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: 'Tên là bắt buộc' }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error}>
                                    <Input
                                        placeholder="Tên"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            const sanitizedValue = DOMPurify.sanitize(text);
                                            onChange(sanitizedValue);
                                        }}
                                        value={value}
                                        variant="underlined"
                                    />
                                    <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            rules={{ required: 'Số điện thoại là bắt buộc' }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error}>
                                    <Input
                                        placeholder="Số điện thoại"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            const sanitizedValue = DOMPurify.sanitize(text);
                                            onChange(sanitizedValue);
                                        }}
                                        value={value}
                                        variant="underlined"
                                    />
                                    <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />
                    </VStack>
                </VStack>

                {/* Address Information */}
                <VStack space={2}>
                    <Box bg="#d4d4d8" p={2}>
                        <Text fontWeight="bold">Địa chỉ</Text>
                    </Box>
                    <VStack space={2} p={4}>
                        <Controller
                            control={control}
                            name="city"
                            rules={{ required: 'Thành phố là bắt buộc' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error}>
                                    <Select
                                        selectedValue={value}
                                        onValueChange={(itemValue) => {
                                            const sanitizedValue = DOMPurify.sanitize(itemValue);
                                            onChange(sanitizedValue);
                                            handleCityChange(itemValue);
                                        }}
                                        placeholder="Thành phố"
                                    >
                                        {loadingCities ? (
                                            <Select.Item label="Loading..." value="" />
                                        ) : (
                                            cities.map((city: AnyElement) => (
                                                <Select.Item key={city.id} label={city.name_en} value={city.name} />
                                            ))
                                        )}
                                    </Select>
                                    <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="district"
                            rules={{ required: 'Quận/Huyện là bắt buộc' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error}>
                                    <Select
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        placeholder="Quận/Huyện"
                                    >
                                        {districtData ? (
                                            districtData.map((district: District) => (
                                                <Select.Item key={district.code} label={district.name} value={district.name} />
                                            ))
                                        ) : (
                                            <Select.Item label="Loading..." value="" />
                                        )}
                                    </Select>
                                    <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="address"
                            rules={{ required: 'Địa chỉ là bắt buộc' }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error}>
                                    <Input
                                        placeholder="Tên đường, Tòa nhà, Số nhà"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            const sanitizedValue = DOMPurify.sanitize(text);
                                            onChange(sanitizedValue);
                                        }}
                                        value={value}
                                        variant="underlined"
                                    />
                                    <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
                                </FormControl>
                            )}
                        />
                    </VStack>
                </VStack>
                {/* Liên hệ */}

                <Box p={4}>
                    <CButton title="Đặt hàng" onPress={handleSubmit(onSubmit)} />
                </Box>
            </ScrollView >
        </Box >
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#dfe0e1",
        borderBottomWidth: 1,
        height: 90,
        width: "100%"
    }
})


