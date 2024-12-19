import { HStack, Spinner } from "native-base";

export const CSpinner = () => {
    return (
        <HStack space={8} justifyContent="center" alignItems="center">
            <Spinner size={"lg"} color="#000000" />
        </HStack>
    )
};