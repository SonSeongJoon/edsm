import axios from 'axios';

export const sendKakaoCreateProduct = async (data) => {
	try {
		const response = await axios.get(
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao_create/name/${data.name}/phoneNum/${data.phoneNum}/file/${data.file}/link/${data.link}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};

export const sendKakaoModifyProduct = async (data) => {
	try {
		const response = await axios.get(
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao_modify/name/${data.name}/phoneNum/${data.phoneNum}/file/${data.file}/link/${data.link}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};

export const sendKakaoAgreeProduct = async (data) => {
	try {
		const response = await axios.get(
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao_agree/name/${data.name}/phoneNum/${data.writerPhonNum}/title/${data.title}/state/${data.state}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};
