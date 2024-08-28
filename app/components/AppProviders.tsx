import { SearchProvider } from "../context/SearchContext";
import { ModalProvider } from "../context/ModalContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ModalProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </ModalProvider>
  );
}
