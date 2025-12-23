import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeFromWishlist } from '../../../store/WishlistSlice';
import { useNavigation } from '@react-navigation/native';
import { wishlistScreenStyles as styles } from '../../styles/wishlistScreenStyles';

export function WishlistScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  if (!wishlist.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wishlist is empty 🤍</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlist}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
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
            source={{
              uri:
                item.images && item.images.length > 0
                  ? item.images[0]
                  : undefined,
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.price}>₹{item.price}</Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={(e: any) => {
                e.stopPropagation();
                dispatch(removeFromWishlist(item.id));
              }}
            >
              <Text style={styles.removeText}>❤️ Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
