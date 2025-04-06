const SearchBar = () => {
  return (
    <div className="max-w-[800px] mx-auto">
      <input
        type="search"
        placeholder="Search menu..."
        className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 text-black text-sm sm:text-base border-1 border-coffee-cho/70"
      />
    </div>
  )
}

export default SearchBar
