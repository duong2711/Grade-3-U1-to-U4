// MCQscript.js - Phiên bản Tết (Phân tích lỗi sai & Gợi ý cải thiện)

// 🚨 BƯỚC 1: CẤU HÌNH FIREBASE (Giữ nguyên) 🚨
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

// 🚨 BƯỚC 2: NGÂN HÀNG CÂU HỎI (ĐÃ THÊM NHÃN "TAG" ĐỂ PHÂN TÍCH) 🚨
const fullQuizData = [
    // --- PHẦN 1: NGỮ PHÁP (GRAMMAR) ---
    { id: "u1_g1", tag: "Động từ To Be (am/is/are)", q: "Hello, I ______ Tom.", options: {A: "is", B: "am", C: "are"}, correct: "B", explain: "Dùng 'am' cho chủ ngữ 'I'." },
    { id: "u1_g2", tag: "Động từ To Be (am/is/are)", q: "What ______ your name?", options: {A: "is", B: "am", C: "are"}, correct: "A", explain: "Chủ ngữ 'your name' số ít -> dùng 'is'." },
    { id: "u1_g3", tag: "Cách dùng Do/Does", q: "How ______ you spell 'Alfie'?", options: {A: "are", B: "do", C: "is"}, correct: "B", explain: "Cấu trúc: How do you spell...?" },
    { id: "u1_g4", tag: "Động từ To Be (am/is/are)", q: "Where ______ you from?", options: {A: "is", B: "am", C: "are"}, correct: "C", explain: "Chủ ngữ 'you' -> dùng 'are'." },
    { id: "u1_g5", tag: "Động từ To Be (am/is/are)", q: "She ______ from Japan.", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "Chủ ngữ 'She' (cô ấy) -> dùng 'is'." },
    { id: "u1_g6", tag: "Cấu trúc Like + V-ing", q: "Do your friends like ______?", options: {A: "dance", B: "dancing", C: "dances"}, correct: "B", explain: "Sau 'like' là động từ thêm đuôi -ing." },
    { id: "u1_g7", tag: "Cách dùng Do/Does", q: "______ your friends like singing?", options: {A: "Do", B: "Does", C: "Are"}, correct: "A", explain: "Friends (số nhiều) -> dùng trợ động từ 'Do'." },
    { id: "u1_g8", tag: "Từ để hỏi (Wh-questions)", q: "______ is she from?", options: {A: "What", B: "Who", C: "Where"}, correct: "C", explain: "Hỏi về nơi chốn (from) -> dùng 'Where'." },
    { id: "u1_g9", tag: "Câu trả lời ngắn (Yes/No)", q: "No, they ______.", options: {A: "do", B: "don't", C: "aren't"}, correct: "B", explain: "Câu trả lời phủ định cho câu hỏi 'Do...?' là 'No, they don't'." },
    { id: "u1_g10", tag: "Mạo từ (a/an/the)", q: "I'm from ______ USA.", options: {A: "a", B: "the", C: "an"}, correct: "B", explain: "Tên nước Mỹ luôn có 'the': The USA." },
    { id: "u2_g1", tag: "Từ để hỏi (Wh-questions)", q: "______ is he? - He's my brother.", options: {A: "What", B: "Where", C: "Who"}, correct: "C", explain: "Hỏi về người -> dùng 'Who'." },
    { id: "u2_g2", tag: "Tính từ sở hữu (My/His/Her...)", q: "This is my sister. ______ name is Lucy.", options: {A: "His", B: "My", C: "Her"}, correct: "C", explain: "Sister (nữ) -> tính từ sở hữu là 'Her'." },
    { id: "u2_g3", tag: "Tính từ sở hữu (My/His/Her...)", q: "This is my father. ______ name is Sam.", options: {A: "His", B: "Her", C: "Your"}, correct: "A", explain: "Father (nam) -> tính từ sở hữu là 'His'." },
    { id: "u2_g4", tag: "Câu mệnh lệnh", q: "______ your room!", options: {A: "Cleans", B: "Clean", C: "Cleaning"}, correct: "B", explain: "Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu." },
    { id: "u2_g5", tag: "Câu mệnh lệnh", q: "______ to bed!", options: {A: "Go", B: "Goes", C: "Going"}, correct: "A", explain: "Câu mệnh lệnh: Go to bed." },
    { id: "u2_g6", tag: "Câu phủ định (Don't/Doesn't)", q: "I ______ like dogs.", options: {A: "not", B: "don't", C: "doesn't"}, correct: "B", explain: "Phủ định thì hiện tại đơn với 'I' -> dùng 'don't'." },
    { id: "u2_g7", tag: "Thì hiện tại đơn", q: "I ______ my cat.", options: {A: "like", B: "likes", C: "liking"}, correct: "A", explain: "Chủ ngữ 'I' -> động từ 'like' giữ nguyên." },
    { id: "u2_g8", tag: "Đại từ chỉ định (This/That/These/Those)", q: "Is ______ your grandmother?", options: {A: "those", B: "that", C: "these"}, correct: "B", explain: "Grandmother (số ít) -> dùng 'that' hoặc 'this'." },
    { id: "u2_g9", tag: "Động từ To Be (am/is/are)", q: "Who ______ she?", options: {A: "'s", B: "'re", C: "'m"}, correct: "A", explain: "Who's = Who is." },
    { id: "u2_g10", tag: "Tính từ sở hữu (My/His/Her...)", q: "______ name is Ben.", options: {A: "He", B: "His", C: "She"}, correct: "B", explain: "Cần tính từ sở hữu 'His' (Tên của anh ấy)." },
    { id: "u3_g1", tag: "Đại từ chỉ định (This/That/These/Those)", q: "Is ______ your eraser?", options: {A: "these", B: "this", C: "those"}, correct: "B", explain: "Eraser (số ít) -> dùng 'this'." },
    { id: "u3_g2", tag: "Đại từ chỉ định (This/That/These/Those)", q: "Are ______ your pencils?", options: {A: "this", B: "that", C: "these"}, correct: "C", explain: "Pencils (số nhiều) -> dùng 'these' hoặc 'those'." },
    { id: "u3_g3", tag: "Động từ To Be (am/is/are)", q: "______ these your notebooks?", options: {A: "Is", B: "Am", C: "Are"}, correct: "C", explain: "These (số nhiều) -> đi với 'Are'." },
    { id: "u3_g4", tag: "Câu trả lời ngắn (Yes/No)", q: "Yes, they ______.", options: {A: "is", B: "are", C: "do"}, correct: "B", explain: "Trả lời cho câu hỏi 'Are these...?': Yes, they are." },
    { id: "u3_g5", tag: "Câu trả lời ngắn (Yes/No)", q: "Do you like Art? - Yes, I ______.", options: {A: "am", B: "don't", C: "do"}, correct: "C", explain: "Trả lời câu hỏi Do you...? -> Yes, I do." },
    { id: "u3_g6", tag: "Từ để hỏi (Wh-questions)", q: "______ do you have English?", options: {A: "What", B: "When", C: "Where"}, correct: "B", explain: "Hỏi về thời gian (khi nào) -> dùng 'When'." },
    { id: "u3_g7", tag: "Giới từ (In/On/At)", q: "I have Math ______ Mondays.", options: {A: "in", B: "at", C: "on"}, correct: "C", explain: "Dùng giới từ 'on' trước các thứ trong tuần." },
    { id: "u3_g8", tag: "Động từ To Be (am/is/are)", q: "What ______ your favorite color?", options: {A: "is", B: "are", C: "do"}, correct: "A", explain: "Favorite color (số ít) -> dùng 'is'." },
    { id: "u3_g9", tag: "Động từ To Be (am/is/are)", q: "My favorite color ______ blue.", options: {A: "am", B: "is", C: "are"}, correct: "B", explain: "Chủ ngữ số ít -> dùng 'is'." },
    { id: "u3_g10", tag: "Câu trả lời ngắn (Yes/No)", q: "Is this your ruler? - No, it ______.", options: {A: "is", B: "isn't", C: "not"}, correct: "B", explain: "Câu trả lời phủ định: No, it isn't." },
    { id: "u4_g1", tag: "Động từ To Be (am/is/are)", q: "Where ______ Dad?", options: {A: "'s", B: "'re", C: "do"}, correct: "A", explain: "Dad (số ít) -> Where's (Where is)." },
    { id: "u4_g2", tag: "Giới từ (In/On/At)", q: "He's ______ the living room.", options: {A: "on", B: "in", C: "at"}, correct: "B", explain: "Trong phòng -> dùng giới từ 'in'." },
    { id: "u4_g3", tag: "Thì hiện tại tiếp diễn (V-ing)", q: "What is he ______?", options: {A: "do", B: "doing", C: "does"}, correct: "B", explain: "Hiện tại tiếp diễn: be + V-ing (doing)." },
    { id: "u4_g4", tag: "Thì hiện tại tiếp diễn (V-ing)", q: "She is ______.", options: {A: "sleeping", B: "sleeps", C: "sleep"}, correct: "A", explain: "Sau 'is' là động từ thêm -ing." },
    { id: "u4_g5", tag: "Động từ To Be (am/is/are)", q: "______ the picture in the bedroom?", options: {A: "Are", B: "Do", C: "Is"}, correct: "C", explain: "Picture (số ít) -> dùng 'Is'." },
    { id: "u4_g6", tag: "Giới từ (In/On/At)", q: "I live ______ Le Loi Street.", options: {A: "in", B: "on", C: "at"}, correct: "B", explain: "Trên đường phố -> dùng giới từ 'on'." },
    { id: "u4_g7", tag: "Giới từ (In/On/At)", q: "I live ______ Hanoi.", options: {A: "in", B: "on", C: "at"}, correct: "A", explain: "Trong thành phố -> dùng giới từ 'in'." },
    { id: "u4_g8", tag: "Thì hiện tại đơn", q: "My bedroom ______ a bed.", options: {A: "have", B: "has", C: "having"}, correct: "B", explain: "Bedroom (số ít) -> động từ 'has'." },
    { id: "u4_g9", tag: "Cấu trúc There is/There are", q: "There ______ a cat in the box.", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "A cat (số ít) -> dùng 'is'." },
    { id: "u4_g10", tag: "Thì hiện tại tiếp diễn (V-ing)", q: "What ______ she doing?", options: {A: "is", B: "are", C: "am"}, correct: "A", explain: "She (cô ấy) -> đi với 'is'." },

    // --- PHẦN 2: HỘI THOẠI (DIALOGUE) ---
    { id: "dial_1", tag: "Giao tiếp: Chào hỏi", q: "Mai: Hello, I'm Mai. - Tom: ______", options: {A: "I'm fine.", B: "Hello, I'm Tom.", C: "Goodbye."}, correct: "B", explain: "Đáp lại lời chào và giới thiệu tên." },
    { id: "dial_2", tag: "Giao tiếp: Sức khỏe", q: "Alfie: How are you? - Ben: ______", options: {A: "I'm six.", B: "I'm Ben.", C: "I'm fine, thank you."}, correct: "C", explain: "Câu hỏi sức khỏe 'How are you?' trả lời bằng 'I'm fine...'." },
    { id: "dial_3", tag: "Giao tiếp: Lớp học", q: "Teacher: Open your books, please! - Student: ______", options: {A: "Yes, Teacher.", B: "No, I'm not.", C: "I'm happy."}, correct: "A", explain: "Đáp lại mệnh lệnh của giáo viên." },
    { id: "dial_4", tag: "Giao tiếp: Xác nhận thông tin", q: "Nick: Is this your pencil? - Cody: ______", options: {A: "Yes, it is.", B: "Yes, I am.", C: "Yes, they are."}, correct: "A", explain: "Câu hỏi 'Is this...?' trả lời 'Yes, it is'." },
    { id: "dial_5", tag: "Giao tiếp: Hỏi màu sắc", q: "Tom: What color is it? - Mai: ______", options: {A: "It's a pen.", B: "It's blue.", C: "Yes, it is."}, correct: "B", explain: "Hỏi màu sắc trả lời bằng tên màu." },
    { id: "dial_6", tag: "Giao tiếp: Gia đình", q: "Mom: Clean your room, please! - Boy: ______", options: {A: "OK, Mom.", B: "Thanks, Mom.", C: "Hello, Mom."}, correct: "A", explain: "Đồng ý thực hiện yêu cầu: OK." },
    { id: "dial_7", tag: "Giao tiếp: Hỏi quê quán", q: "Dad: Where are you from? - Alfie: ______", options: {A: "I'm Alfie.", B: "I'm from Alpha.", C: "I'm seven."}, correct: "B", explain: "Câu hỏi 'from' trả lời về quê quán/nơi chốn." },
    { id: "dial_8", tag: "Giao tiếp: Hỏi người", q: "Mai: Who's he? - Lan: ______", options: {A: "He's five.", B: "He's my brother.", C: "She's my sister."}, correct: "B", explain: "Hỏi 'Who' (ai) trả lời về quan hệ/tên." },
    { id: "dial_9", tag: "Giao tiếp: Sở thích", q: "Tom: Do you like Music? - Ben: ______", options: {A: "Yes, I do.", B: "Yes, I am.", C: "Yes, it is."}, correct: "A", explain: "Câu hỏi 'Do you...?' trả lời 'Yes, I do'." },
    { id: "dial_10", tag: "Giao tiếp: Hỏi tuổi", q: "Grandma: How old are you? - Girl: ______", options: {A: "I'm fine.", B: "I'm eight.", C: "I'm happy."}, correct: "B", explain: "Hỏi tuổi 'How old' trả lời số tuổi." },
    { id: "dial_11", tag: "Giao tiếp: Chào tạm biệt", q: "Teacher: Goodbye, class. - Class: ______", options: {A: "Hello, Teacher.", B: "Goodbye, Teacher.", C: "I'm fine."}, correct: "B", explain: "Đáp lại lời chào tạm biệt." },
    { id: "dial_12", tag: "Giao tiếp: Hỏi vị trí", q: "Boy: Where's Mom? - Dad: ______", options: {A: "She's in the kitchen.", B: "He's in the kitchen.", C: "It's in the kitchen."}, correct: "A", explain: "Hỏi về Mom (mẹ) trả lời bằng 'She'." },
    { id: "dial_13", tag: "Giao tiếp: Hỏi hành động", q: "Girl: What's he doing? - Boy: ______", options: {A: "He's eating.", B: "She's eating.", C: "I'm eating."}, correct: "A", explain: "Hỏi về 'he' trả lời 'he'." },
    { id: "dial_14", tag: "Giao tiếp: Xác nhận số nhiều", q: "Tom: Are these your books? - Mai: ______", options: {A: "No, it isn't.", B: "Yes, they are.", C: "Yes, it is."}, correct: "B", explain: "Hỏi số nhiều 'these' trả lời 'they are'." },
    { id: "dial_15", tag: "Giao tiếp: Chào hỏi", q: "Alfie: Nice to meet you. - Tom: ______", options: {A: "Nice to meet you, too.", B: "I'm fine.", C: "Goodbye."}, correct: "A", explain: "Đáp lại lời chào 'Rất vui được gặp bạn'." }
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

// Lấy 20 câu ngẫu nhiên
const selectedQuestions = getRandomSubarray(fullQuizData, 20);

// TỰ ĐỘNG TẠO GIAO DIỆN
const quizForm = document.getElementById('quizForm');

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

// 🚨 BƯỚC 4: XỬ LÝ NỘP BÀI (Logic mới: Tổng hợp lỗi sai) 🚨
function submitQuiz() {
    let score = 0;
    const total = selectedQuestions.length;
    let wrongTopics = new Set(); // Dùng Set để lưu các chủ đề sai (không trùng lặp)
    
    // Khóa nút
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Đã Nộp Bài - Chúc Mừng Năm Mới! 🧧";
    submitBtn.style.backgroundColor = "#555";

    selectedQuestions.forEach(item => {
        const selectedOption = document.querySelector(`input[name="${item.id}"]:checked`);
        const qContainer = document.getElementById(item.id);
        
        let userAnswer = selectedOption ? selectedOption.value : null;
        let isCorrect = userAnswer === item.correct;

        if (isCorrect) {
            score++;
            if (selectedOption) selectedOption.parentElement.classList.add('correct-answer');
        } else {
            // Nếu sai: Tô đỏ, hiện đáp án đúng, hiện giải thích VÀ LƯU TAG VÀO LIST
            if (selectedOption) selectedOption.parentElement.classList.add('wrong-answer');
            
            // Lưu chủ đề cần cải thiện
            wrongTopics.add(item.tag);

            const correctLabel = qContainer.querySelector(`label[data-value="${item.correct}"]`);
            if (correctLabel) correctLabel.classList.add('correct-answer');
            
            const explainDiv = document.createElement('div');
            explainDiv.style.marginTop = '10px';
            explainDiv.style.color = '#d32f2f';
            explainDiv.style.fontStyle = 'italic';
            explainDiv.style.padding = '8px';
            explainDiv.style.backgroundColor = '#ffcdd2';
            explainDiv.style.borderRadius = '5px';
            explainDiv.innerHTML = `💡 <strong>Giải thích:</strong> ${item.explain}`;
            qContainer.appendChild(explainDiv);
        }
        
        const radios = qContainer.querySelectorAll('input[type="radio"]');
        radios.forEach(r => r.disabled = true);
    });

    // HIỂN THỊ KẾT QUẢ VÀ LỜI KHUYÊN
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    let message = "";
    if (score === total) message = "Đỉnh của chóp! Không sai câu nào! 🧧🧧🧧";
    else if (score >= total * 0.8) message = "Tuyệt vời! Kiến thức rất vững! 🌸";
    else if (score >= total * 0.5) message = "Khá lắm! Cố gắng khắc phục các lỗi bên dưới nhé! 🎋";
    else message = "Cần luyện tập thêm nhiều nha! Xem kỹ phần gợi ý bên dưới! 💪";

    // Tạo HTML cho phần danh sách cải thiện
    let improvementHtml = '';
    if (wrongTopics.size > 0) {
        improvementHtml = `
            <div style="margin-top: 15px; text-align: left; background: #fff; padding: 10px; border-radius: 8px; border: 1px dashed #d32f2f;">
                <h4 style="margin-top: 0; color: #c62828;">📝 Các phần cần ôn tập lại:</h4>
                <ul style="color: #333;">
                    ${Array.from(wrongTopics).map(topic => `<li>${topic}</li>`).join('')}
                </ul>
                <p style="font-size: 0.9em; font-style: italic; color: #666;">(Hãy mở sách xem lại các mục ngữ pháp này nhé!)</p>
            </div>
        `;
    }

    resultDiv.style.backgroundColor = score >= total * 0.5 ? '#c8e6c9' : '#ffcdd2';
    resultDiv.style.border = score >= total * 0.5 ? '2px solid #2e7d32' : '2px solid #c62828';
    resultDiv.style.color = score >= total * 0.5 ? '#1b5e20' : '#b71c1c';
    
    resultDiv.innerHTML = `
        <h3 style="margin:0">Kết quả: ${score}/${total} câu đúng</h3>
        <p>${message}</p>
        ${improvementHtml}
    `;

    saveToFirebase(score, total);
}

function saveToFirebase(score, total) {
    if (typeof db !== 'undefined') {
        db.collection("exam_history").add({
            score: score,
            total: total,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            topic: "Tet_Grade3_Detailed_Review"
        })
        .then(() => {
            console.log("Lưu kết quả thành công!");
            loadHistory();
        })
        .catch((error) => {
            console.error("Lỗi lưu kết quả: ", error);
        });
    }
}

function loadHistory() {
    if (typeof db !== 'undefined') {
        const historyList = document.getElementById('history-list');
        
        db.collection("exam_history")
            .where("topic", "==", "Tet_Grade3_Detailed_Review")
            .orderBy("timestamp", "desc")
            .limit(5)
            .get()
            .then((querySnapshot) => {
                let html = '<ul style="list-style: none; padding: 0;">';
                if (querySnapshot.empty) {
                    html += '<li>Chưa có lịch sử làm bài.</li>';
                } else {
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const date = data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : "Vừa xong";
                        html += `<li style="border-bottom: 1px dashed #ef9a9a; padding: 8px 0;">
                            🕒 ${date}: <strong>${data.score}/${data.total}</strong>
                        </li>`;
                    });
                }
                html += '</ul>';
                historyList.innerHTML = html;
            })
            .catch((error) => {
                console.log(error);
                historyList.innerHTML = "Vui lòng đăng nhập để xem lịch sử.";
            });
    }
}

loadHistory();
// ... (Giữ nguyên toàn bộ code cũ ở trên) ...
