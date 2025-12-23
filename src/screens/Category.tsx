import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api } from '../../services';
import { ProductListComponent } from '../components';
import { Product, Category } from '../../services/products/types';

export function CategoryScreen({ route }: any) {
  const category: Category | undefined = route.params?.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category?.slug) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.products.fetchByCategory(category.slug);
        if (isMounted) {
          setProducts(response);
        }
      } catch (error: any) {
        console.log('Error fetching category products:', error.message);
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category?.slug]);

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

  return (
    <View style={styles.container}>
      <ProductListComponent products={products} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
