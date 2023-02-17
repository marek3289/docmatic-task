import { useReducer, useCallback, useMemo } from 'react';
import { movies } from '@/data.json';
import { pluck } from '@/utils';
import { SORT_ORDER, SortOrderType } from '@/types'; 

import { State, ActionTypes, ActionType, ReducerFunction } from './types'; 
import { getFilteredMovies } from './helpers';

const SORT_ORDER_TOGGLE: Record<SortOrderType, SortOrderType> = {
  [SORT_ORDER.DEFAULT]: SORT_ORDER.ASC,
  [SORT_ORDER.ASC]: SORT_ORDER.DESC,
  [SORT_ORDER.DESC]: SORT_ORDER.DEFAULT,
};

const initialState: State = {
  movies,
  sortField: '',
  sortBy: SORT_ORDER.DEFAULT,
  filterByYear: null,
}

const moviesReducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SORT_MOVIES:
      return {
        ...state,
        sortField: action.payload,
        sortBy: action.payload === state.sortField
          ? SORT_ORDER_TOGGLE[state.sortBy]
          : SORT_ORDER_TOGGLE[SORT_ORDER.DEFAULT]
      };
      case ActionTypes.FILTER_BY_YEAR:
        const year = Number(action.payload) || null;
        return {
          ...state,
          filterByYear: year,
        }
      case ActionTypes.CLEAR_FILTERS:
        return { ...initialState };
    default:
      throw new Error();
  }
};

export const useMovieList = () => {
  const [state, dispatch] = useReducer<ReducerFunction>(moviesReducer, initialState);
  const filteredMovies = useMemo(() => getFilteredMovies(state), [state]);
  const relaseYears = useMemo(() => [...new Set(pluck(state.movies, 'year'))], [movies]);

  const handleSort = useCallback((payload: string) => dispatch({ type: ActionTypes.SORT_MOVIES, payload }), [dispatch, state.sortField, state.sortBy]);

  const handleFilterByYear = useCallback((payload: number | '') => dispatch({ type: ActionTypes.FILTER_BY_YEAR, payload }), [dispatch, state.filterByYear]);

  const handleClearFilters = useCallback(() => dispatch({ type: ActionTypes.CLEAR_FILTERS }), [dispatch]);

  return {
    ...state,
    relaseYears,
    movies: filteredMovies,
    actions: {
      handleSort,
      handleFilterByYear,
      handleClearFilters,
    }
  };
}
