import { TouchableOpacity, Text, StyleSheet } from "react-native"

const PadButton = ({ label, backgroundColor = '#ADD8E6', color = 'white', onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={() => onPress(label)} >
      <Text style={[styles.buttonText, { color: color }]}>{label}</Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontSize: 24
  },
  button: {
    width: 80,
    height: 80,
    margin: 2.5,
    justifyContent: 'center',
    backgroundColor: '#98C379'
  }
})

export default PadButton