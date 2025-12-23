import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Product } from '../../services/products/types';
import { productCardStyles as styles } from '../styles/productCardStyles';

type ProductCardProps = {
  product: Product;
  onPress: TouchableOpacityProps['onPress'];
};

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{ uri: product.images?.[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>₹{product.price}</Text>
    </TouchableOpacity>
  );
};
