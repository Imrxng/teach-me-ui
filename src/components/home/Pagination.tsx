
interface PaginationProps {
	currentIndex: number;
	maxIndex: number;
	onPrevious: () => void;
	onNext: () => void;
}

const Pagination = ({ currentIndex, maxIndex, onPrevious, onNext }: PaginationProps) => (
	<div className="skipPagesTopDiv">
		<label htmlFor="amountPerPage">Current page: </label>
		<div className="skipPages">
			<p>{currentIndex} - {maxIndex}</p>
			<p
				className="arrow"
				style={{ color: currentIndex === 1 ? '#87c9b8b0' : '#87c9b8' }}
				onClick={onPrevious}
			>
				&#9664;
			</p>
			<p
				className="arrow"
				style={{ color: currentIndex === maxIndex ? '#87c9b8b0' : '#87c9b8' }}
				onClick={onNext}
			>
				&#9654;
			</p>
		</div>
	</div>
);

export default Pagination;