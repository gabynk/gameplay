import React, { ReactNode } from 'react';
import { Modal, ModalProps, View } from 'react-native';

import { Background } from '../Background';

import { styles } from './styles';

type ModalView = ModalProps & {
    children: ReactNode;
}

export function ModalView({ children, ...rest }: ModalView) {
    return (
        <Modal
            transparent
            animationType="slide"
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        <View style={styles.bar} />

                        {children}
                    </Background>
                </View>
            </View>
        </Modal>
    );
}