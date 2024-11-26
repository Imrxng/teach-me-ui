import styles from './search.module.css'

interface SearchProps {
    search: string;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
}

const Search = ({ search, onSearchChange, placeholder = "Search Course" } : SearchProps) => (
	
	<input
		type="text"
		name="search"
		id="search"
		className={styles.searchInput}
		value={search}
		onChange={onSearchChange}
		placeholder={placeholder}
	/>
);

export default Search;