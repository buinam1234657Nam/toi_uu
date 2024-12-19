import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center } from "native-base";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AnyElement } from "@/constants";
import { ISingIn } from "./services";
import { useSingIn } from "./queryHook";
const SingIn = ({ navigation }: { navigation: NativeStackNavigationProp<AnyElement> }) => {
    const [form, setForm] = React.useState<ISingIn>({} as ISingIn)
    const { mutate: singIn } = useSingIn(() => {
        navigation.navigate('Home')
    })
    const onFinish = () => {
        if (form) {
            singIn(form)
        }
    }
    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Welcome
            </Heading>
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email ID</FormControl.Label>
                    <Input
                        type="text"
                        onChangeText={(value) => {
                            setForm({ ...form, email: value })
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password"
                        onChangeText={(value) => {
                            setForm({ ...form, password: value })
                        }}
                    />
                    <Link _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                    }} alignSelf="flex-end" mt="3" onPress={() => navigation.navigate("ForgetPassword")}>
                        Forget Password?
                    </Link>
                </FormControl>
                <Button onPress={onFinish} mt="2" colorScheme="indigo">
                    Sign in
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        I'm a new user.{" "}
                    </Text>
                    <Link _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm"
                    }} onPress={() => navigation.navigate("SingUp")}>
                        Sign Up
                    </Link>
                </HStack>
            </VStack>
        </Box>
    </Center>;
};
export default SingIn
