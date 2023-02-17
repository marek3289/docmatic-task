import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Movie } from '@/types';
import colors from '@/constants/colors';

import { useMovieList } from './common/logic';
import Filters from './filters';

type MovieProps = { item: Movie }

const renderMovie = ({ item }: MovieProps) => (
  <View style={styles.item}>
    <Image style={styles.poster} source={{ uri: item.poster }} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </View>
  </View>
);

const MovieList = () => {
  const { movies, ...state } = useMovieList();

  return (
    <SafeAreaView>
      <Filters state={state} /> 
      <ScrollView style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={movie => movie.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.col}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  col: {
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    height: 300,
    backgroundColor: colors.grayLight,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  info: {
    flex: 1,
    width: '100%',
  },
  poster: {
    flex: 4,
    maxWidth: 180,
    width: '100%',
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  year: {
    marginTop: 'auto',
  },
});

export default MovieList;
