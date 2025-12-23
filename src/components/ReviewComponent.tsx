import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Review } from '../../services/products/types';

export function ReviewComponent({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <View style={styles.noReviewContainer}>
        <Text style={styles.noReviews}>No reviews available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(_, index) => index.toString()}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewName}>
            {item.reviewerName ?? item.username}
          </Text>
          <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
          <Text style={styles.reviewComment}>{item.comment}</Text>
        </View>
      )}
    />
  );
}

export default ReviewComponent;

const styles = StyleSheet.create({
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
