const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-kakao-message', async (req, res) => {
	try {
		const { username, key, kakaoPlusId, userTemplateNo, receiver } = req.body;
		const apiUrl = 'https://directsend.co.kr/index.php/api_v2/kakao_notice';

		const response = await axios.post(apiUrl, {
			username,
			key,
			type: 'node',
			kakao_plus_id: kakaoPlusId,
			user_template_no: userTemplateNo,
			receiver
		});

		res.json(response.data);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
