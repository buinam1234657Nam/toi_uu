import React, { useEffect, useMemo } from 'react';
import { Box, ScrollView } from 'native-base';
import Header from '@/layouts/Header';
import AppBar from '../AppBar';
import { CSlick } from '@/components/common/Slick/container';
import { Category } from '@/modules/categoty/container';
import { Trending } from '../Trending';
import { Footer } from '../Footer/container';
import { FooterAppBar } from '../FooterAppBar';
import { useGetProductNew } from '@/hooks/useGetProductNew';
import { useGetProductSale } from '@/hooks/useGetProductSale';
import { useGetProductDiscount } from '@/hooks/useGetProductDiscount';
import { appStore } from '@/store';
import { useGetCartByUserId } from '@/modules/cart/hook/getCartByUserId';
// import MyMapCS1 from '@/components/common/Map/MyMapCS1';
// import MyMapCS2 from '@/components/common/Map/MyMapCS2';
// import MyMapCS3 from '@/components/common/Map/MyMapCS3';

export default function Home() {
    const { data: listProductNew, isFetching: loadingProductNew } = useGetProductNew({ page: 0, limit: 4 }, true)
    const { data: listProductSale, isFetching: loadingProductSale } = useGetProductSale({ page: 0, limit: 4 }, true)
    const { data: listProductDiscount, isFetching: loadingProductDiscount } = useGetProductDiscount({ page: 0, limit: 4 }, true)
    const { user_info, setCartInfo } = appStore()
    const { data: getCartById } = useGetCartByUserId(user_info._id)
    const dataProductNew = useMemo(() => {
        if (listProductNew) return listProductNew.docs;
        return [];
    }, [listProductNew])
    const dataProductSale = useMemo(() => {
        if (listProductSale) return listProductSale.docs;
        return [];
    }, [listProductSale])
    const dataProductDiscount = useMemo(() => {
        if (listProductDiscount) return listProductDiscount.docs;
        return [];
    }, [listProductDiscount])
    useEffect(() => {
        if (Array.isArray(getCartById)) {
            setCartInfo(getCartById)
        } else if (getCartById) {
            setCartInfo([getCartById])
        } else {
            setCartInfo([])
        }
    }, [getCartById])
    return (
        <Box backgroundColor={"white"} flex={1}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <AppBar />
                <CSlick />
                <Box marginTop={4} marginBottom={3} paddingX={5}>
                    <Category />
                    <Trending type='new' loading={loadingProductNew} data={dataProductNew} title='Top Sản Phẩm Mới Nhất' total={listProductNew?.totalDocs ?? 0} />
                    <Trending type='sale' loading={loadingProductSale} data={dataProductSale} title='Top Sản Phẩm Bán Chạy Nhất' total={listProductSale?.totalDocs ?? 0} />
                    <Trending type='discount' loading={loadingProductDiscount} data={dataProductDiscount} title='Top Sản Phẩm Sale' total={listProductDiscount?.totalDocs ?? 0} />
                    <Footer />
                </Box>
            </ScrollView>
            <FooterAppBar />
        </Box>
    );
}

