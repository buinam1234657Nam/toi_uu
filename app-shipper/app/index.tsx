import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Home from '@/layouts/Home';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <QueryClientProvider client={queryClient}>
                        <NotifierWrapper>
                            <Stack.Navigator initialRouteName="Home">
                                <Stack.Screen
                                    name="Home"
                                    component={Home}
                                    options={{ headerShown: false }}
                                />
                            </Stack.Navigator>
                        </NotifierWrapper>
                    </QueryClientProvider>
                </SafeAreaView>
            </NativeBaseProvider>
        </GestureHandlerRootView >
    );
};

export default App;
