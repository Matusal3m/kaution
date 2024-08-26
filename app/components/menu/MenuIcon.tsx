import MenuOptions from "./MenuOptions";
import { CiMenuKebab } from "react-icons/ci";

export default function MenuIcon({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer p-2"
    onClick={onClick}>
      <p>
        <CiMenuKebab size={24}/>
      </p>
      {open ? <MenuOptions /> : null}
    </div>
  );
}
