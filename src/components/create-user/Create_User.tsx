import styles from './Create_User.module.css';
import { useForm } from 'react-hook-form';

interface User{
    username: string,
    email: string,
    password: string
}

const CREATE_USER = () => {
	const {
		watch,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<User>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: User) => {
		console.log(data);
		console.log(watch());
		reset();
	};

	const usernameError = () => {
		return errors.username && <div className={styles.errorMessage}>Username is required</div>;
	};

	const emailError = () => {
		return errors.email && <div className={styles.errorMessage}>E-mail is required</div>;
	};

	const passwordError = () => {
		return errors.password && <div className={styles.errorMessage}>Password is required</div>;
	};
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
					<label className={styles.label}>Email address</label>
					<input
						{...register('email', { required: true })}
						className={styles.formControl}
						placeholder="Enter email address"
						type='email'
						autoComplete='off'
					/>
					{ emailError() }
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

				<button type="submit" className={styles.btnSubmit}>Create</button>
			</form>
		</div>
	);
};

export default CREATE_USER;