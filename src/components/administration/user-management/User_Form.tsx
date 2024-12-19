import { useContext, useEffect, useState } from 'react';
import { createUser, updateUser } from '../../../ApiService';
import { User } from '../../../types';
import styles from './User_Form.module.css';
import { useForm } from 'react-hook-form';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import MODAL from '../modal/Modal';
import modal from '../modal/Modal.module.css';
import { useNavigate } from 'react-router-dom';

interface CreateUserFormProps {
	user?: string
}

const USER_FORM = ({ user }:CreateUserFormProps) => {
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<User>({
		defaultValues: {
			username: '',
			password: '',
			type: 'user'
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				username: user
			});
		}
	}, [user, reset]);

	const onSubmit = async (data: User) => {
		try {
			SET_LOADING(true);
			if (user) {
				const RESPONSE = await updateUser(data, user);
				SET_MESSAGE(RESPONSE);
				NAVIGATE('/settings')
			}
			else {
				await createUser(data);
				SET_MESSAGE(`"${data.username}" was successfully created`);
			}
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to create/update "${data.username}". Please try again.`);
		} finally {
			reset();
			SET_LOADING(false);
			SET_RESPONSE_MODAL(true);
		}
	};

	const usernameError = () => {
		return errors.username && <div className={styles.errorMessage}>Username is required</div>;
	};

	const typeError = () => {
		return errors.type && <div className={styles.errorMessage}>Type is required</div>;
	};

	const passwordError = () => {
		return errors.password && <div className={styles.errorMessage}>Password is required</div>;
	};

	const rightTitle = () => {
		if (user) {
			return 'Edit';
		} else return 'Create';
	};

	if (LOADING) return <LoadingSpinner message='Creating user!' />;

	return (
		<div className={styles.container}>
			<h1 className={styles.createUserTitle}>{rightTitle()} User</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete='off'>

				<div className={styles.formGroup}>
					<label className={styles.label}>Username</label>
					<input
						{...register('username', { required: true })}
						id='cy-create-user-username-input'
						className={styles.formControl}
						placeholder="Enter username"
						type='text'
						autoComplete='off'
					/>
					{ usernameError() }
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Password</label>
					<input
						{...register('password', { required: true })}
						id='cy-create-user-password-input'
						className={styles.formControl}
						placeholder="Enter password"
						type='password'
						autoComplete='new-password'
					/>
					{ passwordError() }
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Select user type</label>
					<select 
						{...register('type', { required: true })} 
						id='cy-create-user-select-role'
						className={styles.formControl}
					>
						<option id='cy-create-user-user-option' value="user">User</option>
						<option id='cy-create-user-admin-option' value="admin">Admin</option>
					</select>
					{ typeError() }
				</div>

				<button id='cy-create-user-create-btn' type="submit" className={styles.btnSubmit}>{rightTitle()}</button>
			</form>
			<MODAL open={RESPONSE_MODAL} onClose={() => SET_RESPONSE_MODAL(false)}>
				<div className={modal.responseModal} style={{ color: 'black' }}>
					<p>{MESSAGE}</p>
				</div>
			</MODAL>
		</div>
	);
};

export default USER_FORM;