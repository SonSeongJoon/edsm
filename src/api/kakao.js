// apiRequests.js
import axios from 'axios';

export const sendKakaoNotification = async (data) => {
	try {
		const response = await axios.post(
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao/name/${data.name}/phoneNum/${data.phoneNum}/file/${data.file}/link/${data.link}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};
