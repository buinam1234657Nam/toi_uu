import React from 'react';
import { Box, ScrollView } from 'native-base';
import Header from '@/layouts/Header';
import Body from './body';

export default function Home() {
    return (
        <Box backgroundColor={"white"} flex={1}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <Body />
            </ScrollView>
        </Box>
    );
}

