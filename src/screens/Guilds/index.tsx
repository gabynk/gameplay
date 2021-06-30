import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';

import { ListDivider } from '../../components/ListDivider';
import { Guild, GuildProps } from '../../components/Guild';
import { Load } from '../../components/Load';

import { styles } from './styles';
import { api } from '../../services/api';

type GuildsProps = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: GuildsProps) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuilds()
    }, [])

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {loading
                ? <Load />
                : <FlatList
                    data={guilds}
                    style={styles.guilds}
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    ListHeaderComponent={() => <ListDivider isCentered />}
                    renderItem={({ item }) => (
                        <Guild data={item} onPress={() => handleGuildSelect(item)} />
                    )}
                />}
        </View>
    );
}