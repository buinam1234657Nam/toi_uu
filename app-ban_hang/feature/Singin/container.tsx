import { AnyElement } from "@/constants";
import basicXSSSanitizer from "@/utils/basicXSSSanitizer";
import { MaterialIcons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as LocalAuthentication from 'expo-local-authentication';
import validator from 'validator';

import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input,
    Link,
    Text,
    VStack,
} from "native-base";
import * as React from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useSingIn } from "./queryHook";
import { ISingIn } from "./services";

const SignIn = ({ navigation }: { navigation: NativeStackNavigationProp<AnyElement> }) => {
    const [form, setForm] = React.useState<ISingIn>({} as ISingIn);
    const [errors, setErrors] = React.useState<{ email?: string, password?: string }>({});
    const { mutate: signIn } = useSingIn(() => {
        navigation.navigate('Home');
    });

    const validate = () => {
        let valid = true;
        let newErrors: { email?: string, password?: string } = {};
        if (!form.email) {
            newErrors.email = "Email is required"
            valid = false;
        } else if (!validator.isEmail(form.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const onFinish = async () => {
        if (validate()) {
            try {
              signIn(form);
            } catch (error) {
                 console.error('Error encrypting form data:', error);
            }
        }
    };
    const handleBiometricAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware && supportedAuthTypes.length > 0 && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with Fingerprint',
                fallbackLabel: 'Enter Password',
            });
            if (result.success) {
                 const infoDevice = Device.osName + ' ' + Device.osVersion + ' ' + Device.modelName;
                signIn({ infoDevice: infoDevice });
            } else {
                console.log('Authentication failed');
            }
        } else {
            console.log('Biometric authentication is not available');
        }
    };

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl isInvalid={'email' in errors}>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input
                            type="text"
                            onChangeText={(value) => {
                                setForm({ ...form, email: basicXSSSanitizer(value) });
                                setErrors({ ...errors, email: undefined });
                            }}
                        />
                        {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={'password' in errors}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(value) => {
                                setForm({ ...form, password: basicXSSSanitizer(value) });
                                setErrors({ ...errors, password: undefined });
                            }}
                        />
                        {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
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
                    <Button onPress={handleBiometricAuth} mt="2" colorScheme="indigo" leftIcon={<Icon as={MaterialIcons} name="fingerprint" size="sm" />}>
                        Sign in with Fingerprint
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
        </Center>
    );
};

export default SignIn;