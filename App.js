import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { registerRootComponent } from 'expo';

export default function App() {
  const [dbValue, setDbValue] = useState('');
  const [voltageValue, setVoltageValue] = useState('');
  const [result, setResult] = useState('');
  const [mathExplanation, setMathExplanation] = useState('');

  const convertDbToVoltage = () => {
    if (!dbValue) {
      Alert.alert('Error', 'Please enter a dB value');
      return;
    }
    
    const db = parseFloat(dbValue);
    const voltageRatio = Math.pow(10, db / 20);
    const resultText = `Voltage Ratio: ${voltageRatio.toFixed(6)}`;
    setResult(resultText);
    
    const explanation = `Formula: V₂/V₁ = 10^(dB/20)\nCalculation: 10^(${db}/20) = ${voltageRatio.toFixed(6)}`;
    setMathExplanation(explanation);
    Keyboard.dismiss();
  };

  const convertVoltageToDb = () => {
    if (!voltageValue) {
      Alert.alert('Error', 'Please enter a voltage ratio');
      return;
    }
    
    const voltage = parseFloat(voltageValue);
    if (voltage <= 0) {
      Alert.alert('Error', 'Voltage ratio must be greater than 0');
      return;
    }
    
    const db = 20 * Math.log10(voltage);
    const resultText = `dB: ${db.toFixed(2)} dB`;
    setResult(resultText);
    
    const explanation = `Formula: dB = 20 × log₁₀(V₂/V₁)\nCalculation: 20 × log₁₀(${voltage}) = ${db.toFixed(2)} dB`;
    setMathExplanation(explanation);
    Keyboard.dismiss();
  };

  const clearAll = () => {
    setDbValue('');
    setVoltageValue('');
    setResult('');
    setMathExplanation('');
    Keyboard.dismiss();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>dB ⇄ Voltage Converter</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>dB Value:</Text>
          <TextInput
            style={styles.input}
            value={dbValue}
            onChangeText={setDbValue}
            placeholder="Enter dB value"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
          <TouchableOpacity style={styles.button} onPress={convertDbToVoltage}>
            <Text style={styles.buttonText}>Convert to Voltage Ratio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Voltage Ratio:</Text>
          <TextInput
            style={styles.input}
            value={voltageValue}
            onChangeText={setVoltageValue}
            placeholder="Enter voltage ratio"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
          <TouchableOpacity style={styles.button} onPress={convertVoltageToDb}>
            <Text style={styles.buttonText}>Convert to dB</Text>
          </TouchableOpacity>
        </View>

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Result:</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
        ) : null}

        {mathExplanation ? (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Math Explanation:</Text>
            <Text style={styles.explanation}>{mathExplanation}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  explanationContainer: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  clearButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

registerRootComponent(App);
