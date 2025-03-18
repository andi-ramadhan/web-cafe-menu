const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="jumbotron w-full h-full">
        <img
          src="/assets/jumbotron1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30"></div>
      </div>
    </div>
  )
}

export default Background
