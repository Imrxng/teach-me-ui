
interface SearchProps {
    search: string;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Search = ({ search, onSearchChange } : SearchProps) => (
	
	<input
		type="text"
		name="search"
		id="search"
		className="search-input"
		value={search}
		onChange={onSearchChange}
		placeholder="Search course"
	/>
);

export default Search;