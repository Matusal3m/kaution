import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import Footer from "./components/Footer";
import Modal from "./components/modal/Modal";
import AppProviders from "./components/AppProviders";
import { CategoriesProvider } from "./context/CategoriesContext";

export default function Home() {
  return (
    <AppProviders>
      <Header />
      <CategoriesProvider>
        <MainScreen />
        <Modal />
      </CategoriesProvider>
      <Footer />
    </AppProviders>
  );
}
