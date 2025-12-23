import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Category } from '../../services/products/types';
import { categoryComponentStyles as styles } from '../styles/categoryComponentStyles';

export function CategoryComponent({ categories }: { categories: Category[] }) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handlePress = (category: Category) => {
    navigation.navigate('Category', {
      category,
    });
  };

  return (
    <View>
      <FlatList
        data={categories}
        numColumns={2}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 80 },
        ]}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.cardText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
