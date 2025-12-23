import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../../services/products/types';
import { searchListComponentStyles as styles } from '../styles/searchListComponentStyles';

export function SearchListComponent({ products }: { products: Product[] }) {
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
