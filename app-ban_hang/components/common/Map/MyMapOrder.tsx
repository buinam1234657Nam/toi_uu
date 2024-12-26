// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, Image } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import axios from 'axios';
// import { apiOrigin } from '@/constants';

// const MyMapOrder = ({ id }: { id: string }) => {
//     const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
//     const startPoint = {
//         latitude: 20.965213089957036,
//         longitude: 105.76567397584012,
//     };
//     const [location, setLocation] = useState(startPoint);
//     const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//     const [orderStatus, setOrderStatus] = useState<number | null>(null);
//     const fetcherDataEndpoint = async () => {
//         try {
//             const response = await axios.get(`${apiOrigin}/order/orderByOrderId/${id}`);
//             if (response.data) {
//                 setDestination(response.data.endShipperLocation);
//                 const newOrderLocation = response.data.shipperLocation;
//                 setOrderLocation(newOrderLocation);
//                 setOrderStatus(response.data.orderStatus);
//             } else {
//                 return;
//             }
//         } catch (error) {
//             return;
//         }
//     };
//     useEffect(() => {
//         let interval: NodeJS.Timeout;
//         interval = setInterval(() => {
//             fetcherDataEndpoint();
//         }, 3000);
//         if (orderStatus === 3) {
//             clearInterval(interval);
//         }
//     }, []);
//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: startPoint.latitude,
//                     longitude: startPoint.longitude,
//                     latitudeDelta: 1.2,
//                     longitudeDelta: 1.2,
//                 }}>
//                 <Marker
//                     coordinate={location}
//                     title="Vị trí cửa hàng"
//                     description="Xe máy đang di chuyển"
//                 >
//                     <Callout>
//                         <View style={styles.calloutContainer}>
//                             <Text style={styles.calloutTitle}>THẾ GIỚI ĐỒ THỜI TRANG CƠ SỞ 2</Text>
//                             <Text style={styles.calloutDescription}>236 Quang Trung, TP.Hà Nội</Text>
//                         </View>
//                     </Callout>
//                 </Marker>
//                 {destination && (
//                     <Marker
//                         coordinate={destination}
//                         title="Điểm đến"
//                     >
//                         <Callout>
//                             <View style={styles.calloutContainer}>
//                                 <Text style={styles.calloutTitle}>Điểm đến</Text>
//                             </View>
//                         </Callout>
//                     </Marker>
//                 )}
//                 {orderLocation && (
//                     <Marker
//                         coordinate={orderLocation}
//                         title="Vị trí đơn hàng"
//                         description="Vị trí hiện tại của shipper"
//                     >
//                         <Image
//                             source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_rleAz_QIaQiSjSFA-AtFxs4Mq68wJrG-g&s" }}
//                             style={{ width: 20, height: 20 }}
//                         />
//                         <Callout>
//                             <View style={styles.calloutContainer}>
//                                 <Text style={styles.calloutTitle}>Vị trí đơn hàng</Text>
//                                 <Text style={styles.calloutDescription}>Đơn hàng đang ở đây</Text>
//                             </View>
//                         </Callout>
//                     </Marker>
//                 )}
//             </MapView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//         width: "100%",
//         height: 300
//     },
//     calloutContainer: {
//         width: 200,
//         padding: 10,
//         alignItems: 'center',
//     },
//     calloutTitle: {
//         fontWeight: 'bold',
//         fontSize: 14,
//         marginBottom: 5,
//     },
//     calloutDescription: {
//         fontSize: 12,
//     },
// });

// export default MyMapOrder;
