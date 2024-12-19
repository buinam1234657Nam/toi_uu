import { Text, Icon, HStack, Center, Pressable, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type RootStackParamList = {
    Home: undefined;
    Cart: undefined;
    Accounts: undefined;
    View: undefined;
    Order: undefined
};

type FooterAppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FooterAppBar = () => {
    const navigation = useNavigation<FooterAppBarNavigationProp>();
    const [selected, setSelected] = React.useState(0);

    return (
        <Box bg="white" safeAreaTop width="100%" alignSelf="center">
            <HStack height={60} style={{ backgroundColor: "#e11d48" }} alignItems="center" safeAreaBottom shadow={6}>
                <Pressable
                    opacity={selected === 0 ? 1 : 0.5}
                    py="3"
                    flex={1}
                    onPress={() => {
                        navigation.navigate('Home');
                        setSelected(0);
                    }}
                >
                    <Center>
                        <Icon as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="lg" />
                        <Text color="white" fontSize="12">
                            Home
                        </Text>
                    </Center>
                </Pressable>
                {/* <Pressable
                    opacity={selected === 0 ? 1 : 0.5}
                    py="3"
                    flex={1}
                    onPress={() => {
                        navigation.navigate('View');
                        setSelected(0);
                    }}
                >
                    <Center>
                        <Icon as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="lg" />
                        <Text color="white" fontSize="12">
                            View
                        </Text>
                    </Center>
                </Pressable> */}
                <Pressable
                    opacity={selected === 2 ? 1 : 0.6}
                    py="2"
                    flex={1}
                    onPress={() => {
                        navigation.navigate('Cart');
                        setSelected(2);
                    }}
                >
                    <Center>
                        <Icon as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="lg" />
                        <Text color="white" fontSize="12">
                            Cart
                        </Text>
                    </Center>
                </Pressable>
                <Pressable
                    opacity={selected === 3 ? 1 : 0.5}
                    py="2"
                    flex={1}
                    onPress={() => {
                        navigation.navigate('Accounts');
                        setSelected(3);
                    }}
                >
                    <Center>
                        <Icon as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="lg" />
                        <Text color="white" fontSize="12">
                            Account
                        </Text>
                    </Center>
                </Pressable>
                <Pressable
                    opacity={selected === 2 ? 1 : 0.6}
                    py="2"
                    flex={1}
                    onPress={() => {
                        navigation.navigate('Order');
                        setSelected(2);
                    }}
                >
                    <Center>
                        <Icon as={<FontAwesome6 name={'cart-flatbed'} />} color="white" size="lg" />
                        <Text color="white" fontSize="12">
                            Đơn hàng
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    );
};
