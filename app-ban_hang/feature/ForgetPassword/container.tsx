import React from 'react';
import { VStack, Button, FormControl, Box, Text } from 'native-base';
import { useForgotPassword } from './queryHook';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { AnyElement } from '@/constants';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
interface IForgetPassword {
    email: string
}
export const ForgetPassword = ({ navigation }: { navigation: NativeStackNavigationProp<AnyElement> }) => {
    const [formData, setData] = React.useState<IForgetPassword>();
    const { mutate: forgotPassWord } = useForgotPassword(() => navigation.navigate("SingIn"))
    const [error, setError] = React.useState<boolean>(false)
    const onSubmit = () => {
        if (!formData?.email) {
            setError(true)
        }
        else {
            setError(false)
            forgotPassWord(formData)
        }
    };
    return (
        <>
            <Text style={{ fontSize: 20, marginLeft: 30, fontWeight: "500", marginBottom: 16, marginTop: 16 }}>Forgot Password?</Text>
            <Box flex="1" alignItems="center">
                <VStack flex={1} alignItems={"center"} mx="3" minW="300px">
                    <FormControl isRequired>
                        <FormControl.Label _text={{
                            bold: true
                        }}>Email</FormControl.Label>
                        <TextInput style={styles.input} placeholder="Email@gmail.com" onChangeText={value => setData({
                            ...formData,
                            email: value
                        })} />
                    </FormControl>
                    {error && <Text style={styles.error}>Email is required</Text>}
                    <Button padding={"10px"} minW={100} onPress={onSubmit} mt="5" colorScheme="cyan">
                        Submit
                    </Button>
                </VStack>
            </Box>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    error: {
        color: "red",
        position: "relative",
        right: 92
    }
}
)