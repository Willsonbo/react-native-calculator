import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import PadButton from './components/PadButton';

export default function App() {
  const [curOperand, setCurOperand] = useState('');
  const [lastOperand, setLastOperand] = useState('');
  const [curOperator, setCurOperator] = useState('');

  const labels = [
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'C', '0', '=', '/',
  ];

  const calc = (op1, op2, operator) => {
    op1 = Number(op1);
    op2 = Number(op2);
    switch (operator) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '*':
        return op1 * op2;
      case '/':
        if (op2 === 0) {
          return 0;
        }
        return op1 / op2;
      case '=':
        return op1;
      default:
        console.log(`Invalid operator ${operator}`);
        return 0;
    }
  }

  const onPressButton = (label) => {
    if (label === '') {
      return;
    }
    if (label === 'C') {
      setCurOperand('');
      setLastOperand('');
      setCurOperator('');
      return;
    }

    if (!isNaN(Number(label))) {
      // is number
      if (curOperator && !lastOperand) {
        // consecutive calculation
        setLastOperand(curOperand);
        setCurOperand(label);
      } else {
        setCurOperand(`${curOperand}${label}`)
      }
    } else {
      if (curOperator) {
        const result = calc(lastOperand, curOperand, curOperator);
        if (label !== '=') {
          // get and show result, allow input
          setLastOperand('');
          setCurOperand(result);
          setCurOperator(label);
          return;
        } else {
          setLastOperand('');
          setCurOperand(result);
          setCurOperator('');
        }
      } else {
        if (label === '=') {
          return;
        }
        setCurOperator(label);
        setLastOperand(curOperand);
        setCurOperand('');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.expression} >{curOperand}</Text>
      <FlatList
        style={styles.buttonList}
        numColumns={4}
        data={labels}
        keyExtractor={(item) => item} // can label as key
        renderItem={({ item: label }) => (
          <PadButton label={label} onPress={onPressButton}
            color={label === 'C' ? '#E06C75' : 'white'} backgroundColor={curOperator === label ? '#56B6C2' : undefined} />
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
