import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { api } from '../../../services';
import { Product } from '../../../services/products/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProductCard } from '../../components';
import { homeScreenStyles as styles } from '../../styles/homeScreenStyles';

export function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const loadProducts = async (initial = false) => {
    if (initial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await api.products.fetchProductsPaginated({
        limit,
        skip: initial ? 0 : products.length,
      });

      setProducts(prev =>
        initial ? response.products : [...prev, ...response.products],
      );
      setTotal(response.total);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      if (initial) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const handleEndReached = () => {
    if (loadingMore || loading) {
      return;
    }

    if (products.length >= total && total !== 0) {
      return;
    }

    loadProducts(false);
  };
  useEffect(() => {
    loadProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
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
    </View>
  );
}
