const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 클릭 수 파일 경로
const countFile = 'clickCount.json';

// 초기화 시 클릭 수 설정
if (!fs.existsSync(countFile)) {
    fs.writeFileSync(countFile, JSON.stringify({ count: 0 }));
}

// 정적 파일 제공
app.use(express.static('public'));

// 클릭 카운트 가져오기
app.get('/getClickCount', (req, res) => {
    const data = fs.readFileSync(countFile);
    const count = JSON.parse(data).count;
    res.json({ count });
});

// 클릭 카운트 증가
app.post('/incrementClick', (req, res) => {
    const data = fs.readFileSync(countFile);
    const json = JSON.parse(data);
    json.count++;
    fs.writeFileSync(countFile, JSON.stringify(json));
    res.json({ count: json.count });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
