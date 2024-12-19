

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyleSheet, FlatList, Dimensions, ListRenderItem, View } from 'react-native';
import { Box, Image } from 'native-base';
import { IImages } from './ViewDetailProduct';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        height: 360,
    },
    image: {
        height: 360,
        width: width,
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center'
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    paginationDotActive: { backgroundColor: 'blue' },
    paginationDotInactive: { backgroundColor: 'gray' },
});

export const SlickReviewProduct = ({
    images,
    currentIndex,
}: {
    images: IImages[],
    currentIndex: number,
}) => {
    const flatListRef = useRef<FlatList<IImages>>(null);
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    useEffect(() => {
        if (flatListRef.current && images.length > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: false });
        }
        setActiveIndex(currentIndex);
    }, [currentIndex, images]);

    const renderItem: ListRenderItem<IImages> = useCallback(({ item }) => (
        <Box>
            <Image
                alt=""
                source={{ uri: item.url }}
                style={styles.image}
                resizeMode="cover"
            />
        </Box>
    ), []);

    const getItemLayout = useCallback((data: IImages[] | null | undefined, index: number) => ({
        length: width,
        offset: width * index,
        index,
    }), []);

    const keyExtractor = useCallback((item: IImages) => item.id, []);

    const handleScroll = useCallback((event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    }, []);

    const renderPagination = () => {
        return (
            <View style={styles.pagination}>
                {images.map((_, i) => {
                    return (
                        <View
                            key={i}
                            style={[
                                styles.paginationDot,
                                i === activeIndex ? styles.paginationDotActive : styles.paginationDotInactive
                            ]}
                        />
                    )
                })}
            </View>
        );
    }

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.wrapper}
                getItemLayout={getItemLayout}
                initialScrollIndex={currentIndex}
                onScroll={handleScroll}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
                    });
                }}
            />
            {renderPagination()}
        </View>
    );
};