import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Review } from '../../services/products/types';
import { reviewComponentStyles as styles } from '../styles/reviewComponentStyles';

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
