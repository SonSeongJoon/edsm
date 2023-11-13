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
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao_modify/name/${data.name}/writeName/${data.writeName}/phoneNum/${data.phoneNum}/file/${data.file}/link/${data.link}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};

export const sendKakaoAgreeProduct = async (data, state) => {
	try {
		const response = await axios.get(
			`https://port-0-kakaoapi-euegqv2blnfy3ekc.sel5.cloudtype.app/send_kakao_agree/name/${data.name}/phoneNum/${data.writerPhoneNum}/title/${data.title}/state/${state}/link/${data.id}`,
		);
		console.log('Kakao notification sent successfully:', response.data);
	} catch (error) {
		console.error('Error sending Kakao notification:', error);
	}
};
