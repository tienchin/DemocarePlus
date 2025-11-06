// codegd/chatbotData.js
const chatbotKnowledgeBase = {
    // CHUYÊN KHOA
    "ho-hap": {
        keywords: ["hô hấp", "phổi", "thở", "ho", "sổ mũi", "viêm họng"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Hô hấp?",
        options: { "viem-phe-quan": "Viêm phế quản", "viem-phoi": "Viêm phổi", "hen-suyen": "Hen suyễn", "copd": "Bệnh phổi tắc nghẽn mạn tính (COPD)", "viem-hong-hat": "Viêm họng hạt", "viem-amidan": "Viêm amidan", "viem-xoang-man": "Viêm xoang mãn", "cam-lanh": "Cảm lạnh", "cum-mua": "Cúm mùa", "tran-dich-mang-phoi": "Tràn dịch màng phổi", "ho-ra-mau": "Ho ra máu", "viem-thanh-quan": "Viêm thanh quản", "di-ung-ho-hap": "Dị ứng hô hấp", "kho-tho-cap": "Khó thở cấp", "viem-mui-di-ung": "Viêm mũi dị ứng" }
    },
    "tim-mach": {
        keywords: ["tim mạch", "tim", "huyết áp", "đau ngực", "chóng mặt"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Tim mạch?",
        options: { "tang-huyet-ap": "Tăng huyết áp", "ha-huyet-ap": "Hạ huyết áp", "dau-that-nguc": "Đau thắt ngực", "nhoi-mau-co-tim": "Nhồi máu cơ tim", "roi-loan-nhip-tim": "Rối loạn nhịp tim", "suy-tim": "Suy tim", "ho-van-tim": "Hở van tim", "viem-mang-ngoai-tim": "Viêm màng ngoài tim", "dot-quy": "Đột quỵ", "huyet-khoi-tinh-mach-sau": "Huyết khối tĩnh mạch sâu", "xo-vua-dong-mach": "Xơ vữa động mạch" }
    },
    // ... (Thêm các chuyên khoa khác: "than-kinh", "tieu-hoa", "da-lieu", "co-xuong-khop")

    // DỮ LIỆU CHI TIẾT BỆNH
    diseases: {
        "viem-phe-quan": {
            nhanBiet: "Ho liên tục (khan hoặc có đờm), tức ngực, mệt mỏi, sốt nhẹ.",
            thongTin: "Là tình trạng viêm niêm mạc ống phế quản, thường do virus sau một đợt cảm lạnh.",
            soCuu: "Uống nhiều nước ấm, nghỉ ngơi, xông hơi. Nếu ho kéo dài trên 3 tuần, sốt cao, hoặc khó thở, **đến cơ sở y tế gần nhất.**"
        },
        "viem-phoi": {
            nhanBiet: "Sốt cao, ho có đờm xanh/vàng, khó thở, đau ngực khi hít sâu.",
            thongTin: "Là nhiễm trùng ở phổi gây viêm các túi khí. Nguy hiểm cho trẻ nhỏ và người lớn tuổi.",
            soCuu: "Nghỉ ngơi, hạ sốt bằng paracetamol. Nếu khó thở, môi tím tái, **đưa đến bệnh viện ngay lập tức.**"
        },
        "hen-suyen": {
            nhanBiet: "Khó thở thành cơn, thở khò khè, ho nhiều về đêm, tức ngực.",
            thongTin: "Là bệnh viêm mạn tính đường thở, khiến đường thở co thắt khi gặp yếu tố kích thích.",
            soCuu: "Giữ bình tĩnh, ngồi thẳng, dùng thuốc xịt cắt cơn (ống hít màu xanh) theo chỉ định. Nếu không đỡ, **gọi cấp cứu 115.**"
        },
        "nhoi-mau-co-tim": {
            nhanBiet: "Đau thắt ngực dữ dội, cảm giác bị đè nặng, lan lên vai trái, cánh tay. Kèm vã mồ hôi, khó thở.",
            thongTin: "Xảy ra khi động mạch vành bị tắc nghẽn, làm một phần cơ tim chết đi. Cần cấp cứu trong 'giờ vàng'.",
            soCuu: "TÌNH HUỐNG CẤP CỨU! **Gọi ngay 115**. Để bệnh nhân ngồi hoặc nửa nằm nửa ngồi. Nới lỏng quần áo. Nếu có, cho nhai 1 viên Aspirin. Nếu bệnh nhân bất tỉnh, thực hiện CPR."
        },
        "dot-quy": {
            nhanBiet: "Quy tắc F.A.S.T: **F**ace (Méo mặt), **A**rm (Yếu liệt một bên tay), **S**peech (Nói khó), **T**ime (Thời gian là vàng).",
            thongTin: "Xảy ra khi mạch máu não bị tắc hoặc vỡ, làm não bị tổn thương. Cần can thiệp y tế càng sớm càng tốt.",
            soCuu: "TÌNH HUỐNG CẤP CỨU! **Gọi ngay 115**. Ghi nhớ thời điểm bắt đầu triệu chứng. Đặt bệnh nhân nằm nghiêng. Không cho ăn uống, không tự ý cho dùng thuốc."
        },
        "viem-ruot-thua": {
            nhanBiet: "Đau bụng ban đầu quanh rốn, sau đó chuyển xuống hố chậu phải. Đau tăng dần, kèm sốt nhẹ, buồn nôn.",
            thongTin: "Là tình trạng viêm và nhiễm trùng ruột thừa. Nếu không phẫu thuật kịp thời có thể vỡ và gây viêm phúc mạc.",
            soCuu: "Đây là cấp cứu ngoại khoa. **Cần đến bệnh viện gần nhất ngay lập tức**. Không ăn uống, không dùng thuốc giảm đau."
        },
        "bong-gan": {
            nhanBiet: "Đau, sưng, bầm tím quanh khớp (thường là cổ chân), khó cử động.",
            thongTin: "Là tình trạng dây chằng quanh khớp bị giãn hoặc rách do chấn thương. Cần phân biệt với gãy xương.",
            soCuu: "Áp dụng quy tắc R.I.C.E: **R**est (Nghỉ ngơi), **I**ce (Chườm lạnh 20 phút), **C**ompression (Băng ép nhẹ), **E**levation (Kê cao chi). Nếu khớp biến dạng hoặc không thể đứng vững, **đến cơ sở y tế để chụp X-quang.**"
        },
        // ... (Và toàn bộ các bệnh khác bạn đã liệt kê, với nội dung chi tiết tương tự) ...
    }
};
module.exports = chatbotKnowledgeBase;