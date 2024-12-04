import pdf from '../../../assets/TemplateJson_Explanation.pdf';
const DOWNLOAD_TEMPLATE = () => {
	const handleDownload = () => {
		const JSON_DATA = {
			id: new Date().getTime().toString(),
			name: '',
			category: '',
			passingGrade: 50,
			completeTime: 60,
			questionCategories: [''],
			questions: [
				{
					question: '',
					type: '',
					category: '',
					answers: [
						{
							answer: '',
							reason: '',
						}
					],
					'question-answer-result': [''],
				}
			],
		};

		const JSON_BLOB = new Blob([JSON.stringify(JSON_DATA, null, 4)], { type: 'application/json' });

		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(JSON_BLOB);
		downloadLink.download = 'courseObject_Template.json';

		downloadLink.click();

		URL.revokeObjectURL(downloadLink.href);

		const PDF_LINK = document.createElement('a');
		PDF_LINK.href = `${pdf}`;
		PDF_LINK.download = 'TemplateJson_Explanation.pdf';
		PDF_LINK.click();
	};

	return (
		<button onClick={handleDownload} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Download JSON
		</button>
	);
};

export default DOWNLOAD_TEMPLATE;