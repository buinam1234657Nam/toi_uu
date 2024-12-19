import { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, HStack, Button } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { appStore } from '@/store';

export const CAvatar = ({ uri, onPress }: { uri: string | null, onPress: () => void }) => {
    return (
        <HStack style={{ width: "100%", marginTop: 12 }} justifyContent="flex-start" space={2}>
            <Button style={{ backgroundColor: "transparent", paddingLeft: 0 }} onPress={onPress}>
                <Avatar
                    size="md"
                    source={uri ? { uri } : require("../../../assets/images/avatar_default.jpg")}
                />
                <AntDesign
                    style={{ position: "absolute", bottom: -2, right: 13 }}
                    name="pluscircle"
                    size={20}
                    color="black"
                />
            </Button>
        </HStack>
    );
};

function CImagePicker({ onChange }: { onChange: (url: string) => void }) {
    const { user_info } = appStore()
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onChange(result.assets[0].uri);
        }
    };

    return (
        <CAvatar onPress={pickImage} uri={image ?? user_info.avatar} />
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default CImagePicker;
