import React from 'react'
import { View, Text, Modal, ScrollView, TouchableHighlight, StyleSheet } from 'react-native'

import colors from '../assets/colors'

interface Props {
    visible: boolean,

    setVisible: Function
}

export default function ModalComponent(props: Props) {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => props.setVisible(!props.visible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableHighlight>

            <Text style={styles.title}>Termos de Contrato</Text>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.text}>ljnalkjsdnalskdjasdfjknsdaf
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
      backgroundColor: colors.backgroundGreen,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.greenPrimary,
      alignItems: 'center',
      elevation: 5
    },
    openButton: {
      backgroundColor: colors.textRed,
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
      color: colors.textWhite,
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
      color: colors.textGray2,
      margin: 10
    },
    scrollView: {
      flex: 1,
      margin: 15
    },
    text: {
      color: colors.textGray3
    }
  });
