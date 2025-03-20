import { WeatherProvider } from '@/context/WeatherContext.tsx';
import Home from '@/pages/Home.tsx';

function App() {
  return (
    <WeatherProvider>
      <Home />
    </WeatherProvider>
  );
}

export default App;