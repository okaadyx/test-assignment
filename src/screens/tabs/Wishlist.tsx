import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeFromWishlist } from '../../../store/WishlistSlice';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
    marginVertical: 4,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  removeText: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: '600',
  },
});
