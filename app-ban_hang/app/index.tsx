import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import Home from "@/layouts/Home";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ForgetPassword } from "@/feature/ForgetPassword/container";
import { Accounts } from "@/modules/accounts/container";
import { SafeAreaView } from "react-native";
import SingIn from "@/feature/Singin/container";
import SingUp from "@/feature/Singup/container";
import { Cart } from "@/modules/cart/body";
import { Order } from "@/modules/order/body";
import { View } from "@/modules/view/body";
import { Payment } from "@/modules/payment";
import { ViewDetailProduct } from "@/components/common/Product/ViewDetailProduct";
import { ViewCategory } from "@/modules/view/category";
import HttpRequest from "@/utils/HttpRequest";
import { SingInService } from "@/feature/Singin/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const [initialRoute, setInitialRoute] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("access_token");
      setToken(storedToken);
      if (!storedToken) {
        setInitialRoute("SingIn");
      } else {
        //setInitialRoute("SingIn");
        setInitialRoute("Home");
      }
    };
    fetchToken();
  }, []);

  if (!initialRoute) {
    return null;
  }

  HttpRequest.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        setInitialRoute("SingIn");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  HttpRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          AsyncStorage.removeItem("access_token");
          const newAccessToken = await SingInService.refreshToken();
          AsyncStorage.setItem("access_token", newAccessToken);
          error.config.headers.authorization = `Bearer ${newAccessToken}`;
          return HttpRequest.request(error.config);
        } catch (refreshError) {
          setInitialRoute("SingIn");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <NotifierWrapper>
              <Stack.Navigator initialRouteName={initialRoute}>
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
                <Stack.Screen
                  name="ViewCategory"
                  component={ViewCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Order"
                  component={Order}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="View"
                  component={View}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Cart"
                  component={Cart}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Payment"
                  component={Payment}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NotifierWrapper>
          </QueryClientProvider>
        </SafeAreaView>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;
