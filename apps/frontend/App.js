import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Enter text"
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, marginBottom: 20 }}
        onChangeText={setText}
        value={text}
      />
      <Button title="Generate QR" onPress={() => setValue(text)} />
      {value ? (
        <View style={{ marginTop: 20 }}>
          <QRCode value={value} size={200} />
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}
