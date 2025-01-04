// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';

// const MyMapCS2 = () => {
//     const specificLocation = {
//         latitude: 20.44931750742698,
//         longitude: 106.33818967583055,
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
//                     title="THẾ GIỚI ĐỒ THỜI TRANG CƠ SỞ 2"
//                     description="122 Trần Hưng Đạo,TP.Thái Bình"
//                 >
//                     <Callout>
//                         <View style={styles.calloutContainer}>
//                             <Text style={styles.calloutTitle}>THẾ GIỚI ĐỒ THỜI TRANG CƠ SỞ 2</Text>
//                             <Text style={styles.calloutDescription}>122 Trần Hưng Đạo,TP.Thái Bình</Text>
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

// export default MyMapCS2;
