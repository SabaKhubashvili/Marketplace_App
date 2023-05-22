
interface Props{
  isDark?:boolean
}

export function MenuIcon({isDark}:Props) {
  return (
<svg height="16" width="18" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
	<path d="M0 0H18V2H0V0ZM0 7H12V9H0V7ZM0 14H18V16H0V14Z" fill={isDark ? 'white' : '#181818'}/>
</svg>
  )
}
