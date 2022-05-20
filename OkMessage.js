import React from 'react';
import { StyleSheet, Text } from 'react-native';

const OkMessage = ({ ok, visible }) => {
  if (!ok || !visible) {
    return null;
  }

  return <Text style={styles.okText}>✅ {ok}</Text>;
};

const styles = StyleSheet.create({
  okText: {
    color: '#fdca40',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  }
});

export default okMessage;