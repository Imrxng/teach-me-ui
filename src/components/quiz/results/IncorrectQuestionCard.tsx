import { IncorrectAnswer } from '../../../types';
import styles from './ShowResult.module.css';

interface IncorrectQuestionCardProps {
    incorrectQuestion: IncorrectAnswer
}

const INCORRECT_ANSWER_CARD = ({ incorrectQuestion }: IncorrectQuestionCardProps) => {
	return (
		<div className={styles.card}>

			<div className={styles.info}>
				<p className={styles.answerTitle}>Question:</p>
				<p>{incorrectQuestion.question}</p>
			</div>

			<div className={styles.info}>
				<p className={styles.answerTitle}>Your Answer:</p>
				<p>{incorrectQuestion.yourAnswer?.join(', ') || 'No answer given'}</p>
			</div>

			<div className={styles.info}>
				<p className={styles.answerTitle}>Correct Answer:</p>
				<p>{incorrectQuestion.correctAnswer.join(', ')}</p>
			</div>
		</div>
	);
};

export default INCORRECT_ANSWER_CARD;