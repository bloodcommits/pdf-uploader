import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';

const educationStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    school: {
        fontFamily: 'Lato Bold',
        fontSize: 10,
    },
    degree: {
        fontFamily: 'Lato',
        fontSize: 10,
    },
    candidate: {
        fontFamily: 'Lato Italic',
        fontSize: 10,
    },
});

const Education = () => (
    <View style={educationStyles.container}>
        <Title>Education</Title>
        <Text style={educationStyles.school}>Jedi Academy</Text>
        <Text style={educationStyles.degree}>Jedi Master</Text>
        <Text style={educationStyles.candidate}>A long, long time ago</Text>
    </View>
);

export default Education;