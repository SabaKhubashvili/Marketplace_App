
interface Props{
  isActive?:boolean,
  color?:string,
  isSmall?:boolean
}

export  function ExploreIcon({isActive,color,isSmall}:Props) {
  return (
<svg height={isSmall ? '25' : '31'} width={isSmall ? '26' : '32'} fill="none" viewBox="0 0 32 31" xmlns="http://www.w3.org/2000/svg">
	<path d="M15.8214 30.9165C7.3626 30.9165 0.505371 24.0592 0.505371 15.6005C0.505371 7.14165 7.3626 0.284424 15.8214 0.284424C24.2802 0.284424 31.1375 7.14165 31.1375 15.6005C31.1375 24.0592 24.2802 30.9165 15.8214 30.9165ZM21.182 10.2399L13.524 13.3031L10.4608 20.9611L18.1188 17.8979L21.182 10.2399Z" 
  fill={`${color ? color : isActive ? '#24B47E' : '#A8A8A8'}`}
  />
</svg>
  )
}
