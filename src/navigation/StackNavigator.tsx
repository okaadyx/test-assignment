import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WelcomeScreen,
  ProductDetailsScreen,
  CategoryScreen,
} from '../screens';
import { TabNavigator } from './TabNavigator';

// Helper function to format category names
const formatCategory = (name?: string): string =>
  name
    ? name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Category';

const RootStack = createNativeStackNavigator({
  screens: {
    welcome: {
      screen: WelcomeScreen,
      options: { headerShown: false },
    },
    Tab: {
      screen: TabNavigator,
      options: { headerShown: false },
    },
    Details: {
      screen: ProductDetailsScreen,
      options: { headerTitle: 'Product Details' },
    },
    Category: {
      screen: CategoryScreen,
      options: ({ route }: any) => ({
        headerTitle: formatCategory(route.params?.category?.name),
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
