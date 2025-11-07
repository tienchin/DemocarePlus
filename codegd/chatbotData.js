const chatbotKnowledgeBase = {
    // --- CÁC CHUYÊN KHOA CHÍNH (ĐỂ LỰA CHỌN) ---
    "general": {
        // Đây là các option chung khi bot không hiểu
        options: { "ho-hap": "Hô hấp", "tim-mach": "Tim mạch", "tieu-hoa": "Tiêu hóa", "co-xuong-khop": "Cơ xương khớp" }
    },
    "ho-hap": {
        keywords: ["hô hấp", "phổi", "thở", "ho", "sổ mũi", "viêm họng"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Hô hấp?",
        options: { "viem-phe-quan": "Viêm phế quản", "viem-phoi": "Viêm phổi", "hen-suyen": "Hen suyễn" }
    },
    "tim-mach": {
        keywords: ["tim mạch", "tim", "huyết áp", "đau ngực", "chóng mặt"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Tim mạch?",
        options: { "tang-huyet-ap": "Tăng huyết áp", "nhoi-mau-co-tim": "Nhồi máu cơ tim", "dot-quy": "Đột quỵ" }
    },
    "tieu-hoa": {
        keywords: ["tiêu hóa", "dạ dày", "đau bụng", "tiêu chảy", "táo bón", "ợ chua"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Tiêu hóa?",
        options: { "trao-nguoc-da-day": "Trào ngược dạ dày (GERD)", "viem-loet-da-day": "Viêm loét dạ dày", "viem-ruot-thua": "Viêm ruột thừa" }
    },
    "co-xuong-khop": {
        keywords: ["xương", "khớp", "đau lưng", "mỏi gối", "bong gân"],
        question: "Bạn đang gặp vấn đề cụ thể nào về Cơ xương khớp?",
        options: { "thoai-hoa-khop": "Thoái hóa khớp", "thoat-vi-dia-dem": "Thoát vị đĩa đệm", "bong-gan": "Bong gân" }
    },
    // ... (Thêm các chuyên khoa khác)

    // --- DỮ LIỆU CHI TIẾT BỆNH (ĐỂ TRẢ LỜI) ---
    diseases: {
        // Hô hấp
        "viem-phe-quan": {
            nhanBiet: "Ho liên tục (khan hoặc có đờm), tức ngực, mệt mỏi, sốt nhẹ.",
            thongTin: "Là tình trạng viêm niêm mạc ống phế quản, thường do virus sau một đợt cảm lạnh.",
            soCuu: "Uống nhiều nước ấm, nghỉ ngơi, xông hơi. Nếu ho kéo dài trên 3 tuần, sốt cao, hoặc khó thở, **đến cơ sở y tế gần nhất.**"
        },
        "viem-phoi": {
            nhanBiet: "Sốt cao, ho có đờm xanh/vàng, khó thở, đau ngực khi hít sâu.",
            thongTin: "Là nhiễm trùng ở phổi gây viêm các túi khí. Nguy hiểm cho trẻ nhỏ và người lớn tuổi.",
            soCuu: "Nghỉ ngơi, hạ sốt. Nếu khó thở, môi tím tái, **đưa đến bệnh viện ngay lập tức.**"
        },
        "hen-suyen": {
            nhanBiet: "Khó thở thành cơn, thở khò khè, ho nhiều về đêm, tức ngực.",
            thongTin: "Là bệnh viêm mạn tính đường thở, khiến đường thở co thắt khi gặp yếu tố kích thích.",
            soCuu: "Giữ bình tĩnh, ngồi thẳng, dùng thuốc xịt cắt cơn. Nếu không đỡ, **gọi cấp cứu 115.**"
        },
        // Tim mạch
        "tang-huyet-ap": {
            nhanBiet: "Thường không có triệu chứng rõ rệt. Có thể gây đau đầu, chóng mặt, mờ mắt.",
            thongTin: "Là tình trạng áp lực máu lên thành động mạch tăng cao. Cần theo dõi và điều trị lâu dài.",
            soCuu: "Nghỉ ngơi, thư giãn. Đo huyết áp. Nếu huyết áp quá cao (ví dụ: > 180/120) kèm đau đầu dữ dội, **đến cơ sở y tế ngay.**"
        },
        "nhoi-mau-co-tim": {
            nhanBiet: "Đau thắt ngực dữ dội, cảm giác bị đè nặng, lan lên vai trái, cánh tay. Kèm vã mồ hôi, khó thở.",
            thongTin: "Xảy ra khi động mạch vành bị tắc nghẽn, làm một phần cơ tim chết đi.",
            soCuu: "TÌNH HUỐNG CẤP CỨU! **Gọi ngay 115**. Để bệnh nhân ngồi hoặc nửa nằm nửa ngồi. Nới lỏng quần áo."
        },
        "dot-quy": {
            nhanBiet: "Quy tắc F.A.S.T: **F**ace (Méo mặt), **A**rm (Yếu liệt một bên tay), **S**peech (Nói khó), **T**ime (Thời gian là vàng).",
            thongTin: "Xảy ra khi mạch máu não bị tắc hoặc vỡ. Cần can thiệp y tế càng sớm càng tốt.",
            soCuu: "TÌNH HUỐNG CẤP CỨU! **Gọi ngay 115**. Ghi nhớ thời điểm bắt đầu triệu chứng. Đặt bệnh nhân nằm nghiêng. Không cho ăn uống."
        },
        // Tiêu hóa
        "trao-nguoc-da-day": {
            nhanBiet: "Ợ nóng, ợ chua, nóng rát cổ họng, khó nuốt, ho mạn tính.",
            thongTin: "Là tình trạng axit dạ dày trào ngược lên thực quản.",
            soCuu: "Tránh ăn no, không nằm ngay sau khi ăn, kê cao gối khi ngủ. Hạn chế đồ cay nóng, cafe. Nếu triệu chứng nặng, cần đi khám."
        },
        "viem-loet-da-day": {
            nhanBiet: "Đau vùng thượng vị (trên rốn), đau khi đói hoặc sau khi ăn. Ợ hơi, buồn nôn.",
            thongTin: "Là vết loét trên niêm mạc dạ dày hoặc tá tràng, thường do vi khuẩn H.Pylori hoặc dùng thuốc kháng viêm.",
            soCuu: "Ăn uống đúng giờ, chia nhỏ bữa ăn. Tránh căng thẳng. **Cần đi khám** để nội soi và xét nghiệm H.Pylori."
        },
        "viem-ruot-thua": {
            nhanBiet: "Đau bụng ban đầu quanh rốn, sau đó chuyển xuống hố chậu phải. Đau tăng dần, kèm sốt nhẹ, buồn nôn.",
            thongTin: "Là tình trạng viêm và nhiễm trùng ruột thừa. Nếu không phẫu thuật kịp thời có thể vỡ và gây viêm phúc mạc.",
            soCuu: "Đây là cấp cứu ngoại khoa. **Cần đến bệnh viện gần nhất ngay lập tức**. Không ăn uống, không dùng thuốc giảm đau."
        },
        // Cơ xương khớp
        "bong-gan": {
            nhanBiet: "Đau, sưng, bầm tím quanh khớp (thường là cổ chân), khó cử động sau khi bị chấn thương (trẹo chân).",
            thongTin: "Là tình trạng dây chằng quanh khớp bị giãn hoặc rách. Cần phân biệt với gãy xương.",
            soCuu: "Áp dụng quy tắc R.I.C.E: **R**est (Nghỉ ngơi), **I**ce (Chườm lạnh 20 phút), **C**ompression (Băng ép nhẹ), **E**levation (Kê cao chi)."
        },
         "thoai-hoa-khop": {
            nhanBiet: "Đau khớp khi vận động, cứng khớp buổi sáng. Thường ở gối, háng, cột sống.",
            thongTin: "Là tình trạng sụn khớp bị mòn theo thời gian.",
            soCuu: "Giảm cân (nếu thừa cân), tập thể dục nhẹ nhàng (bơi, đạp xe). Dùng thuốc theo chỉ định của bác sĩ chuyên khoa Cơ Xương Khớp."
        }
    }
};
module.exports = chatbotKnowledgeBase;