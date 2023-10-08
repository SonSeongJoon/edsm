import React from 'react';
import axios from 'axios';

export default function MyApp() {
	const sendKakaoTalk = async () => {
		const url = "http://localhost:5000/send-kakao-message";

		const messageData = {
			username: "seoulir07",
			key: "JAiY0S3262X8W94",
			kakaoPlusId: "@seoulir07",
			userTemplateNo: "20",
			receiver: [
				{
					"name": "손성준",
					"mobile": "01028184783",
					"note1": "다이렉트센드 1",
					"note2": "다이렉트센드 2",
					"note3": "다이렉트센드 3",
					"note4": "다이렉트센드 4"
				}
			]
		};

		try {
			const response = await axios.post(url, messageData);

			console.log("응답 코드:", response.status);
			console.log("응답 데이터:", response.data);

		} catch (error) {
			console.log("오류 발생:", error);
		}
	};

	return (
		<div>
			<button onClick={sendKakaoTalk}>
				Send KakaoTalk Message
			</button>
		</div>
	);
}
