const Header = () => {
  return (
    <header className="max-w-[1400px] mx-auto pb-4 pt-6 px-4 sm:pb-8 sm:pt-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl sm:text-6xl text-white">
          <span className="font-[Poppins] font-extralight italic text-xl sm:text-2xl">RE:</span>Coffee
        </h1>
        <nav className="flex flex-row items-center gap-5">
          <a className="nav-link" href="#menu">Menu</a>
          <a className="nav-link" href="#">Contact Us</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
