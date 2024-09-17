import { useEffect } from "react";
import { HomePage } from "./pages/HomePage"

function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      registration.addEventListener('updatefound', () => {
        // Notify the user of an available update
        alert('Nowa wersja aplikacji jest dostępna, zaktualizuj, aby uzyskać nowe funkcje.');
      });
    });
  }

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', updateVh);
    updateVh(); // Ustaw wysokość przy pierwszym załadowaniu

    return () => window.removeEventListener('resize', updateVh);
  }, []);

  return (
    <>
      <HomePage />
    </>
  )
}

export default App
