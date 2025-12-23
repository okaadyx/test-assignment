import { StyleSheet } from 'react-native';

export const reviewComponentStyles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewName: {
    fontWeight: '600',
    fontSize: 14,
  },
  noReviews: {
    color: '#888',
    fontSize: 14,
  },
  noReviewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewRating: {
    fontSize: 14,
    marginVertical: 2,
  },
  reviewComment: {
    fontSize: 13,
    color: '#555',
  },
});

