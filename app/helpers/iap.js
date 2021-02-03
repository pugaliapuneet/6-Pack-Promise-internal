
import { Platform } from 'react-native';

export const itemSkus = Platform.select({
    ios: ['AthlenXPurchase.FullVersion'],
    android: ['athlenxpurchase.fullversion']
});

export const productId = Platform.OS == 'ios' ? 'AthlenXPurchase.FullVersion' : 'athlenxpurchase.fullversion'