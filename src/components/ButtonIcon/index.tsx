import React from 'react';
import { Text, View, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import DiscordImg from '../../assets/discord.png';

import { styles } from './styles';

type ButtonIconProps = RectButtonProps & {
    title: string;
}

export function ButtonIcon({ title, ...rest }: ButtonIconProps) {
    return (
        <RectButton style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <Image
                    source={DiscordImg}
                    style={styles.icon}
                    resizeMode="stretch"
                />
            </View>

            <Text style={styles.title}>{title}</Text>
        </RectButton>
    );
}