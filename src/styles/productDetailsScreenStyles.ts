import { StyleSheet } from 'react-native';

export const productDetailsScreenStyles = StyleSheet.create({
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

