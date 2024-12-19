import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, Image, HStack, Link } from "native-base";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Linking, Text } from "react-native";
import { useCreateUser } from "./queryHook";
import { AnyElement } from "@/constants";
export interface ISingUp {
    email: string;
    password: string;
    confirmPassword: string;
}
type InputType = 'text' | 'password';
const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const SingUp = ({ navigation }: { navigation: NativeStackNavigationProp<AnyElement> }) => {
    const [formData, setData] = React.useState<ISingUp>({} as ISingUp);
    const [errors, setErrors] = React.useState<Partial<ISingUp>>({});
    const { mutate: createUser } = useCreateUser(() => {
        navigation.navigate('SingIn')
    });
    const fields = [
        { key: 'email', label: 'Email', type: 'text' as InputType },
        { key: 'password', label: 'Password', type: 'password' as InputType },
        { key: 'confirmPassword', label: 'Confirm Password', type: 'password' as InputType }
    ];
    const handleCallPhone = () => {
        Linking.openURL('tel:+123456789')
    }
    const validate = () => {
        let valid = true;
        let tempErrors: Partial<ISingUp> = {};

        fields.forEach(field => {
            if (!formData[field.key as keyof ISingUp]) {
                tempErrors[field.key as keyof ISingUp] = `${field.label} is required`;
                valid = false;
            }
        });
        if (formData.password && formData.password.length < 8) {
            tempErrors.password = 'Password must be at least 8 characters';
            valid = false;
        }
        if (formData.confirmPassword !== formData.password) {
            tempErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }
        if (formData.email && !regexEmail.test(formData.email)) {
            tempErrors.email = 'Email is not valid';
            valid = false;
        }
        setErrors(tempErrors);
        return valid;
    };

    const onSubmit = async () => {
        if (validate()) {
            createUser(formData);
        };
    }
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                    size="lg"
                    color="coolGray.800"
                    _dark={{ color: "warmGray.50" }}
                    fontWeight="semibold"
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    _dark={{ color: "warmGray.200" }}
                    fontWeight="medium"
                    size="xs"
                >
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    {fields.map((field) => (
                        <FormControl key={field.key} isRequired isInvalid={!!errors[field.key as keyof ISingUp]}>
                            <FormControl.Label>{field.label}</FormControl.Label>
                            <Input
                                type={field.type}
                                onChangeText={(value) =>
                                    setData({
                                        ...formData,
                                        [field.key]: value,
                                    })
                                }
                            />
                            {errors[field.key as keyof ISingUp] && (
                                <FormControl.ErrorMessage>
                                    {errors[field.key as keyof ISingUp]}
                                </FormControl.ErrorMessage>
                            )}
                        </FormControl>
                    ))}
                    <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            You already have an account.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }} onPress={() => navigation.navigate("SingIn")}>
                            Sing In
                        </Link>
                    </HStack>
                </VStack>
            </Box>
            <Box style={{ position: "relative", top: "10%", flexDirection: "column" }} justifyContent="center" alignItems="center" >
                <Box style={{ display: "flex" }} flexDirection={"row"}>
                    <FontAwesome name="shopping-bag" size={24} color="#c2292c" />
                    <Box style={{ height: "100%" }}>
                        <Image
                            style={{ width: 100, height: 30, marginLeft: 12 }}
                            resizeMode="contain"
                            alt="image" source={require("../../assets/images/logo.png")}
                        />
                    </Box>
                </Box>
                <Box style={{ display: "flex", flexDirection: "row" }} justifyContent={"center"} alignItems={"center"} marginTop={12}>
                    <FontAwesome name="phone" size={22} color="green" />
                    <Text style={{ color: "blue", marginLeft: 22 }} onPress={handleCallPhone}>
                        Contact: 0123456789
                    </Text>
                </Box>
            </Box>
        </Center>
    );
};

export default SingUp;
