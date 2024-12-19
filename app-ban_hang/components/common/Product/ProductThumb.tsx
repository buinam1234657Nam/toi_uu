import React from 'react';
import { HStack, Box, Image, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import { IImages } from './ViewDetailProduct';

const ProductThumb = ({
    images,
    currentIndex,
    setCurrentIndex
}: {
    images: IImages[],
    currentIndex: number,
    setCurrentIndex: (index: number) => void
}) => {
    const handlePress = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <HStack px={2} mt={6} justifyContent="flex-start" width="100%" flexWrap="wrap">
            {images.map((item: IImages, index: number) => (
                <Pressable mr={"7px"} w={"18%"} key={item.id} onPress={() => handlePress(index)}>
                    <Box
                        w={"100%"}
                        overflow="hidden"
                        mb={3}
                        borderWidth={currentIndex === index ? 2 : 0}
                        borderColor={currentIndex === index ? "#333333" : "transparent"}
                        borderRadius={currentIndex === index ? 4 : 0}
                    >
                        <Image
                            style={styles.img}
                            alt=""
                            resizeMode="cover"
                            source={{ uri: item.url }}
                        />
                    </Box>
                </Pressable>
            ))}
        </HStack>
    );
};

export default ProductThumb;
const styles = StyleSheet.create({
    img: {
        width: 69,
        height: 102
    }
})