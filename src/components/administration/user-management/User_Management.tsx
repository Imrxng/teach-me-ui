import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../loader/LoadingSpinner';
import DATACONTEXT from '../../../context/DataContext';
import Search from '../../home/Search';
import Pagination from '../../home/Pagination';
import styles from './userManagement.module.css';
import { deleteUserFromDb, getAllUsernames } from '../../../ApiService';
import { FaTrashAlt } from 'react-icons/fa';
import MODAL from '../modal/Modal';
import modal from '../modal/Modal.module.css';
import { useNavigate } from 'react-router-dom';

const USER_MANAGEMENT = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [SEARCH, SETSEARCH] = useState<string>('');
	const [CURRENT_INDEX, SET_CURRENT_INDEX] = useState<number>(1);
	const [USERNAMES, SET_USERNAMES] = useState<string[]>([]);
	const [FILTERED_USERNAMES, SET_FILTERED_USERNAMES] = useState<string[]>([]);
	const START_INDEX = (CURRENT_INDEX - 1) * 5;
	const [SELECTED_USER, SET_SELECTED_USER] = useState<string>('');
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const NAVIGATE = useNavigate();

	const loadUsernames = async () => {
		try {
			SET_LOADING(true);
			const DATA: string[] = await getAllUsernames(); 
			SET_USERNAMES(DATA);
			SET_FILTERED_USERNAMES(DATA);
		} catch (error: unknown) {
			console.error(`ERROR: ${error}`);
			SET_LOADING(false);
		}
		SET_LOADING(false);
	};

	useEffect(() => {
		loadUsernames();
	}, [SET_LOADING]);

	const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const searchValue = event.target.value;
		SETSEARCH(searchValue);
		updateFilteredUsernames(searchValue);
	};

	const updateFilteredUsernames = (searchValue: string) => {
		const filtered = USERNAMES.filter((username) =>
			username ? username.toLowerCase().startsWith(searchValue.toLowerCase()) : 1
		);
		SET_FILTERED_USERNAMES(filtered);
	};

	const goToPreviousPage = () => {
		SET_CURRENT_INDEX((prevIndex) => Math.max(prevIndex - 1, 1));
	};

	const goToNextPage = () => {
		SET_CURRENT_INDEX((prevIndex) =>
			Math.min(prevIndex + 1, Math.ceil(FILTERED_USERNAMES.length / 5))
		);
	};

	const handleDeleteBtnClick = (username: string) => {
		SET_SELECTED_USER(username);
		SET_CONFIRMATION_MODAL(true);
	};

	const deleteUser = async (username: string) => {
		try {
			SET_LOADING(true);
			await deleteUserFromDb(username);
			SET_LOADING(false);
			loadUsernames();
			SET_CONFIRMATION_MODAL(false);
		} catch (error: unknown) {
			console.error(`ERROR: ${error}`);
		}
		SET_LOADING(false);
	};

	if (LOADING) return <LoadingSpinner message='Gathering information, please wait!' />;

	return (
		<div className={styles.tableContainer}>
			<div style={{ display: 'flex', gap: '10px' }}>
				<Search placeholder={'Search User'} search={SEARCH} onSearchChange={handleSearchChange} />
				<button id='cy-settings-add-user-btn' className='mainButton' onClick={() => NAVIGATE('/settings/create-user')}>Add User</button>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th>Usernames</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							FILTERED_USERNAMES.map((username, index) => {
								if (index >= START_INDEX && index < START_INDEX + 5) {
									return (
										<tr key={index}>
											<td>{username}</td>
											<td style={{ display: 'flex', alignItems: 'center' }}>
												<button id={`cy-settings-edit-user-${index}`} className="mainButton settingsCourseEdit" onClick={() => NAVIGATE(`/settings/edit-user/${username}`)}>Edit</button>

												<FaTrashAlt id={`cy-settings-delete-user-${index}`} className='deleteCourseButton'
													style={{ color: '#d9534f', padding: 0, fontSize: 30 }} onClick={() => handleDeleteBtnClick(username)}
												/>
											</td>
										</tr>
									);
								}

							})
						}
					</tbody>
				</table>
				<MODAL open={CONFIRMATION_MODAL} onClose={() => SET_CONFIRMATION_MODAL(false)}>
					<div className={modal.modal} style={{ color: 'black' }}>
						<p className={modal.modalTitle} style={{ color: 'black' }}>Confirm Delete</p>
						<p className={modal.modalTxt}>Are you sure you want to delete this user?</p>
						<p>{SELECTED_USER}</p>
						<button
							type="button"
							id='cy-delete-user-btn-confirm'
							className={modal.actionBtn}
							onClick={() => deleteUser(SELECTED_USER)}
						>
							Delete
						</button>
					</div>
				</MODAL>
			</div>
			{
				FILTERED_USERNAMES.length > 0
					?
					<Pagination
						currentIndex={CURRENT_INDEX}
						maxIndex={Math.ceil(FILTERED_USERNAMES.length / 5)}
						onPrevious={goToPreviousPage}
						onNext={goToNextPage}
					/>
					:
					<>
					</>
			}
		</div>
	);
};

export default USER_MANAGEMENT;