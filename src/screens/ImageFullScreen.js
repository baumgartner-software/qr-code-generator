import React, { useState } from 'react';
import {
  View,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Share,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import SettingsList from 'react-native-settings-list';

/**
 * ImageFullScreen renders an image in fullscreen with pinch-to-zoom support.
 * Tapping the image toggles the header. Long press opens an action sheet
 * allowing the user to download the image.
 */
export default function ImageFullScreen({ route, navigation }) {
  const { uri } = route.params;
  const [headerVisible, setHeaderVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleHeader = () => setHeaderVisible(!headerVisible);
  const downloadImage = async () => {
    // Placeholder logic: trigger share dialog as a stand-in for download
    try {
      await Share.share({ url: uri });
    } catch (err) {
      console.warn('Failed to share image', err);
    }
  };

  return (
    <View style={styles.container}>
      {headerVisible && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerButton}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={downloadImage}>
            <Text style={styles.headerButton}>Download</Text>
          </TouchableOpacity>
        </View>
      )}
      <ImageZoom
        cropWidth={styles.container.width}
        cropHeight={styles.container.height}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        onClick={toggleHeader}
        onLongPress={() => setModalVisible(true)}
      >
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      </ImageZoom>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SettingsList borderColor="#ccc">
              <SettingsList.Item title="Download Image" onPress={downloadImage} />
              <SettingsList.Item title="Cancel" onPress={() => setModalVisible(false)} />
            </SettingsList>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    zIndex: 1,
  },
  headerButton: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalContent: {
    marginHorizontal: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
