import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { api } from '../../services';
import { Product, Category } from '../../services/products/types';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../components';
import { categoryScreenStyles as styles } from '../styles/categoryScreenStyles';

export function CategoryScreen({ route }: any) {
  const category: Category | undefined = route.params?.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const loadProducts = async (initial = false) => {
    if (!category?.slug) {
      setLoading(false);
      return;
    }

    if (initial) {
      setProducts([]);
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await api.products.fetchByCategory(category.slug, {
        limit,
        skip: initial ? 0 : products.length,
      });

      setProducts(prev =>
        initial ? response.products : [...prev, ...response.products],
      );
      setTotal(response.total ?? response.products.length);
    } catch (error: any) {
      console.log('Error fetching category products:', error.message);
      if (initial) {
        setProducts([]);
      }
    } finally {
      if (initial) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    loadProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.slug]);

  const handleEndReached = () => {
    if (loading || loadingMore) {
      return;
    }

    if (products.length >= total && total !== 0) {
      return;
    }

    loadProducts(false);
  };

  if (!category) {
    return (
      <View style={styles.loading}>
        <Text>Category not found</Text>
      </View>
    );
  }

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
