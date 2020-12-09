import React from 'react'
import { View, Text, Modal, ScrollView, TouchableHighlight, StyleSheet } from 'react-native'

import { useAuth } from '../contexts/auth'

interface Props {
    visible: boolean,
    setVisible: Function
}

export default function ModalComponent(props: Props) {
    const { theme } = useAuth()

    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,
            {backgroundColor: theme.backgroundGreen, borderColor: theme.greenPrimary}]}>
            <TouchableHighlight
              style={[styles.openButton,{backgroundColor: theme.textRed}]}
              onPress={() => props.setVisible(!props.visible)}
            >
              <Text style={[styles.textStyle,{color: theme.textWhite}]}>X</Text>
            </TouchableHighlight>

            <Text style={[styles.title,{color: theme.textGray2}]}>Termos de Contrato</Text>
            <ScrollView style={styles.scrollView}>
              <Text style={{color: theme.textGray3}}>ljnalkjsdnalskdjasdfjknsdaf
                askldbsfdkbsadf
                askldbsadjfhbsafd
                inadjahtektjkçkafdkavsdhasfdçasd
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#33333377'
    },
    modalView: {
      height: 400,
      width: 280,
      borderRadius: 20,
      borderWidth: 2,
      alignItems: 'center',
      elevation: 5
    },
    openButton: {
      height: 40,
      width: 40,
      borderRadius: 5,
      borderTopRightRadius: 20,
      elevation: 2,

      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      top: 0
    },
    textStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 27
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center'
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      margin: 10
    },
    scrollView: {
      flex: 1,
      margin: 15
    }
});
