"use client"
import React from 'react';
import { Link, Text, View, StyleSheet } from '@react-pdf/renderer';

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
        textTransform: 'uppercase',
    },
    linkColumn: {
        flexDirection: 'column',
        flexGrow: 2,
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
    },
    name: {
        fontSize: 24,
        fontFamily: 'Lato Bold',
    },
    subtitle: {
        fontSize: 10,
        justifySelf: 'flex-end',
        fontFamily: 'Lato',
    },
    link: {
        fontFamily: 'Lato',
        fontSize: 10,
        color: 'black',
        textDecoration: 'none',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
    },
});

const Header = () => (
    <View style={headerStyles.container}>
        <View style={headerStyles.detailColumn}>
            <Text style={headerStyles.name}>Luke Skywalker</Text>
            <Text style={headerStyles.subtitle}>Jedi Master</Text>
        </View>
        <View style={headerStyles.linkColumn}>
            <Link href="mailto:luke@theforce.com" style={headerStyles.link}>
                luke@theforce.com
            </Link>
        </View>
    </View>
);

export default Header;