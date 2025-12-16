<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
<<<<<<< HEAD
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react-native';
=======
  RefreshControl,
  Platform,
  Alert,
} from 'react-native';
import {
  Users,
  IndianRupee,
  Percent,
  Wallet,
} from 'lucide-react-native';
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
import { ApiService } from '@/services/api';
import { Customer } from '@/types/customer';

export default function DashboardScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCustomers = async () => {
    try {
      const data = await ApiService.getCustomers();
      setCustomers(data);
<<<<<<< HEAD
    } catch (error) {
      Alert.alert('Error', 'Failed to load customers');
=======
    } catch {
      Alert.alert('Error', 'Unable to load dashboard');
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCustomers();
  };

  const totalOutstanding = customers.reduce(
<<<<<<< HEAD
    (sum, customer) => sum + parseFloat(customer.outstanding_balance),
    0
  );

  const totalEmiDue = customers.reduce(
    (sum, customer) => sum + parseFloat(customer.emi_due_amount),
    0
  );

  const averageInterestRate = customers.length > 0 
    ? customers.reduce((sum, customer) => sum + parseFloat(customer.interest_rate), 0) / customers.length
    : 0;

  const StatCard = ({ icon, title, value, subtitle, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <View style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <Text style={styles.customerName}>{customer.customer_name}</Text>
        <Text style={styles.accountNumber}>{customer.account_number}</Text>
      </View>
      
      <View style={styles.customerDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Outstanding Balance</Text>
          <Text style={styles.detailValue}>₹{parseFloat(customer.outstanding_balance).toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>EMI Due</Text>
          <Text style={styles.detailValue}>₹{parseFloat(customer.emi_due_amount).toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Interest Rate</Text>
          <Text style={styles.detailValue}>{customer.interest_rate}%</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
=======
    (sum, c) => sum + Number(c.outstanding_balance),
    0
  );

  const totalEmi = customers.reduce(
    (sum, c) => sum + Number(c.emi_due_amount),
    0
  );

  const avgRate =
    customers.length > 0
      ? customers.reduce((s, c) => s + Number(c.interest_rate), 0) /
        customers.length
      : 0;

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>Preparing dashboard…</Text>
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      </View>
    );
  }

  return (
<<<<<<< HEAD
    <ScrollView 
=======
    <ScrollView
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
<<<<<<< HEAD
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loan Dashboard</Text>
        <Text style={styles.headerSubtitle}>Payment Collection Overview</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon={<DollarSign size={24} color="#1e40af" />}
          title="Total Outstanding"
          value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
          subtitle="Across all customers"
          color="#1e40af"
        />
        
        <StatCard
          icon={<Clock size={24} color="#d97706" />}
          title="Total EMI Due"
          value={`₹${totalEmiDue.toLocaleString('en-IN')}`}
          subtitle="This month"
          color="#d97706"
        />
        
        <StatCard
          icon={<Users size={24} color="#059669" />}
          title="Active Customers"
          value={customers.length.toString()}
          subtitle="Total loan accounts"
          color="#059669"
        />
        
        <StatCard
          icon={<TrendingUp size={24} color="#dc2626" />}
          title="Avg. Interest Rate"
          value={`${averageInterestRate.toFixed(2)}%`}
          subtitle="Portfolio average"
          color="#dc2626"
        />
      </View>

      <View style={styles.recentCustomersSection}>
        <Text style={styles.sectionTitle}>Recent Customers</Text>
        {customers.slice(0, 5).map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
=======
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroSmall}>Loan Portfolio</Text>
        <Text style={styles.heroTitle}>Dashboard Overview</Text>
        <Text style={styles.heroSubtitle}>
          Financial summary of all active accounts
        </Text>
      </View>

      {/* STATS GRID */}
      <View style={styles.statsGrid}>
        <StatCard
          icon={<Wallet size={26} color="#4f46e5" />}
          label="Total Outstanding"
          value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
        />

        <StatCard
          icon={<IndianRupee size={26} color="#16a34a" />}
          label="Total EMI Due"
          value={`₹${totalEmi.toLocaleString('en-IN')}`}
        />

        <StatCard
          icon={<Users size={26} color="#0ea5e9" />}
          label="Active Customers"
          value={customers.length.toString()}
        />

        <StatCard
          icon={<Percent size={26} color="#dc2626" />}
          label="Average Interest"
          value={`${avgRate.toFixed(2)}%`}
        />
      </View>

      {/* RECENT CUSTOMERS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Customers</Text>

        {customers.slice(0, 5).map(c => (
          <View key={c.id} style={styles.customerRow}>
            <View>
              <Text style={styles.customerName}>{c.customer_name}</Text>
              <Text style={styles.customerAcc}>{c.account_number}</Text>
            </View>

            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Outstanding</Text>
              <Text style={styles.amountValue}>
                ₹{Number(c.outstanding_balance).toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
        ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#1e40af',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  recentCustomersSection: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  customerCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  customerHeader: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  accountNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  customerDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});
=======
/* ---------------- STAT CARD ---------------- */
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <View style={styles.statCard}>
    <View style={styles.statIcon}>{icon}</View>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderText: {
    fontSize: 17,
    color: '#64748b',
  },

  /* HERO */
  hero: {
    paddingTop: Platform.OS === 'web' ? 48 : 72,
    paddingBottom: 40,
    paddingHorizontal: 28,
    backgroundColor: '#020617',
  },

  heroSmall: {
    fontSize: 13,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },

  heroSubtitle: {
    fontSize: 15,
    color: '#cbd5f5',
    marginTop: 10,
    maxWidth: 500,
  },

  /* STATS */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
    marginTop: -28,
  },

  statCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  statIcon: {
    marginBottom: 14,
  },

  statLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 6,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#020617',
  },

  /* SECTION */
  section: {
    padding: 20,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#020617',
    marginBottom: 16,
  },

  /* CUSTOMER ROW */
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#020617',
  },

  customerAcc: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  amountBox: {
    alignItems: 'flex-end',
  },

  amountLabel: {
    fontSize: 12,
    color: '#64748b',
  },

  amountValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16a34a',
    marginTop: 2,
  },
});
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
