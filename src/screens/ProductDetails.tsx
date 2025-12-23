import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ReviewComponent from '../components/ReviewComponent';
import { api } from '../../services';
import { Product } from '../../services/products/types';
import { RootState } from '../../store';
import { toggleWishlist } from '../../store/WishlistSlice';

export function ProductDetailsScreen({ route }: any) {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isWishlisted = useSelector((state: RootState) =>
    state.wishlist.items.some(item => item.id === product?.id),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.products.fetchProductById(productId);
        setProduct(response);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleWishlist = () => {
    if (product) {
      dispatch(toggleWishlist(product));
    }
  };
  if (!productId) {
    return (
      <View style={styles.center}>
        <Text>Invalid product</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text>Failed to load product.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>

        <Text style={styles.price}>
          ₹{product.price}{' '}
          <Text style={styles.discount}>
            ({product.discountPercentage}% OFF)
          </Text>
        </Text>

        <Text style={styles.rating}>⭐ {product.rating}</Text>

        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlist}
          activeOpacity={0.8}
        >
          <Text style={styles.wishlistText}>
            {isWishlisted ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.metaContainer}>
          <Text style={styles.meta}>Category: {product.category}</Text>
          <Text style={styles.meta}>Stock: {product.stock}</Text>
          <Text style={styles.meta}>
            Availability: {product.availabilityStatus ?? 'In Stock'}
          </Text>
          <Text style={styles.meta}>
            Shipping: {product.shippingInformation ?? 'Standard'}
          </Text>
          <Text style={styles.meta}>
            Warranty: {product.warrantyInformation ?? '1 Year'}
          </Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Customer Reviews</Text>
        <ReviewComponent reviews={product.reviews ?? []} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E53935',
    marginVertical: 6,
  },
  discount: {
    fontSize: 14,
    color: '#388E3C',
  },
  rating: {
    fontSize: 16,
    marginVertical: 4,
  },
  wishlistButton: {
    marginTop: 12,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  wishlistText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E53935',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginVertical: 8,
    lineHeight: 20,
  },
  metaContainer: {
    marginTop: 10,
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginVertical: 2,
  },
  reviewContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});
