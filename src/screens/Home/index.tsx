import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Background } from '../../components/Background';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentyProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';

export function Home() {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentyProps[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]));

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentyProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }

        setLoading(false);
    }

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentyProps) {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {loading
                ? <Load />
                : <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        style={styles.matches}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <ListDivider />}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                    />
                </>
            }
        </Background>
    );
}