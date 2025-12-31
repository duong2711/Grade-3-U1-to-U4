// MCQscript.js - Phiên bản Tết (Có xem lại chi tiết bài làm)

// 🚨 CẤU HÌNH FIREBASE (Config chuẩn của bạn) 🚨
const firebaseConfig = {
  apiKey: "AIzaSyA0Zpsobh9D4tciogJgZ_lAmA7-X42Hpsg",
  authDomain: "grade3-u1-to-u4.firebaseapp.com",
  projectId: "grade3-u1-to-u4",
  storageBucket: "grade3-u1-to-u4.firebasestorage.app",
  messagingSenderId: "540984537868",
  appId: "1:540984537868:web:7986cbfa22aeae9da9cf29",
  measurementId: "G-FQYMMG7NYF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 🚨 NGÂN HÀNG CÂU HỎI (20 Câu ngẫu nhiên) 🚨
const fullQuizData = [
    // (Giữ nguyên danh sách câu hỏi của bạn, để tiết kiệm dòng mình rút gọn hiển thị ở đây, 
    // nhưng trong code thực tế bạn hãy giữ nguyên danh sách 50 câu hỏi cũ nhé)
    { id: "u1_g1", tag: "Động từ To Be", q: "Hello, I ______ Tom.", options: {A: "is", B: "am", C: "are"}, correct: "B", explain: "Dùng 'am' cho chủ ngữ 'I'." },
    { id: "u1_g2", tag: "Động từ To Be", q: "What ______ your name?", options: {A: "is", B: "am", C: "are"}, correct: "A", explain: "Tên (số ít) dùng 'is'." },
    { id: "u1_g3", tag: "Trợ động từ", q: "How ______ you spell 'Alfie'?", options: {A: "are", B: "do", C: "is"}, correct: "B", explain: "Cấu trúc: How do you spell...?" },
    { id: "u1_g4", tag: "Động từ To Be", q: "Where ______ you from?", options: {A: "is", B: "am", C: "are"}, correct: "C", explain: "You đi với are." },
    { id: "u1_g5", tag: "Động từ To Be", q: "She ______ from Japan.", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "She đi với is." },
    { id: "u1_g6", tag: "Cấu trúc Like", q: "Do your friends like ______?", options: {A: "dance", B: "dancing", C: "dances"}, correct: "B", explain: "Like + V-ing." },
    { id: "u1_g7", tag: "Trợ động từ", q: "______ your friends like singing?", options: {A: "Do", B: "Does", C: "Are"}, correct: "A", explain: "Friends (số nhiều) -> Do." },
    { id: "u1_g8", tag: "Từ để hỏi", q: "______ is she from?", options: {A: "What", B: "Who", C: "Where"}, correct: "C", explain: "Hỏi nơi chốn -> Where." },
    { id: "u1_g9", tag: "Câu trả lời ngắn", q: "No, they ______.", options: {A: "do", B: "don't", C: "aren't"}, correct: "B", explain: "No -> don't." },
    { id: "u1_g10", tag: "Mạo từ", q: "I'm from ______ USA.", options: {A: "a", B: "the", C: "an"}, correct: "B", explain: "Nước Mỹ -> The USA." },
    { id: "u2_g1", tag: "Từ để hỏi", q: "______ is he? - He's my brother.", options: {A: "What", B: "Where", C: "Who"}, correct: "C", explain: "Hỏi người -> Who." },
    { id: "u2_g2", tag: "Sở hữu cách", q: "This is my sister. ______ name is Lucy.", options: {A: "His", B: "My", C: "Her"}, correct: "C", explain: "Sister (nữ) -> Her." },
    { id: "u2_g3", tag: "Sở hữu cách", q: "This is my father. ______ name is Sam.", options: {A: "His", B: "Her", C: "Your"}, correct: "A", explain: "Father (nam) -> His." },
    { id: "u2_g4", tag: "Mệnh lệnh", q: "______ your room!", options: {A: "Cleans", B: "Clean", C: "Cleaning"}, correct: "B", explain: "Mệnh lệnh dùng động từ nguyên mẫu." },
    { id: "u2_g5", tag: "Mệnh lệnh", q: "______ to bed!", options: {A: "Go", B: "Goes", C: "Going"}, correct: "A", explain: "Go to bed." },
    { id: "u2_g6", tag: "Phủ định", q: "I ______ like dogs.", options: {A: "not", B: "don't", C: "doesn't"}, correct: "B", explain: "I don't like..." },
    { id: "u2_g7", tag: "Hiện tại đơn", q: "I ______ my cat.", options: {A: "like", B: "likes", C: "liking"}, correct: "A", explain: "I like..." },
    { id: "u2_g8", tag: "Đại từ chỉ định", q: "Is ______ your grandmother?", options: {A: "those", B: "that", C: "these"}, correct: "B", explain: "Số ít -> that." },
    { id: "u2_g9", tag: "Động từ To Be", q: "Who ______ she?", options: {A: "'s", B: "'re", C: "'m"}, correct: "A", explain: "Who's = Who is." },
    { id: "u2_g10", tag: "Sở hữu cách", q: "______ name is Ben.", options: {A: "He", B: "His", C: "She"}, correct: "B", explain: "Tên của anh ấy -> His name." },
    { id: "u3_g1", tag: "Đại từ chỉ định", q: "Is ______ your eraser?", options: {A: "these", B: "this", C: "those"}, correct: "B", explain: "Số ít -> this." },
    { id: "u3_g2", tag: "Đại từ chỉ định", q: "Are ______ your pencils?", options: {A: "this", B: "that", C: "these"}, correct: "C", explain: "Số nhiều -> these." },
    { id: "u3_g3", tag: "Động từ To Be", q: "______ these your notebooks?", options: {A: "Is", B: "Am", C: "Are"}, correct: "C", explain: "These -> Are." },
    { id: "u3_g4", tag: "Câu trả lời ngắn", q: "Yes, they ______.", options: {A: "is", B: "are", C: "do"}, correct: "B", explain: "They are." },
    { id: "u3_g5", tag: "Câu trả lời ngắn", q: "Do you like Art? - Yes, I ______.", options: {A: "am", B: "don't", C: "do"}, correct: "C", explain: "Yes, I do." },
    { id: "u3_g6", tag: "Từ để hỏi", q: "______ do you have English?", options: {A: "What", B: "When", C: "Where"}, correct: "B", explain: "Hỏi khi nào -> When." },
    { id: "u3_g7", tag: "Giới từ", q: "I have Math ______ Mondays.", options: {A: "in", B: "at", C: "on"}, correct: "C", explain: "Thứ trong tuần dùng 'on'." },
    { id: "u3_g8", tag: "Động từ To Be", q: "What ______ your favorite color?", options: {A: "is", B: "are", C: "do"}, correct: "A", explain: "Color (số ít) -> is." },
    { id: "u3_g9", tag: "Động từ To Be", q: "My favorite color ______ blue.", options: {A: "am", B: "is", C: "are"}, correct: "B", explain: "Color -> is." },
    { id: "u3_g10", tag: "Câu trả lời ngắn", q: "Is this your ruler? - No, it ______.", options: {A: "is", B: "isn't", C: "not"}, correct: "B", explain: "No, it isn't." },
    { id: "u4_g1", tag: "Động từ To Be", q: "Where ______ Dad?", options: {A: "'s", B: "'re", C: "do"}, correct: "A", explain: "Dad -> 's." },
    { id: "u4_g2", tag: "Giới từ", q: "He's ______ the living room.", options: {A: "on", B: "in", C: "at"}, correct: "B", explain: "Trong phòng -> in." },
    { id: "u4_g3", tag: "Tiếp diễn", q: "What is he ______?", options: {A: "do", B: "doing", C: "does"}, correct: "B", explain: "is + doing." },
    { id: "u4_g4", tag: "Tiếp diễn", q: "She is ______.", options: {A: "sleeping", B: "sleeps", C: "sleep"}, correct: "A", explain: "is + sleeping." },
    { id: "u4_g5", tag: "Động từ To Be", q: "______ the picture in the bedroom?", options: {A: "Are", B: "Do", C: "Is"}, correct: "C", explain: "Picture (số ít) -> Is." },
    { id: "u4_g6", tag: "Giới từ", q: "I live ______ Le Loi Street.", options: {A: "in", B: "on", C: "at"}, correct: "B", explain: "Tên đường -> on." },
    { id: "u4_g7", tag: "Giới từ", q: "I live ______ Hanoi.", options: {A: "in", B: "on", C: "at"}, correct: "A", explain: "Thành phố -> in." },
    { id: "u4_g8", tag: "Hiện tại đơn", q: "My bedroom ______ a bed.", options: {A: "have", B: "has", C: "having"}, correct: "B", explain: "Bedroom (số ít) -> has." },
    { id: "u4_g9", tag: "Cấu trúc There is", q: "There ______ a cat in the box.", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "A cat -> is." },
    { id: "u4_g10", tag: "Tiếp diễn", q: "What ______ she doing?", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "She -> is." },
    { id: "dial_1", tag: "Chào hỏi", q: "Mai: Hello, I'm Mai. - Tom: ______", options: {A: "I'm fine.", B: "Hello, I'm Tom.", C: "Goodbye."}, correct: "B", explain: "Chào lại và giới thiệu tên." },
    { id: "dial_2", tag: "Sức khỏe", q: "Alfie: How are you? - Ben: ______", options: {A: "I'm six.", B: "I'm Ben.", C: "I'm fine, thank you."}, correct: "C", explain: "Hỏi sức khỏe -> I'm fine." },
    { id: "dial_3", tag: "Mệnh lệnh", q: "Teacher: Open your books! - Student: ______", options: {A: "Yes, Teacher.", B: "No, I'm not.", C: "I'm happy."}, correct: "A", explain: "Vâng, thưa cô." },
    { id: "dial_4", tag: "Đồ vật", q: "Nick: Is this your pencil? - Cody: ______", options: {A: "Yes, it is.", B: "Yes, I am.", C: "Yes, they are."}, correct: "A", explain: "Yes, it is." },
    { id: "dial_5", tag: "Màu sắc", q: "Tom: What color is it? - Mai: ______", options: {A: "It's a pen.", B: "It's blue.", C: "Yes, it is."}, correct: "B", explain: "Trả lời màu xanh (Blue)." },
    { id: "dial_6", tag: "Giao tiếp", q: "Mom: Clean your room! - Boy: ______", options: {A: "OK, Mom.", B: "Thanks, Mom.", C: "Hello, Mom."}, correct: "A", explain: "Đồng ý -> OK, Mom." },
    { id: "dial_7", tag: "Quê quán", q: "Dad: Where are you from? - Alfie: ______", options: {A: "I'm Alfie.", B: "I'm from Alpha.", C: "I'm seven."}, correct: "B", explain: "I'm from..." },
    { id: "dial_8", tag: "Người thân", q: "Mai: Who's he? - Lan: ______", options: {A: "He's five.", B: "He's my brother.", C: "She's my sister."}, correct: "B", explain: "He's..." },
    { id: "dial_9", tag: "Sở thích", q: "Tom: Do you like Music? - Ben: ______", options: {A: "Yes, I do.", B: "Yes, I am.", C: "Yes, it is."}, correct: "A", explain: "Yes, I do." },
    { id: "dial_10", tag: "Tuổi tác", q: "Grandma: How old are you? - Girl: ______", options: {A: "I'm fine.", B: "I'm eight.", C: "I'm happy."}, correct: "B", explain: "I'm eight." }
];

// Hàm lấy ngẫu nhiên câu hỏi
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor(Math.random() * i);
        temp = shuffled[i];
        shuffled[i] = shuffled[index];
        shuffled[index] = temp;
    }
    return shuffled.slice(0, size);
}

const selectedQuestions = getRandomSubarray(fullQuizData, 20);

// --- TẠO GIAO DIỆN CÂU HỎI ---
const quizForm = document.getElementById('quizForm');
if (quizForm) {
    selectedQuestions.forEach((item, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';
        qDiv.id = item.id;

        const pTag = document.createElement('p');
        pTag.innerText = `Câu ${index + 1}: ${item.q}`;
        qDiv.appendChild(pTag);

        for (const [key, val] of Object.entries(item.options)) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            const label = document.createElement('label');
            label.dataset.value = key;
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = item.id;
            radio.value = key;
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${key}. ${val}`));
            optionDiv.appendChild(label);
            qDiv.appendChild(optionDiv);
        }
        quizForm.appendChild(qDiv);
    });
}

// --- XỬ LÝ NHẠC TẾT ---
let isPlaying = false;
const audio = document.getElementById("tetAudio");
const musicBtn = document.querySelector(".music-control");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

if(audio) audio.volume = 0.5;

function toggleMusic() {
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        musicIcon.innerText = "🔇";
        musicText.innerText = "Bật Nhạc";
        if(musicBtn) musicBtn.classList.remove("music-playing");
    } else {
        audio.play().then(() => {
            musicIcon.innerText = "💿";
            musicText.innerText = "Đang Phát";
            if(musicBtn) musicBtn.classList.add("music-playing");
        }).catch(error => alert("Lỗi nhạc."));
    }
    isPlaying = !isPlaying;
}

// 🚨 LOGIC MỚI: NỘP BÀI & LƯU CHI TIẾT 🚨
function submitQuiz() {
    let score = 0;
    const total = selectedQuestions.length;
    let wrongTopics = new Set();
    
    // Mảng lưu chi tiết từng câu để lưu vào Firebase
    let detailHistory = [];

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Đã Nộp Bài - Chúc Mừng Năm Mới! 🧧";
    submitBtn.style.backgroundColor = "#555";

    selectedQuestions.forEach(item => {
        const selectedOption = document.querySelector(`input[name="${item.id}"]:checked`);
        const qContainer = document.getElementById(item.id);
        
        let userAnswer = selectedOption ? selectedOption.value : "Bỏ trống";
        let isCorrect = userAnswer === item.correct;

        // Lưu thông tin chi tiết
        detailHistory.push({
            question: item.q,
            userAnswer: userAnswer,
            correctAnswer: item.correct,
            explanation: item.explain,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            score++;
            if (selectedOption) selectedOption.parentElement.classList.add('correct-answer');
        } else {
            if (selectedOption) selectedOption.parentElement.classList.add('wrong-answer');
            wrongTopics.add(item.tag);
            
            const correctLabel = qContainer.querySelector(`label[data-value="${item.correct}"]`);
            if (correctLabel) correctLabel.classList.add('correct-answer');
            
            const explainDiv = document.createElement('div');
            explainDiv.style.marginTop = '10px';
            explainDiv.style.color = '#d32f2f';
            explainDiv.style.fontStyle = 'italic';
            explainDiv.innerHTML = `💡 ${item.explain}`;
            qContainer.appendChild(explainDiv);
        }
        
        qContainer.querySelectorAll('input').forEach(r => r.disabled = true);
    });

    // Hiện kết quả
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    let message = score >= total * 0.8 ? "Tuyệt vời! Nhận lì xì thôi! 🧧" : "Cố gắng hơn nhé! 💪";
    let improveHtml = wrongTopics.size > 0 ? `<br><strong>Cần ôn lại:</strong> ${Array.from(wrongTopics).join(", ")}` : "";

    resultDiv.innerHTML = `<h3>Kết quả: ${score}/${total}</h3><p>${message}</p>${improveHtml}`;

    // Lưu vào Firebase kèm chi tiết
    saveToFirebase(score, total, detailHistory);
}

// 🚨 LƯU DATA VÀO FIREBASE (KÈM CHI TIẾT) 🚨
function saveToFirebase(score, total, details) {
    if (typeof db === 'undefined') return;

    let nameInput = document.getElementById("studentName");
    let name = (nameInput && nameInput.value.trim() !== "") ? nameInput.value : "Bạn Giấu Tên";

    db.collection("exam_history").add({
        name: name,
        score: score,
        total: total,
        topic: "Tet_Grade3_Final",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        details: details // Lưu mảng chi tiết bài làm vào đây
    })
    .then(() => {
        console.log("Lưu thành công!");
        loadHistory();
    })
    .catch((error) => console.error("Lỗi lưu:", error));
}

// Biến toàn cục lưu dữ liệu lịch sử để hiển thị popup
let globalHistoryData = [];

// 🚨 TẢI LỊCH SỬ & TẠO NÚT XEM CHI TIẾT 🚨
function loadHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = "⏳ Đang tải...";

    if (typeof db === 'undefined') return;

    db.collection("exam_history")
        .limit(50)
        .get()
        .then((querySnapshot) => {
            let exams = [];
            querySnapshot.forEach((doc) => {
                exams.push(doc.data());
            });

            exams = exams.filter(item => item.topic === "Tet_Grade3_Final");
            exams.sort((a, b) => {
                let tA = a.timestamp ? a.timestamp.seconds : 0;
                let tB = b.timestamp ? b.timestamp.seconds : 0;
                return tB - tA;
            });
            exams = exams.slice(0, 10);
            
            // Lưu vào biến toàn cục để dùng cho Popup
            globalHistoryData = exams;

            let html = '<ul style="list-style: none; padding: 0;">';
            if (exams.length === 0) {
                html += '<li style="padding:10px;">Chưa có bài làm nào.</li>';
            } else {
                exams.forEach((data, index) => {
                    let timeString = "---";
                    if (data.timestamp) {
                        const date = data.timestamp.toDate();
                        timeString = `${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')} - ${date.getDate()}/${date.getMonth()+1}`;
                    }
                    
                    const isMax = data.score === data.total;
                    const icon = isMax ? '🏆' : '📝';
                    
                    // Thêm nút "Xem lại"
                    // index chính là vị trí trong mảng globalHistoryData
                    html += `
                    <li style="border-bottom: 1px dashed #ef9a9a; padding: 8px 0; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span>${icon} <strong>${data.name}</strong></span><br>
                            <small style="color:#777;">${timeString}</small>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-weight: bold; font-size: 1.1em; color: ${isMax ? '#d32f2f' : '#333'}">${data.score}/${data.total}</span><br>
                            <button class="btn-view-detail" onclick="viewHistoryDetail(${index})">Xem lại</button>
                        </div>
                    </li>`;
                });
            }
            html += '</ul>';
            historyList.innerHTML = html;
        })
        .catch((error) => {
            console.error("Lỗi:", error);
            historyList.innerHTML = "Lỗi tải dữ liệu.";
        });
}

// 🚨 HÀM HIỆN POPUP CHI TIẾT 🚨
function viewHistoryDetail(index) {
    const data = globalHistoryData[index];
    if (!data || !data.details) {
        alert("Bài làm này chưa lưu chi tiết (Do là dữ liệu cũ). Hãy làm bài mới để xem nhé!");
        return;
    }

    const modal = document.getElementById("historyModal");
    const modalBody = document.getElementById("modalBody");
    
    // Tạo bảng chi tiết
    let html = `
        <p><strong>Người làm:</strong> ${data.name}</p>
        <p><strong>Điểm số:</strong> ${data.score}/${data.total}</p>
        <table class="detail-table">
            <thead>
                <tr>
                    <th>Câu hỏi</th>
                    <th>Bạn chọn</th>
                    <th>Đáp án đúng</th>
                    <th>Sửa</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.details.forEach(item => {
        // Chỉ hiện những câu sai hoặc hiện tất cả (ở đây mình hiện tất cả nhưng tô màu câu sai)
        const rowClass = item.isCorrect ? 'row-correct' : 'row-wrong';
        const icon = item.isCorrect ? '✅' : '❌';
        
        html += `
            <tr class="${rowClass}">
                <td width="40%">${item.question}</td>
                <td>${item.userAnswer} ${icon}</td>
                <td>${item.correctAnswer}</td>
                <td>${item.isCorrect ? '<span style="color:green">Làm tốt lắm!</span>' : '<span style="color:#d32f2f">' + item.explanation + '</span>'}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    modalBody.innerHTML = html;
    modal.style.display = "block";
}

// Đóng modal
function closeModal() {
    document.getElementById("historyModal").style.display = "none";
}

// Đóng khi click ra ngoài
window.onclick = function(event) {
    const modal = document.getElementById("historyModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Chạy khởi tạo
loadHistory();