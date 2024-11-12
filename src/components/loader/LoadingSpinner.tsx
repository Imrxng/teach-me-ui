
interface LoadingSpinnerProps {
	message: string;
}

const LoadingSpinner = ({ message } : LoadingSpinnerProps) => (
	<div>
		<div className="spinner"></div>
		<p>{message}</p>
	</div>
);

export default LoadingSpinner;