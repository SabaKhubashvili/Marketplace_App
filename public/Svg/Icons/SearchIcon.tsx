
interface Props{
  isDark?:boolean
  isSmall?:boolean
}

export  function  SearchIcon({isDark,isSmall}:Props) {
  return (
<svg height={isSmall ? '18' : '23'} width={isSmall ? '18' : '23'} fill="none" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
	<path d="M17.4593 16.305L22.0564 20.9021L20.5384 22.4201L15.9413 17.823C14.2884 19.1455 12.1921 19.9366 9.91216 19.9366C4.57946 19.9366 0.251465 15.6086 0.251465 10.2759C0.251465 4.94317 4.57946 0.615173 9.91216 0.615173C15.2449 0.615173 19.5729 4.94317 19.5729 10.2759C19.5729 12.5558 18.7818 14.6521 17.4593 16.305ZM15.3057 15.5085C16.6183 14.1558 17.426 12.3106 17.426 10.2759C17.426 6.12445 14.0636 2.762 9.91216 2.762C5.76075 2.762 2.39829 6.12445 2.39829 10.2759C2.39829 14.4273 5.76075 17.7897 9.91216 17.7897C11.9469 17.7897 13.7921 16.982 15.1448 15.6694L15.3057 15.5085Z" 
  fill={isDark ? '#808080' : '#181818'}/>
</svg>
  )
}
