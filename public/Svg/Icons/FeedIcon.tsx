
interface Props{
  isActive?:boolean
}

export function FeedIcon({isActive}:Props) {
  return (
<svg height="28" width="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
	<path d="M0.0371094 0.390137C15.2629 0.390137 27.606 12.7332 27.606 27.959H23.0112C23.0112 15.2708 12.7254 4.98495 0.0371094 4.98495V0.390137ZM0.0371094 11.1114C9.34181 11.1114 16.8848 18.6544 16.8848 27.959H12.2899C12.2899 21.1919 6.80417 15.7062 0.0371094 15.7062V11.1114ZM0.0371094 21.8326C3.42064 21.8326 6.16353 24.5756 6.16353 27.959H0.0371094V21.8326Z"
  fill={`${isActive ? '#24B47E' : '#A8A8A8'}`}/>
</svg>
  )
}
