import styles from './Create_From.module.css';

interface QuestionCategoryInputProps {
	questionCategories: string[],
	setQuestionCategories: React.Dispatch<React.SetStateAction<string[]>>,
	handleRemoveCategory: (index: number) => void,
	handleAddCategory: () => void
}

const QUESTION_CATEGORY_INPUT = ({ questionCategories, setQuestionCategories, handleRemoveCategory, handleAddCategory }: QuestionCategoryInputProps) => {
	const renderDeleteButton = (index: number) => {
		return index > 0 && (

			<button
				type="button"
				onClick={() => handleRemoveCategory(index)}
				className={styles.deleteCategoryButton}
			>
				Delete
			</button>
		);
	};
	return (
		<>
			<h5 className={styles.questionCategoriesTitle}>Question Categor(y)(ies)</h5>
			<div className={styles.questionCategories}>
				{questionCategories.map((category, index) => (
					<div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
						<div className={styles.questionCategoryItem}>
							<label className={styles.formLabel}>Question Category {index + 1}</label>
							<input
								value={category}
								onChange={(e) => {
									const newCategories = [...questionCategories];
									newCategories[index] = e.target.value;
									setQuestionCategories(newCategories);
								}}
								className={styles.formInput}
								placeholder="Enter question category"
								required
							/>
							{ renderDeleteButton(index) }
						</div>
					</div>
				))}
			</div>

			<button
				type="button"
				onClick={() => handleAddCategory()}
				className={styles.addCategoryButton}
			>
				Add Question Category
			</button>
		</>
	);
};

export default QUESTION_CATEGORY_INPUT;