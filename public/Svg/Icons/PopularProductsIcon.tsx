

interface Props{
  isActive?:boolean
}

export  function PopularProductsIcon({isActive}:Props) {
  return (
    <svg height="34" width="30" fill="none" viewBox="0 0 30 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8217 0.0314941L29.372 8.45532V25.303L14.8217 33.7268L0.271484 25.303V8.45532L14.8217 0.0314941ZM6.39631 13.7714L13.2901 17.7626V25.4947H16.3533V17.7626L23.2471 13.7714L21.7124 11.1204L14.8217 15.1097L7.9311 11.1204L6.39631 13.7714Z" 
      fill={`${isActive ? '#24B47E' : '#A8A8A8'}`}/>
    </svg>
  )
}
