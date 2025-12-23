import { StyleSheet } from 'react-native';

export const wishlistScreenStyles = StyleSheet.create({
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

