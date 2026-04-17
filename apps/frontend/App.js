import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [text, setText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [value, setValue] = useState('');
  const [logo, setLogo] = useState(null);

  const isValidUrl = (url) => /^https?:\/\/.+/.test(url);

  const handleGenerate = () => {
    setValue(text);
    setLogo(logoUrl && isValidUrl(logoUrl) ? { uri: logoUrl } : null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Enter text"
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, marginBottom: 20 }}
        onChangeText={setText}
        value={text}
      />
      <TextInput
        placeholder="Image URL (optional)"
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, marginBottom: 20 }}
        onChangeText={setLogoUrl}
        value={logoUrl}
        autoCapitalize="none"
        keyboardType="url"
        accessibilityLabel="Logo image URL input field"
      />
      <Button title="Generate QR" onPress={handleGenerate} />
      {value ? (
        <View style={{ marginTop: 20 }}>
          <QRCode
            value={value}
            size={200}
            logo={logo}
            logoSize={40}
            logoBackgroundColor="white"
            logoMargin={2}
            logoBorderRadius={4}
          />
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}
