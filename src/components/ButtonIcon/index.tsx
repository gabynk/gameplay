import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import DiscordImg from '../../assets/discord.png';

import { styles } from './styles';

type ButtonIconProps = TouchableOpacityProps & {
    title: string;
}

export function ButtonIcon({ title, ...res }: ButtonIconProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            
        >
            <View style={styles.iconWrapper}>
                <Image
                    source={DiscordImg}
                    style={styles.icon}
                    resizeMode="stretch"
                />
            </View>

            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}