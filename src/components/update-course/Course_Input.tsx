import styles from '../create-course/Create_From.module.css';

interface CourseInputProps {
    course: string,
    courseTitles: string[],
    onSelect: (selectedCourse: string) => Promise<void>
}

const COURSE_INPUT = ({ course, courseTitles, onSelect }: CourseInputProps) => {
	return (
		<>
			<select
				className={styles.formInput}
				value={course}
				onChange={(e) => onSelect(e.target.value)}
				required
			>
				<option value="">--SELECT COURSE--</option>
				{courseTitles.map((course, index) => <option key={index} value={course}>{course}</option>)}
			</select>
			{course === '' && <div className={styles.errorMessage}>Course is required</div>}
		</>
	);
};

export default COURSE_INPUT;