/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from 'react-router-dom';
import { RootObject } from '../../../types';

interface TABLE_Props {
    COURSES: RootObject[];
    CURRENT_INDEX: number;
}

const TABLE = ({ COURSES, CURRENT_INDEX }: TABLE_Props) => {
	const startIndex = (CURRENT_INDEX - 1) * 5;
	const navigate = useNavigate();

	if (COURSES.length === 0) {
		return (
			<>
                Geen cursussen gevonden
			</>
		);
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Course</th>
					<th>Category</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{
					COURSES.map((course, index) => {
						if (index >= startIndex && index < startIndex + 5) {
							return (
								<tr key={index}>
									<td>{course.content.name}</td>
									<td>{course.content.category}</td>
									<td>{course.content.date}</td>
									<td style={{ padding: 0 }}><button className="startQuizButton" onClick={()=> navigate(`quiz/${course.key.substring(8, course.key.length - 5)}`)} >Start</button></td>
								</tr>
							);
						}

					})
				}
			</tbody>
		</table>
	);
};

export default TABLE;