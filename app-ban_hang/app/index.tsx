import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Home from '@/layouts/Home';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ForgetPassword } from '@/feature/ForgetPassword/container';
import { Accounts } from '@/modules/accounts/container';
import { SafeAreaView } from 'react-native';
import SingIn from '@/feature/Singin/container';
import SingUp from '@/feature/Singup/container';
import { Cart } from '@/modules/cart/body';
import { Order } from '@/modules/order/body';
import { View } from '@/modules/view/body';
import { Payment } from '@/modules/payment';
import { ViewDetailProduct } from '@/components/common/Product/ViewDetailProduct';
import { ViewCategory } from '@/modules/view/category';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <QueryClientProvider client={queryClient}>
                        <NotifierWrapper>
                            <Stack.Navigator initialRouteName="SingIn">
                                <Stack.Screen
                                    name="Home"
                                    component={Home}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ViewDetailProduct"
                                    component={ViewDetailProduct}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="SingIn"
                                    component={SingIn}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="SingUp"
                                    component={SingUp}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ForgetPassword"
                                    component={ForgetPassword}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Accounts"
                                    component={Accounts}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen name='ViewCategory' component={ViewCategory} options={{ headerShown: false }} />
                                <Stack.Screen name='Order' component={Order} options={{ headerShown: false }} />
                                <Stack.Screen name='View' component={View} options={{ headerShown: false }} />
                                <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false }} />
                                <Stack.Screen name='Payment' component={Payment} options={{ headerShown: false }} />
                            </Stack.Navigator>
                        </NotifierWrapper>
                    </QueryClientProvider>
                </SafeAreaView>
            </NativeBaseProvider>
        </GestureHandlerRootView >
    );
};

export default App;
