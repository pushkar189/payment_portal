import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  CreditCard,
  IndianRupee,
  CircleCheck,
} from 'lucide-react-native';
import { ApiService } from '@/services/api';

export default function PaymentsScreen() {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!accountNumber.trim()) {
      Alert.alert('Validation Error', 'Enter account number');
      return;
    }

    if (!amount.trim() || +amount <= 0) {
      Alert.alert('Validation Error', 'Enter valid amount');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await ApiService.makePayment(
        accountNumber.trim(),
        +amount
      );

      Alert.alert(
        'Payment Successful',
        `Updated Balance: ₹${res.new_balance.toLocaleString('en-IN')}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setAccountNumber('');
              setAmount('');
              setSuccess(true);
              setTimeout(() => setSuccess(false), 2500);
            },
          },
        ]
      );
    } catch {
      Alert.alert('Payment Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <CreditCard size={36} color="#ffffff" />
        <Text style={styles.title}>Payment Collection</Text>
        <Text style={styles.subtitle}>
          Secure & instant loan payments
        </Text>
      </View>

      {/* FORM CARD */}
      <View style={styles.card}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            autoCapitalize="characters"
            autoCorrect={false}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Payment Amount</Text>
          <View style={styles.amountBox}>
            <IndianRupee size={18} color="#64748b" />
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.disabled,
            success && styles.success,
          ]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : success ? (
            <>
              <CircleCheck size={20} color="#fff" />
              <Text style={styles.buttonText}>Payment Successful</Text>
            </>
          ) : (
            <>
              <CreditCard size={20} color="#fff" />
              <Text style={styles.buttonText}>Process Payment</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Payment Guidelines</Text>
        <Text style={styles.infoItem}>• Verify account number carefully</Text>
        <Text style={styles.infoItem}>
          • Amount should match EMI or outstanding balance
        </Text>
        <Text style={styles.infoItem}>
          • Payments are processed instantly
        </Text>
        <Text style={styles.infoItem}>
          • Receipt generated automatically
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },

  header: {
    paddingTop: Platform.OS === 'web' ? 48 : 72,
    paddingBottom: 36,
    alignItems: 'center',
    backgroundColor: '#020617',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#cbd5f5',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  inputBlock: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#020617',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    fontSize: 15,
    color: '#020617',
    backgroundColor: '#ffffff',
  },

  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    backgroundColor: '#ffffff',
  },

  amountInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#020617',
  },

  button: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabled: {
    backgroundColor: '#9ca3af',
  },

  success: {
    backgroundColor: '#16a34a',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  info: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#020617',
  },

  infoItem: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
    lineHeight: 20,
  },
});
