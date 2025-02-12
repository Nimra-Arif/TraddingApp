import React from 'react';
import { View, Text, Button } from 'react-native';

const StarterScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to TradingApp</Text>
    <Button title="Next" onPress={() => navigation.replace('Tabs')} />
  </View>
);

export default StarterScreen;
