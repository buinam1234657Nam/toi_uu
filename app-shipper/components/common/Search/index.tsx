import React, { useEffect, useState, useRef } from 'react';
import { Box, Input, Icon, Popover, Button, Image, Text, HStack, Heading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useGetFilterProduct } from '@/hooks/useGetFilterProduct';
import { IProduct } from '@/types';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation } from 'expo-router';

function useDebounce(text: string, delay: number) {
    const [value, setValue] = useState(text);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setValue(text);
        }, delay);
        return () => {
            clearTimeout(timerId);
        };
    }, [text, delay]);
    return value;
}
type RootStackParamList = {
    ViewDetailProduct: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export function SearchBar() {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const [inputValue, setInputValue] = useState('');
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [listDataSearch, setListDataSearch] = useState<IProduct[]>([]);
    const inputRef = useRef(null);

    const { mutate: getDataSearch } = useGetFilterProduct((data) => {
        setListDataSearch(data);
    });
    const debouncedSearchTerm = useDebounce(inputValue, 800);
    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            getDataSearch(debouncedSearchTerm);
            setIsPopoverVisible(true);
        } else {
            setIsPopoverVisible(false);
        }
    }, [debouncedSearchTerm]);
    const handleInputChange = (value: string) => {
        setInputValue(value);
    };


    return (
        <Box style={{ marginLeft: 12 }} w="80%" alignSelf="center">
            <Box w="100%">
                <Popover
                    isOpen={isPopoverVisible}
                    onClose={() => setIsPopoverVisible(false)}
                    trigger={triggerProps => (
                        <Input
                            {...triggerProps}
                            ref={inputRef}
                            placeholder="Nhập tên sản phẩm..."
                            width="100%"
                            borderRadius="4"
                            px="3"
                            fontSize="12"
                            value={inputValue}
                            onChangeText={handleInputChange}
                            height="32px"
                            InputRightElement={
                                <Icon
                                    m="2"
                                    ml="2"
                                    size="5"
                                    color="gray.400"
                                    as={<MaterialIcons name="search" />}
                                />
                            }
                        />
                    )}
                >
                    <Popover.Content top={"85px"} left={"61.3359px"} accessibilityLabel="Product Suggestions" w="269px">
                        <Popover.Arrow />
                        <Popover.Header flex={1} alignItems={"center"}>
                            <Text fontSize={16} fontWeight={"bold"}>
                                Tổng sản phẩm tìm thấy {listDataSearch.length}
                            </Text>
                        </Popover.Header>
                        <Popover.Body
                            style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                            }}
                            pt={0}
                        >
                            {listDataSearch && listDataSearch.map((item: IProduct) => (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("ViewDetailProduct", { id: item._id } as never)
                                        setIsPopoverVisible(false)
                                    }}
                                    key={item._id} style={styles.bodyPopover}>
                                    <Image
                                        width={"70px"}
                                        height={"100%"}
                                        source={{
                                            uri: item.preview[0].image,
                                        }}
                                        resizeMode="contain"
                                        alt={item.name}
                                    />
                                    <Box style={{ flex: 1, justifyContent: "center" }} w={"68%"} ml={4}>
                                        <Heading mb={1} numberOfLines={2} fontWeight={500} style={{ fontSize: 16 }} ml="-1">
                                            {item.name}
                                        </Heading>
                                        {item.sale_price ? (
                                            <HStack mt={3} flex={1} space={2}>
                                                <Text style={{ color: "red" }} fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                                                    674,000₫
                                                </Text>
                                                <Text
                                                    fontSize="xs"
                                                    style={{ color: "black", textDecorationLine: "line-through" }}
                                                    fontWeight="500"
                                                    ml="-0.5"
                                                    mt="-1"
                                                >
                                                    749,000₫
                                                </Text>
                                            </HStack>
                                        ) : (
                                            <Text
                                                fontSize="xs"
                                                style={{ color: "black", textDecorationLine: "line-through" }}
                                                fontWeight="500"
                                                ml="-0.5"
                                                mt="-1"
                                            >
                                                749,000₫
                                            </Text>
                                        )}
                                    </Box>
                                </Pressable>
                            ))}
                        </Popover.Body>
                        <Popover.Footer justifyContent="flex-end">
                            <Button.Group space={2}>
                                <Button colorScheme="coolGray" variant="ghost" onPress={() => setIsPopoverVisible(false)}>
                                    Đóng
                                </Button>
                            </Button.Group>
                        </Popover.Footer>
                    </Popover.Content>
                </Popover>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    bodyPopover: {
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#dfe0e1",
        borderBottomWidth: 1,
        height: 72,
    },
});