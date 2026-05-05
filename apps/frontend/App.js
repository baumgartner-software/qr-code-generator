import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';

const isValidHexColor = (hex) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);

export default function App() {
  const [text, setText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [colorInput, setColorInput] = useState('#000000');
  const [value, setValue] = useState('');
  const [logo, setLogo] = useState(null);
  const [color, setColor] = useState('#000000');
  const svgRef = useRef(null);

  const isValidUrl = (url) => /^https?:\/\/.+/.test(url);

  const handleGenerate = () => {
    setValue(text);
    setLogo(logoUrl && isValidUrl(logoUrl) ? { uri: logoUrl } : null);
    setColor(isValidHexColor(colorInput) ? colorInput : '#000000');
  };

  const handleDownloadPng = () => {
    if (!svgRef.current) return;
    svgRef.current.toDataURL((dataURL) => {
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${dataURL}`;
        link.download = 'qrcode.png';
        link.click();
      }
    });
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
      <TextInput
        placeholder="QR Code color (e.g. #000000)"
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, marginBottom: 20 }}
        onChangeText={setColorInput}
        value={colorInput}
        autoCapitalize="none"
        accessibilityLabel="QR Code color hex input field"
      />
      <Button title="Generate QR" onPress={handleGenerate} />
      {value ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <QRCode
            value={value}
            size={200}
            color={color}
            logo={logo}
            logoSize={40}
            logoBackgroundColor="white"
            logoMargin={2}
            logoBorderRadius={4}
            getRef={(ref) => (svgRef.current = ref)}
          />
          <View style={{ marginTop: 12 }}>
            {Platform.OS === 'web' && (
              <Button title="Download PNG" onPress={handleDownloadPng} />
            )}
          </View>
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}
