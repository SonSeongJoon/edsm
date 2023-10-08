// apiRequests.js
import axios from 'axios';

export const sendKakaoNotification = async () => {
	try {
		const response = await axios.get(
			'/send_kakao',
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};
