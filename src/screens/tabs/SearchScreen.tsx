import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CategoryComponent, ProductCard } from '../../components';
import { Product, Category } from '../../../services/products/types';
import { api } from '../../../services';
import { searchScreenStyles as styles } from '../../styles/searchScreenStyles';

export function SearchScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<Product[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
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

  const loadSearchResults = async (initial = false) => {
    const query = searchText.trim();

    if (!query) {
      setIsSearch(false);
      setData([]);
      setTotal(0);
      return;
    }

    if (initial) {
      setSearchLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await api.products.search(query, {
        limit,
        skip: initial ? 0 : data.length,
      });

      setData(prev =>
        initial ? response.products : [...prev, ...response.products],
      );
      setTotal(response.total);
      setIsSearch(true);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      if (initial) {
        setSearchLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const handleSearch = async () => {
    loadSearchResults(true);
  };

  const handleEndReached = () => {
    if (!isSearch || searchLoading || loadingMore) {
      return;
    }

    if (data.length >= total && total !== 0) {
      return;
    }

    loadSearchResults(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchText('');
        setData([]);
        setIsSearch(false);
        setTotal(0);
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
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 80 },
          ]}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={styles.footerLoader} size="small" />
            ) : null
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('Details', {
                  productId: item.id,
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
