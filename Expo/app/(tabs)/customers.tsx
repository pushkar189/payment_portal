import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { Search, ArrowUp, ArrowDown } from 'lucide-react-native';
import { ApiService } from '@/services/api';
import { Customer } from '@/types/customer';
import { router } from 'expo-router';

type SortOption = 'name' | 'balance' | 'emi' | 'rate';
type SortDirection = 'asc' | 'desc';

export default function CustomersScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');

  const fetchCustomers = async () => {
    try {
      const data = await ApiService.getCustomers();
      setCustomers(data);
      setFiltered(data);
    } catch {
      Alert.alert('Error', 'Unable to load customers');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let data = customers.filter(c =>
      c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      c.account_number.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      let x: any, y: any;
      if (sortBy === 'name') {
        x = a.customer_name.toLowerCase();
        y = b.customer_name.toLowerCase();
        return direction === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
      }
      if (sortBy === 'balance') {
        x = +a.outstanding_balance;
        y = +b.outstanding_balance;
      }
      if (sortBy === 'emi') {
        x = +a.emi_due_amount;
        y = +b.emi_due_amount;
      }
      if (sortBy === 'rate') {
        x = +a.interest_rate;
        y = +b.interest_rate;
      }
      return direction === 'asc' ? x - y : y - x;
    });

    setFiltered(data);
  }, [customers, search, sortBy, direction]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setDirection('asc');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>Loading customer data…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <Text style={styles.subtitle}>
          {filtered.length} active loan accounts
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Search size={18} color="#64748b" />
        <TextInput
          placeholder="Search by customer or account number"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Sort */}
      <View style={styles.sortRow}>
        {(['name', 'balance', 'emi', 'rate'] as SortOption[]).map(opt => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.chip,
              sortBy === opt && styles.activeChip,
            ]}
            onPress={() => toggleSort(opt)}
          >
            <Text
              style={[
                styles.chipText,
                sortBy === opt && styles.activeChipText,
              ]}
            >
              {opt.toUpperCase()}
            </Text>
            {sortBy === opt &&
              (direction === 'asc' ? (
                <ArrowUp size={14} color="#1e293b" />
              ) : (
                <ArrowDown size={14} color="#1e293b" />
              ))}
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCustomers} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/customer-detail/${item.account_number}`)
            }
          >
            <View style={styles.cardAccent} />

            <View style={styles.cardBody}>
              <Text style={styles.name}>{item.customer_name}</Text>
              <Text style={styles.account}>{item.account_number}</Text>

              <View style={styles.metrics}>
                <Metric label="Outstanding" value={`₹${(+item.outstanding_balance).toLocaleString('en-IN')}`} />
                <Metric label="EMI" value={`₹${(+item.emi_due_amount).toLocaleString('en-IN')}`} />
                <Metric label="Rate" value={`${item.interest_rate}%`} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ----------------- Metric Component ----------------- */
const Metric = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metricBox}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

/* ----------------- Styles ----------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
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

  /* Header */
  header: {
    paddingTop: Platform.OS === 'web' ? 48 : 64,
    paddingBottom: 28,
    paddingHorizontal: 24,
    backgroundColor: '#020617',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },

  subtitle: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 6,
  },

  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#0f172a',
  },

  /* Sort */
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 14,
    gap: 10,
    flexWrap: 'wrap',
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
  },

  activeChip: {
    backgroundColor: '#dbeafe',
  },

  chipText: {
    fontSize: 13,
    color: '#475569',
  },

  activeChipText: {
    fontWeight: '600',
    color: '#1e3a8a',
  },

  /* List */
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },

  /* Card */
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  cardAccent: {
    width: 6,
    backgroundColor: '#4f46e5',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  cardBody: {
    padding: 18,
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#020617',
  },

  account: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 14,
  },

  /* Metrics */
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  metricBox: {
    minWidth: 90,
  },

  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },

  metricValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
});
