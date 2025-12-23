import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../../services/products/types';

export function ProductListComponent({ products }: { products: Product[] }) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
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
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Details', {
              productId: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.images?.[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
