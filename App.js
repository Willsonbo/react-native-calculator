import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import PadButton from './components/PadButton';

export default function App() {
  const [expression, setExpression] = useState('');

  const labels = [
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'C', '0', '=', '/',
  ];

  const onPressButton = (label) => {
    switch (label) {
      case '':
        return;
      case 'C':
        setExpression('');
        break;
      default:
        // TODO: implement
        console.log(`${label} is clicked`);
        setExpression(`${expression}${label}`)
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.expression} >{expression}</Text>
      <FlatList
        style={styles.buttonList}
        numColumns={4}
        data={labels}
        keyExtractor={(item) => item} // can label as key
        renderItem={({ item: label }) => (
          <PadButton label={label} onPress={onPressButton} color={label === 'C' ? '#E06C75' : 'white'} />
        )} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252931',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonList: {
    flex: 1
  },
  expression: {
    textAlignVertical: 'bottom',
    alignItems: 'flex-end',
    width: '100%',
    color: 'white',
    fontSize: 40,
    marginRight: 40,
    textAlign: 'right',
    flex: 1
  }
});
