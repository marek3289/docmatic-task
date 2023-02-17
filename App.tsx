import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MovieList } from '@/screens';

export default function App() {  
  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <MovieList />
    </SafeAreaProvider>
  );
}
