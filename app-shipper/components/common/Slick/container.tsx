import { Box, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Slick from 'react-native-slick';


const styles = StyleSheet.create({
    wrapper: {
        height: 412
    },
    slide1: {

    },
    image: {
        height: 412,
        width: '100%',
        resizeMode: 'contain',
    },
});

export const CSlick = () => {
    return (
        <Slick autoplayTimeout={4} activeDotColor="black" dotColor="white" style={styles.wrapper} autoplay showsButtons={false}>
            <Box style={styles.slide1}>
                <Image
                    alt=""
                    source={{ uri: "https://file.hstatic.net/200000584505/file/web-mb-trang-chu.jpg" }}
                    style={styles.image}
                />
            </Box>
            <Box style={styles.slide1}>
                <Image
                    alt=""
                    source={{ uri: "https://file.hstatic.net/200000584505/file/banner-mobile.jpg" }}
                    style={styles.image}
                />
            </Box>
            <Box style={styles.slide1}>
                <Image
                    alt=""
                    source={{ uri: "https://file.hstatic.net/200000584505/file/web-mobile_2.jpg" }}
                    style={styles.image}
                />
            </Box>
        </Slick>
    );
};
