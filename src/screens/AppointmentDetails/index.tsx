import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, FlatList, ImageBackground, Text, View, Share, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import { api } from '../../services/api';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentyProps } from '../../components/Appointment';

import { Fontisto } from '@expo/vector-icons';
import BannerImg from '../../assets/banner.png'

import { styles } from './styles';
import { Load } from '../../components/Load';

type RouteParams = {
    guildSelected: AppointmentyProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const route = useRoute();
    const { guildSelected } = route.params as RouteParams;
    const [widget, setWidget] = useState({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuildWidget()
    }, [])

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

            setWidget(response.data);
        } catch (err) {
            Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?")
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto name="share" size={20} color={theme.colors.primary} />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>{guildSelected.guild.name}</Text>
                    <Text style={styles.subtitle}>{guildSelected.description}</Text>
                </View>
            </ImageBackground>

            {loading
                ? <Load />
                : <>
                    <ListHeader
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList
                        data={widget.members}
                        style={styles.member}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        renderItem={({ item }) => (
                            <Member data={item} />
                        )}
                    />
                </>}
                
            {guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
                </View>
            }
        </Background>
    );
}