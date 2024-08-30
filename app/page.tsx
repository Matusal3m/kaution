import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import Footer from "./components/Footer";
import Modal from "./components/modal/Modal";
import AppProviders from "./components/AppProviders";
import { ModalProvider } from "./context/ModalContext";

export default function Home() {
  return (
    <AppProviders>
      <Header />
      <ModalProvider>
        <MainScreen />
        <Modal />
      </ModalProvider>
      <Footer />
    </AppProviders>
  );
}
