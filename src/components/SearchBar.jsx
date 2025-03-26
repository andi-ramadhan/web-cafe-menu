const SearchBar = () => {
  return (
    <div className="max-w-[830px] mx-auto px-2 sm:px-4">
      <input
        type="search"
        placeholder="Search menu..."
        className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 text-black text-sm sm:text-base"
      />
    </div>
  )
}

export default SearchBar
