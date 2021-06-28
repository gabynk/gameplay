import React from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

import { Fontisto } from '@expo/vector-icons';
import BannerImg from '../../assets/banner.png'

import { styles } from './styles';

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Gabriele',
            avatar_url: 'https://github.com/gabynk.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Gabriele',
            avatar_url: 'https://github.com/gabynk.png',
            status: 'offline'
        }
    ]

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto name="share" size={20} color={theme.colors.primary} />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>Lendários</Text>
                    <Text style={styles.subtitle}>É hoje que vamos chegar ao challenger sem perder uma partida da md10</Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />

            <FlatList
                data={members}
                style={styles.member}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                    <Member data={item} />
                )}
            />

            <View style={styles.footer}>
                <ButtonIcon title="Entrar na partida" />
            </View>
        </Background>
    );
}