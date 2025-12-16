import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
    } catch {
      Alert.alert('Error', 'Unable to load dashboard');
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
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
        ))}
      </View>
    </ScrollView>
  );
}

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
