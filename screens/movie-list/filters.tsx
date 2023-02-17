import { FC } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import colors from '@/constants/colors';
import { SortButton } from '@/components';
import { State } from './common/types';

interface IFiltersActions {
  handleSort: (payload: string) => void;
  handleFilterByYear: (payload: number | '') => void;
  handleClearFilters: () => void;
}

interface IFiltersState extends Omit<State, 'movies'> {
  relaseYears: number[];
  actions: IFiltersActions;
}

interface IFilters {
  state: IFiltersState;
}

const Filters: FC<IFilters> = ({ state }) => {
  const { relaseYears, filterByYear, sortField, sortBy, actions } = state;
  const { handleSort, handleFilterByYear, handleClearFilters } = actions;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filterByYear || ''}
        onValueChange={(value: number | '') => handleFilterByYear(value)}
        style={styles.picker}
      >
        <Picker.Item label="Filter by year" value='' />
        {relaseYears.map((year: number) => (
          <Picker.Item key={year} label={String(year)} value={year} />
        ))}
      </Picker>

      <SortButton title='Sort by year' name='year' sortField={sortField} sortBy={sortBy} onPress={handleSort}  />
      <SortButton title='Sort by title' name='title' sortField={sortField} sortBy={sortBy} onPress={handleSort} />
      <Button color={colors.primary} title='Clear Filters' onPress={handleClearFilters} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 6,
  },
  picker: {
    flex: 1,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.grayDark,
  },
});


export default Filters;
