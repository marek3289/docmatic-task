import { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { SORT_ORDER, SortOrderType } from '@/types';
import colors from '@/constants/colors';

interface ISortButton {
  title: string;
  onPress: (name: string) => void;
  name: string;
  sortField: string;
  sortBy: SortOrderType;
}

type IconTypes = 'up' | 'down' | 'minus'

const SortIcon: Record<SortOrderType, IconTypes> = {
  [SORT_ORDER.ASC]: 'up',
  [SORT_ORDER.DESC]: 'down',
  [SORT_ORDER.DEFAULT]: 'minus',
}

const SortButton: FC<ISortButton> = ({ title, onPress, name, sortField, sortBy }) => {
  const isActive = sortField === name;
  const icon = isActive ? SortIcon[sortBy] : 'minus'

  return (
    <TouchableOpacity style={styles.btn} onPress={() => onPress(name)}>
      <Text style={styles.buttonText}>{title}</Text>
      <AntDesign name={icon} size={20} color={colors.white} />  
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    position: 'relative',
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
    textTransform: 'uppercase',
  }
});


export default SortButton;
