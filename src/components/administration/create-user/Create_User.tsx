import { useContext } from 'react';
import { createUser } from '../../../ApiService';
import { User } from '../../../types';
import styles from './Create_User.module.css';
import { useForm } from 'react-hook-form';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';

const CREATE_USER = () => {
	const {SET_LOADING, LOADING} = useContext(DATACONTEXT)
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

	const onSubmit = async (data: User) => {
		console.log(data);
		SET_LOADING(true);
		await createUser(data);
		reset();
		SET_LOADING(false);
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

	if (LOADING) return <LoadingSpinner message='Creating user!' />;

	return (
		<div className={styles.container}>
			<h1 className={styles.createUserTitle}>Create User</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete='off'>

				<div className={styles.formGroup}>
					<label className={styles.label}>Username</label>
					<input
						{...register('username', { required: true })}
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
						className={styles.formControl}
						placeholder="Enter password"
						type='password'
						autoComplete='new-password'
					/>
					{ passwordError() }
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Select user type</label>
					<select {...register('type', { required: true })} className={styles.formControl}>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
					{ typeError() }
				</div>

				<button type="submit" className={styles.btnSubmit}>Create</button>
			</form>
		</div>
	);
};

export default CREATE_USER;