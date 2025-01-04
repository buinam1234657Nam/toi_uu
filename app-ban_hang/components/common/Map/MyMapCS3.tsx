// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';

// const MyMapCS3 = () => {
//     const specificLocation = {
//         latitude: 10.795887058833166,
//         longitude: 106.64543597570335,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//     };

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 initialRegion={specificLocation}>
//                 <Marker
//                     coordinate={{
//                         latitude: specificLocation.latitude,
//                         longitude: specificLocation.longitude
//                     }}
//                     title="THẾ GIỚI ĐỒ THỜI TRANG CƠ SỞ 3"
//                     description="162Q-162R Trường Chinh,TP.Hồ Chí Minh"
//                 >
//                     <Callout>
//                         <View style={styles.calloutContainer}>
//                             <Text style={styles.calloutTitle}>THẾ GIỚI ĐỒ THỜI TRANG CƠ SỞ 3</Text>
//                             <Text style={styles.calloutDescription}>162Q-162R Trường Chinh,TP.Hồ Chí Minh</Text>
//                         </View>
//                     </Callout>
//                 </Marker>
//             </MapView>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         height: 300,
//         width: '100%',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     markerImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//     },
//     calloutContainer: {
//         width: 200,
//         padding: 10,
//         alignItems: 'center',
//     },
//     calloutImage: {
//         width: 180,
//         height: 100,
//         marginBottom: 5,
//         borderRadius: 5,
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

// export default MyMapCS3;
