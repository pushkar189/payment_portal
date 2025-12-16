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
<<<<<<< HEAD
} from 'react-native';
import { CreditCard, DollarSign, CircleCheck as CheckCircle } from 'lucide-react-native';
=======
  Platform,
} from 'react-native';
import {
  CreditCard,
  IndianRupee,
  CircleCheck,
} from 'lucide-react-native';
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
import { ApiService } from '@/services/api';

export default function PaymentsScreen() {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!accountNumber.trim()) {
<<<<<<< HEAD
      Alert.alert('Error', 'Please enter an account number');
      return;
    }

    if (!amount.trim() || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
=======
      Alert.alert('Validation Error', 'Enter account number');
      return;
    }

    if (!amount.trim() || +amount <= 0) {
      Alert.alert('Validation Error', 'Enter valid amount');
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
<<<<<<< HEAD
      const result = await ApiService.makePayment(accountNumber, parseFloat(amount));
      
      Alert.alert(
        'Payment Successful',
        `Payment processed successfully!\nNew Balance: ₹${result.new_balance.toLocaleString('en-IN')}`,
=======
      const res = await ApiService.makePayment(
        accountNumber.trim(),
        +amount
      );

      Alert.alert(
        'Payment Successful',
        `Updated Balance: ₹${res.new_balance.toLocaleString('en-IN')}`,
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
        [
          {
            text: 'OK',
            onPress: () => {
              setAccountNumber('');
              setAmount('');
              setSuccess(true);
<<<<<<< HEAD
              setTimeout(() => setSuccess(false), 3000);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Unable to process payment. Please try again.');
=======
              setTimeout(() => setSuccess(false), 2500);
            },
          },
        ]
      );
    } catch {
      Alert.alert('Payment Failed', 'Please try again');
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <CreditCard size={32} color="#ffffff" />
        <Text style={styles.headerTitle}>Process Payment</Text>
        <Text style={styles.headerSubtitle}>Collect loan payments securely</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter customer account number"
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
            value={accountNumber}
            onChangeText={setAccountNumber}
            autoCapitalize="characters"
            autoCorrect={false}
<<<<<<< HEAD
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Payment Amount (₹)</Text>
          <View style={styles.amountInputContainer}>
            <DollarSign size={20} color="#6b7280" />
=======
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Payment Amount</Text>
          <View style={styles.amountBox}>
            <IndianRupee size={18} color="#64748b" />
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
<<<<<<< HEAD
=======
              placeholderTextColor="#94a3b8"
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
<<<<<<< HEAD
            styles.paymentButton,
            loading && styles.paymentButtonDisabled,
            success && styles.paymentButtonSuccess,
=======
            styles.button,
            loading && styles.disabled,
            success && styles.success,
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
          ]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
<<<<<<< HEAD
            <ActivityIndicator color="#ffffff" size="small" />
          ) : success ? (
            <CheckCircle size={20} color="#ffffff" />
          ) : (
            <CreditCard size={20} color="#ffffff" />
          )}
          <Text style={styles.paymentButtonText}>
            {loading ? 'Processing...' : success ? 'Payment Successful' : 'Process Payment'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Payment Guidelines</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Ensure account number is correct before processing</Text>
            <Text style={styles.infoItem}>• Payment amount should match customer's EMI or outstanding balance</Text>
            <Text style={styles.infoItem}>• All payments are processed instantly</Text>
            <Text style={styles.infoItem}>• Transaction receipt will be generated automatically</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Quick Actions</Text>
          <Text style={styles.infoDescription}>
            Use the Customers tab to quickly find account details and EMI amounts before processing payments.
          </Text>
        </View>
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      </View>
    </ScrollView>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a7f3d0',
  },
  formContainer: {
    padding: 24,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  amountInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  paymentButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  paymentButtonSuccess: {
    backgroundColor: '#059669',
  },
  paymentButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoContainer: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
