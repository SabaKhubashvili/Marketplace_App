
interface Props{
    isDark?:boolean
}
export const HamburgerIcon = ({isDark}:Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <g>
      <g>
        <path
          stroke={isDark ? '#808080' : '#181818'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 17h14M5 12h14M5 7h14"
        ></path>
      </g>
    </g>
  </svg>
  )
}
