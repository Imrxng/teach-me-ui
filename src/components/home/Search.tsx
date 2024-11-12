
interface SearchProps {
    search: string;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Search = ({ search, onSearchChange } : SearchProps) => (
	
	<input
		type="text"
		name="search"
		id="search"
		value={search}
		onChange={onSearchChange}
		placeholder="Name"
	/>
);

export default Search;