import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import Footer from "./components/Footer";
import { SearchProvider } from "./components/search/SearchContext";
import { ModalProvider } from "./components/modal/ModalContext";
import Modal from "./components/modal/Modal";

export default function Home() {
  return (
    <>
      <ModalProvider>
        <SearchProvider>
          <Header />
          <MainScreen />
        </SearchProvider>
        <Footer />
        <Modal />
      </ModalProvider>
    </>
  );
}
