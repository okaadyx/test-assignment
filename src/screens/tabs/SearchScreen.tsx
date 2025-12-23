import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { CategoryComponent, ProductListComponent } from '../../components';
import { Product, Category } from '../../../services/products/types';
import { api } from '../../../services';

export function SearchScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<Product[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.products.fetchCategories();
        setCategories(response);
      } catch (error: any) {
        console.log('Error fetching categories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setIsSearch(false);
      setData([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await api.products.search(searchText);
      setData(response);
      setIsSearch(true);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchText('');
        setData([]);
        setIsSearch(false);
      };
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.initialLoading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!categories.length) {
    return (
      <View style={styles.initialLoading}>
        <Text>No Categories found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="gray"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {searchLoading ? (
        <Text style={styles.searchingText}>Searching...</Text>
      ) : !isSearch ? (
        <CategoryComponent categories={categories} />
      ) : (
        <ProductListComponent products={data} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    height: 40,
    margin: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  initialLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
