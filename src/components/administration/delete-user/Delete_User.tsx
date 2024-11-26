import { useContext, useEffect, useState } from 'react';
import Search from '../../home/Search';
import styles from './Delete_User.module.css';
import { DELETE_USER_FROM_DB, GET_ALL_USERS } from '../../../ApiService';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import Pagination from '../../home/Pagination';

const DELETE_USER = () => {
	const [SEARCH, SET_SEARCH] = useState<string>('');
	const [CURRENT_PAGE, SET_CURRENT_PAGE] = useState(1);
	const [USERS_LIST, SET_USERS_LIST] = useState<string[]>([]);
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const USERS_PER_PAGE = 20;
	const TOTAL_PAGES = Math.ceil(USERS_LIST.length / USERS_PER_PAGE);
	const CURRENT_USERS_LIST = USERS_LIST.slice((CURRENT_PAGE - 1) * USERS_PER_PAGE, CURRENT_PAGE * USERS_PER_PAGE);

	const LOAD_USERS = async () => {
		SET_LOADING(true);
		const DATA: string[] = await GET_ALL_USERS();
		SET_USERS_LIST(DATA);
		SET_LOADING(false);
	};

	useEffect(() => {
		LOAD_USERS();
	}, [SET_LOADING]);

	const HANDLE_SEARCH_CHANGE: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const SEARCH_VALUE = event.target.value;
		SET_SEARCH(SEARCH_VALUE);
		FILTERED_USERS();
	};

	const FILTERED_USERS = () => {
		return CURRENT_USERS_LIST.filter((username) =>
			username ? username.toLowerCase().startsWith(SEARCH.toLowerCase()) : 1
		);
	};

	const DELETE_THIS_USER = async (username: string) => {
		const CONFRIRMATION: boolean = confirm(`Are you sure you want to delete: ${username.toUpperCase()}`);
		SET_LOADING(true);
		if (CONFRIRMATION) {
			await DELETE_USER_FROM_DB(username);
			LOAD_USERS();
		}
		SET_LOADING(false);
	};

	const HANDLE_NEXT_PAGE = () => {
		if (CURRENT_PAGE < TOTAL_PAGES) {
			SET_CURRENT_PAGE(CURRENT_PAGE + 1);
		}
	};

	const HANDLE_PREV_PAGE = () => {
		if (CURRENT_PAGE > 1) {
			SET_CURRENT_PAGE(CURRENT_PAGE - 1);
		}
	};

	if (LOADING) return <LoadingSpinner message='Gathering courses, please wait!' />;

	return (
		<div className={styles.usersContainer}>
			<h1 className={styles.pageTitle}>Delete User</h1>
			<div>
				<Search search={SEARCH} onSearchChange={HANDLE_SEARCH_CHANGE} placeholder='Search User' />
			</div>
			{USERS_LIST.length > 0 ? (
				<div className={styles.usersList}>
					{FILTERED_USERS().map((username, index) => (
						<div key={index} className={styles.usersCard}>
							<button
								onClick={() => DELETE_THIS_USER(username)}
                                id={`cy-delete-user-btn-${index}`}
								className={styles.deleteButton}
							>
                                &times;
							</button>
							<p className={styles.courseTitle}>{username.toUpperCase()}</p>
						</div>
					))}
				</div>
			)
				:
				(
					<>
						<p>NO USERS WHERE FOUND</p>
					</>
				)
			}
			<div className={styles.userFooter}>
				<Pagination
					currentIndex={CURRENT_PAGE}
					maxIndex={TOTAL_PAGES}
					onPrevious={HANDLE_PREV_PAGE}
					onNext={HANDLE_NEXT_PAGE}
				/>
			</div>
		</div>
	);
};

export default DELETE_USER;