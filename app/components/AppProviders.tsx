import { SearchProvider } from "../context/SearchContext";
import { ModalProvider } from "../context/ModalContext";
import { UserProvider } from "../context/UserContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ModalProvider>
        <SearchProvider>{children}</SearchProvider>
      </ModalProvider>
    </UserProvider>
  );
}
