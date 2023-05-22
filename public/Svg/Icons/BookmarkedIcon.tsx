interface Props{
  isDark?:boolean,
  isSmall?:boolean
  isActive?:boolean
  isBig?:boolean
}


export  function BookmarkedIcon({isDark,isSmall,isActive,isBig}:Props) {
  return (
<svg height={isBig ? '32px' :isSmall ? '19px' : "21px"} width={isBig ? '32px' :isSmall ? '15px' : "16px"}  fill="none" viewBox="0 0 16 21" xmlns="http://www.w3.org/2000/svg">
	<path d="M1 0H15C15.5523 0 16 0.44772 16 1V20.1433C16 20.4194 15.7761 20.6434 15.5 20.6434C15.4061 20.6434 15.314 20.6168 15.2344 20.5669L8 16.0313L0.76559 20.5669C0.53163 20.7136 0.22306 20.6429 0.0763698 20.4089C0.0264698 20.3293 0 20.2373 0 20.1433V1C0 0.44772 0.44772 0 1 0Z" 
      fill={isActive ? '#24B47E' :  '#A8A8A8'}/>
</svg>
  )
}
