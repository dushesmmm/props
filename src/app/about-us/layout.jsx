import HeaderWhite from "../UI/HeaderWhite/HeaderWhite"

export default function accessories ({children}) {
    return (
        <div>
            <HeaderWhite />
            {children}
        </div>
    )
}