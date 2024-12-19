import React from 'react';
import { Easing, Notifier } from 'react-native-notifier';
import { Text, View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
export enum AlertTypes {
    ERROR = 'error',
    SUCCESS = 'success',
}
interface Props {
    description?: string;
    alertType: string;
}
export const Notification = ({ description, alertType }: Props) => {
    return (
        Notifier.showNotification({
            onPress: () => {
                Notifier.hideNotification();
            },
            description: description,
            duration: 2000,
            showAnimationDuration: 500,
            showEasing: Easing.bounce,
            hideOnPress: true,
            Component: CustomAlert,
            componentProps: {
                alertType: alertType,
            },
        })
    )
}
const CustomAlert = ({ alertType, description }: any) => {
    return (
        <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{description}</Text>
            <AntDesign color={alertType === 'error' ? 'red' : 'green'} name="checkcircle" size={22} />
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    alertText: {
        flex: 0.9,
        fontSize: 18,
        marginLeft: 24
    },
});