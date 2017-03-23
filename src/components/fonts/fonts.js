/**
 * @providesModule AppFonts
 **/

import { Platform } from 'react-native';

export const regular = Platform.OS === 'android' ? 'roboto_regular' : 'Roboto-Regular';
export const medium = Platform.OS === 'android' ? 'roboto_medium' : 'Roboto-Medium';
export const bold = Platform.OS === 'android' ? 'roboto_bold' : 'Roboto-Bold';
