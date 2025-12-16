<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
<<<<<<< HEAD
  RefreshControl,
  Alert,
  TextInput,
} from 'react-native';
import { Search, ListFilter as Filter, ArrowUpDown } from 'lucide-react-native';
=======
  TextInput,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { Search, ArrowUp, ArrowDown } from 'lucide-react-native';
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
import { ApiService } from '@/services/api';
import { Customer } from '@/types/customer';
import { router } from 'expo-router';

type SortOption = 'name' | 'balance' | 'emi' | 'rate';
type SortDirection = 'asc' | 'desc';

export default function CustomersScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
<<<<<<< HEAD
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
=======
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2

  const fetchCustomers = async () => {
    try {
      const data = await ApiService.getCustomers();
      setCustomers(data);
<<<<<<< HEAD
      setFilteredCustomers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load customers');
=======
      setFiltered(data);
    } catch {
      Alert.alert('Error', 'Unable to load customers');
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    filterAndSortCustomers();
  }, [customers, searchQuery, sortBy, sortDirection]);

  const filterAndSortCustomers = () => {
    let filtered = customers.filter(customer =>
      customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.account_number.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.customer_name.toLowerCase();
          bValue = b.customer_name.toLowerCase();
          break;
        case 'balance':
          aValue = parseFloat(a.outstanding_balance);
          bValue = parseFloat(b.outstanding_balance);
          break;
        case 'emi':
          aValue = parseFloat(a.emi_due_amount);
          bValue = parseFloat(b.emi_due_amount);
          break;
        case 'rate':
          aValue = parseFloat(a.interest_rate);
          bValue = parseFloat(b.interest_rate);
          break;
        default:
          aValue = a.customer_name.toLowerCase();
          bValue = b.customer_name.toLowerCase();
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
    });

    setFilteredCustomers(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCustomers();
  };

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const navigateToCustomerDetail = (customer: Customer) => {
    router.push(`/customer-detail/${customer.account_number}`);
  };

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <TouchableOpacity 
      style={styles.customerCard}
      onPress={() => navigateToCustomerDetail(customer)}
    >
      <View style={styles.customerHeader}>
        <Text style={styles.customerName}>{customer.customer_name}</Text>
        <Text style={styles.accountNumber}>{customer.account_number}</Text>
      </View>
      
      <View style={styles.customerDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Outstanding</Text>
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
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tenure</Text>
          <Text style={styles.detailValue}>{customer.tenure_months} months</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const SortButton = ({ option, label }: { option: SortOption, label: string }) => (
    <TouchableOpacity 
      style={[
        styles.sortButton,
        sortBy === option && styles.activeSortButton
      ]}
      onPress={() => handleSort(option)}
    >
      <Text style={[
        styles.sortButtonText,
        sortBy === option && styles.activeSortButtonText
      ]}>
        {label}
      </Text>
      {sortBy === option && (
        <ArrowUpDown 
          size={16} 
          color="#1e40af" 
          style={{
            transform: [{ rotate: sortDirection === 'desc' ? '180deg' : '0deg' }]
          }}
        />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading customers...</Text>
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      </View>
    );
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
        <Text style={styles.headerSubtitle}>{filteredCustomers.length} loan accounts</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or account number"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.sortContainer}>
        <View style={styles.sortHeader}>
          <Filter size={16} color="#6b7280" />
          <Text style={styles.sortLabel}>Sort by:</Text>
        </View>
        <View style={styles.sortButtons}>
          <SortButton option="name" label="Name" />
          <SortButton option="balance" label="Balance" />
          <SortButton option="emi" label="EMI" />
          <SortButton option="rate" label="Rate" />
        </View>
      </View>

      <FlatList
        data={filteredCustomers}
        renderItem={({ item }) => <CustomerCard customer={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
      />
    </View>
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  sortContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sortHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sortLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  activeSortButton: {
    borderColor: '#1e40af',
    backgroundColor: '#eff6ff',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 4,
  },
  activeSortButtonText: {
    color: '#1e40af',
    fontWeight: '500',
  },
=======
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
<<<<<<< HEAD
  customerCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
>>>>>>> cf958d22876eb6a6457001d94cd4fc42b81c3cc2
