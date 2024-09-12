import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const listStyles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    bulletPoint: {
        width: 10,
        fontSize: 10,
    },
    itemContent: {
        flex: 1,
        fontSize: 10,
        fontFamily: 'Lato',
    },
});

const List = ({ children }: any) => children;

export const Item = ({ children }: any) => (
    <View style={listStyles.item}>
        <Text style={listStyles.bulletPoint}>•</Text>
        <Text style={listStyles.itemContent}>{children}</Text>
    </View>
);

export default List;