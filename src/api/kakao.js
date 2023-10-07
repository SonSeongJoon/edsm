const axios = require('axios');

async function sendKakaoTalk() {
	const username = "seoulir07";  // DirectSend ID를 입력하세요.
	const key = "JAiY0S3262X8W94";  // DirectSend API Key를 입력하세요.
	const kakaoPlusId = "@seoulir07";
	const userTemplateNo = "20";

	// 수신자 정보를 설정합니다.
	const receiver = [
		{"name": "손성준", "mobile":"01028184783", "note1":"다이렉트센드 1", "note2":"다이렉트센드 2", "note3":"다이렉트센드 3", "note4":"다이렉트센드 4"},
	];

	const url = "https://directsend.co.kr/index.php/api_v2/kakao_notice";  // API 엔드포인트 URL

	try {
		const response = await axios.post(url, {
			username: username,
			key: key,
			type: "node",
			kakao_plus_id: kakaoPlusId,
			user_template_no: userTemplateNo,
			receiver: receiver
		}, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"Accept": "application/json",
				"Cache-Control": "no-cache"
			}
		});

		// 응답을 출력합니다.
		console.log("응답 코드:", response.status);
		console.log("응답 데이터:", response.data);

		// 메시지 전송 성공/실패를 확인하고 처리합니다.
		if(response.data.status === 1) {
			console.log("메시지가 성공적으로 전송되었습니다!");
		} else {
			console.log("메시지 전송 오류:", response.data.message);
		}
	} catch (error) {
		// 오류가 발생한 경우 처리합니다.
		console.log("오류 발생:", error);
	}
}

