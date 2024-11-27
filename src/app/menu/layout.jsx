import HeaderWhite from "../UI/HeaderWhite/HeaderWhite";

export default function menu({ children }) {
  return (
    <div>
      <HeaderWhite />
      {children}
    </div>
  );
}
