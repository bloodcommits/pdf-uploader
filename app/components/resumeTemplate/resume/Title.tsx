import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const titleStyles = StyleSheet.create({
    title: {
        fontFamily: 'Lato Bold',
        fontSize: 14,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
});

const Title = ({ children }: any) => <Text style={titleStyles.title}>{children}</Text>;

export default Title;