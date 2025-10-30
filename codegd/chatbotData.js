// codegd/chatbotData.js
const chatbotKnowledgeBase = {
    // --- CHỦ ĐỀ ĐẶC BIỆT: SÀNG LỌC TÌNH HUỐNG CẤP CỨU (LUÔN ĐẶT LÊN ĐẦU) ---
    "cap-cuu": {
        keywords: [
            "tai nạn", "giao thông", "rớt lìa", "đứt lìa", "chảy máu không ngừng", "khó thở dữ dội", 
            "đau ngực", "nhói tim", "đột quỵ", "bất tỉnh", "co giật", "gãy xương", "bỏng nặng"
        ],
        // Không có câu hỏi, chỉ có câu trả lời duy nhất và trực tiếp
        answer: "TÌNH HUỐNG CẤP CỨU! Hãy gọi ngay cho cấp cứu hoặc đưa người bệnh đến cơ sở y tế gần nhất.\n\nSỐ ĐIỆN THOẠI CẤP CỨU: 115\n\nĐây là tình huống nguy hiểm, không được tự xử lý tại nhà. Hãy giữ bình tĩnh và tìm kiếm sự giúp đỡ y tế chuyên nghiệp ngay lập tức!"
    },

    // --- CÁC CHỦ ĐỀ THÔNG THƯỜNG ---
    "thay-doi-thoi-tiet": {
        keywords: ["thời tiết", "giao mùa", "nắng mưa", "thất thường", "trái gió trở trời"],
        question: "Thời tiết thay đổi gần đây có khiến bạn gặp vấn đề sức khỏe nào không?",
        options: { 
            "cam-cum": "Cảm cúm, sổ mũi", "ho": "Ho (khan, có đờm)", "viem-hong": "Đau rát họng", 
            "viem-xoang": "Nghẹt mũi, đau vùng mặt", "da": "Vấn đề về da", "dau-xuong-khop": "Đau nhức xương khớp", "met-moi": "Mệt mỏi, uể oải"
        },
        answers: {
            "cam-cum": { answer: "Cảm cúm do thay đổi thời tiết thường do virus gây ra. Hãy nghỉ ngơi, uống nhiều nước ấm, bổ sung vitamin C và giữ ấm cơ thể. Nếu sốt cao trên 38.5°C hoặc các triệu chứng không giảm sau 3-5 ngày, bạn nên đi khám bác sĩ." },
            "ho": { answer: "Ho do thời tiết có thể do không khí khô hoặc nhiễm lạnh. Hãy uống nước ấm pha mật ong, giữ ấm cổ và tránh đồ lạnh. Nếu ho kéo dài trên 2 tuần, ho ra máu hoặc kèm khó thở, bạn cần đi khám ngay." },
            "viem-hong": { answer: "Thời tiết thay đổi đột ngột dễ gây viêm họng cấp. Uống nước ấm, súc miệng nước muối loãng thường xuyên. Nếu sốt cao, đau họng dữ dội hoặc có đốm trắng ở amidan, đó có thể là dấu hiệu viêm amidan mủ, cần đi khám." },
            "viem-xoang": { answer: "Viêm xoang dễ tái phát khi trời lạnh và ẩm. Bạn nên xông hơi mũi bằng nước ấm, rửa mũi bằng nước muối sinh lý và giữ ấm vùng đầu, mặt. Nếu đau nhức dữ dội, chảy dịch mũi có màu vàng xanh và có mùi, hãy đi khám chuyên khoa tai mũi họng." },
            "da": { answer: "Da rất nhạy cảm với sự thay đổi độ ẩm và nhiệt độ. Để tôi có thể tư vấn kỹ hơn, chúng ta hãy đi sâu vào vấn đề da liễu nhé.", nextTopic: "da-lieu-mo-rong" },
            "dau-xuong-khop": { answer: "Thời tiết lạnh ẩm có thể làm các cơn đau khớp trở nên tồi tệ hơn, đặc biệt ở người có bệnh viêm khớp hoặc thoái hóa. Hãy luôn giữ ấm cơ thể, đặc biệt là các khớp. Vận động nhẹ nhàng và thực hiện các bài tập kéo giãn có thể giúp ích. Nếu khớp bị sưng, nóng, đỏ và đau dữ dội, bạn cần đi khám bác sĩ Cơ-Xương-Khớp." },
            "met-moi": { answer: "Mệt mỏi, uể oải khi giao mùa là khá phổ biến. Hãy đảm bảo bạn ngủ đủ giấc, ăn uống đủ chất và uống đủ nước. Tập thể dục nhẹ nhàng cũng giúp tăng cường năng lượng. Nếu tình trạng mệt mỏi kéo dài và ảnh hưởng đến cuộc sống hàng ngày, bạn nên đi khám để kiểm tra các nguyên nhân tiềm ẩn như thiếu máu hoặc thiếu vitamin." }
        }
    },
    "dau-dau": {
        keywords: ["đau đầu", "nhức đầu", "đau thái dương", "đau nửa đầu"],
        question: "Bạn đang gặp phải kiểu đau đầu nào?",
        options: { "cang-thang": "Đau âm ỉ, như bị siết quanh đầu", "migraine": "Đau nhói một bên, kèm buồn nôn", "viem-xoang": "Đau ở mặt, trán, nặng hơn khi cúi" },
        answers: {
            "cang-thang": { answer: "Đau đầu do căng thẳng là loại phổ biến nhất, thường có cảm giác như một dải băng siết chặt quanh đầu. Nguyên nhân thường do stress, thiếu ngủ, hoặc tư thế làm việc sai. Để giảm bớt, bạn hãy thử nghỉ ngơi trong một phòng tối yên tĩnh, chườm ấm hoặc lạnh lên vùng cổ và trán. Các kỹ thuật thư giãn như thiền, yoga, hoặc hít thở sâu cũng rất hiệu quả. Nếu cơn đau kéo dài hoặc thường xuyên, bạn nên xem xét lại lối sống, đảm bảo ngủ đủ giấc và tìm cách quản lý căng thẳng tốt hơn. Uống đủ nước và tránh bỏ bữa cũng giúp ngăn ngừa loại đau đầu này." },
            "migraine": { answer: "Đau nửa đầu Migraine là một tình trạng thần kinh phức tạp, gây ra cơn đau nhói dữ dội thường ở một bên đầu, kèm theo buồn nôn, nôn, và nhạy cảm với ánh sáng, âm thanh. Khi có dấu hiệu, hãy lập tức tìm một nơi yên tĩnh, tối và nghỉ ngơi. Uống thuốc giảm đau không kê đơn có thể hữu ích lúc đầu. Tuy nhiên, nếu bạn bị Migraine thường xuyên, việc đi khám bác sĩ là rất quan trọng để được chẩn đoán chính xác và kê đơn thuốc đặc trị, cũng như tìm ra các yếu tố khởi phát (trigger) như thực phẩm, stress để phòng tránh hiệu quả hơn." },
            "viem-xoang": { answer: "Đau đầu do viêm xoang gây ra cảm giác đau tức, áp lực ở vùng trán, má, và quanh mắt, thường nặng hơn khi bạn cúi xuống. Nó xảy ra khi các hốc xoang bị viêm và tắc nghẽn, thường đi kèm với nghẹt mũi. Để giảm triệu chứng, bạn có thể xông hơi bằng nước ấm, sử dụng thuốc xịt mũi nước muối sinh lý để làm sạch đường thở. Chườm ấm lên mặt cũng giúp giảm áp lực. Uống nhiều nước để làm loãng dịch nhầy. Nếu các triệu chứng không cải thiện sau một tuần hoặc có sốt cao, bạn nên đi khám bác sĩ vì có thể cần dùng kháng sinh để điều trị nhiễm trùng." }
        }
    },
    "mat-ngu": {
        keywords: ["mất ngủ", "khó ngủ", "trằn trọc", "thức giấc"],
        question: "Vấn đề về giấc ngủ của bạn là gì?",
        options: { "kho-vao-giac": "Khó đi vào giấc ngủ", "thuc-giac": "Thức giấc nhiều lần giữa đêm", "day-som": "Dậy quá sớm" },
        answers: {
            "kho-vao-giac": { answer: "Khó đi vào giấc ngủ thường liên quan đến lo lắng hoặc thói quen sinh hoạt không tốt. Hãy tạo một 'nghi thức' thư giãn 30-60 phút trước khi ngủ: đọc sách (tránh màn hình điện tử), tắm nước ấm, nghe nhạc không lời. Đảm bảo phòng ngủ của bạn hoàn toàn tối, yên tĩnh và mát mẻ. Tránh xa caffeine sau 2 giờ chiều và không ăn quá no gần giờ ngủ. Nếu bạn nằm trên giường quá 20 phút mà không ngủ được, hãy đứng dậy và làm một việc gì đó nhẹ nhàng cho đến khi cảm thấy buồn ngủ trở lại, thay vì trằn trọc lo lắng." },
            "thuc-giac": { answer: "Thức giấc nhiều lần trong đêm có thể do nhiều nguyên nhân. Hãy kiểm tra lại môi trường ngủ: có tiếng ồn hay ánh sáng làm phiền không? Hạn chế uống nước 2 giờ trước khi ngủ để giảm việc phải đi vệ sinh. Stress cũng là một nguyên nhân chính; hãy thử các kỹ thuật thư giãn hoặc viết nhật ký để giải tỏa lo âu trước khi ngủ. Nếu bạn ngáy to và cảm thấy cực kỳ mệt mỏi vào ban ngày dù đã ngủ đủ giờ, bạn nên đi khám để loại trừ hội chứng ngưng thở khi ngủ, một tình trạng y tế cần được điều trị nghiêm túc." },
            "day-som": { answer: "Thức dậy quá sớm và không thể ngủ lại được có thể là dấu hiệu của rối loạn nhịp sinh học hoặc các vấn đề tâm lý như trầm cảm. Hãy cố gắng duy trì một lịch trình ngủ-thức cực kỳ đều đặn, kể cả vào cuối tuần. Tiếp xúc với ánh sáng mặt trời tự nhiên vào buổi sáng ngay sau khi thức dậy sẽ giúp 'cài đặt' lại đồng hồ sinh học của cơ thể. Tránh các giấc ngủ trưa kéo dài. Nếu tình trạng này đi kèm với cảm giác buồn bã, mất hứng thú kéo dài, việc tìm đến chuyên gia sức khỏe tâm thần để được tư vấn là một lựa chọn quan trọng và cần thiết." }
        }
    },
    "dau-da-day": {
        keywords: ["đau dạ dày", "đau bụng", "ợ nóng", "khó tiêu"],
        question: "Cơn đau dạ dày của bạn có đặc điểm gì?",
        options: { "o-nong": "Đau rát, ợ nóng sau khi ăn", "dau-am-i": "Đau âm ỉ khi đói", "day-hoi": "Đầy hơi, khó tiêu" },
        answers: {
            "o-nong": { answer: "Cảm giác nóng rát ở ngực (ợ nóng) thường là dấu hiệu của bệnh trào ngược dạ dày thực quản (GERD). Axit từ dạ dày trào ngược lên thực quản gây ra cảm giác khó chịu này. Để hạn chế, bạn nên tránh ăn các thực phẩm cay nóng, nhiều dầu mỡ, cà chua, sô cô la và caffeine. Hãy chia nhỏ các bữa ăn trong ngày, không ăn quá no và tránh nằm ngay sau khi ăn ít nhất 2-3 giờ. Kê cao đầu giường khi ngủ cũng có thể giúp ích. Nếu triệu chứng xảy ra hơn hai lần một tuần, bạn nên đi khám bác sĩ để được tư vấn và điều trị phù hợp." },
            "dau-am-i": { answer: "Đau âm ỉ khi đói hoặc sau khi ăn có thể là dấu hiệu của viêm loét dạ dày. Cơn đau thường xuất hiện ở vùng bụng trên. Bạn nên tránh các thực phẩm gây kích ứng như đồ ăn chua, cay, rượu bia và thuốc lá. Ăn các bữa ăn nhỏ, đúng giờ và không để bụng quá đói. Các thực phẩm mềm, dễ tiêu như cháo, súp có thể giúp làm dịu niêmạc dạ dày. Stress cũng là một yếu tố làm tình trạng nặng hơn, vì vậy hãy tìm cách thư giãn. Việc đi khám để nội soi và xét nghiệm vi khuẩn H.pylori là rất cần thiết để có chẩn đoán chính xác." },
            "day-hoi": { answer: "Cảm giác đầy hơi, khó tiêu sau khi ăn cho thấy hệ tiêu hóa của bạn đang hoạt động không tốt. Hãy thử ăn chậm, nhai kỹ để giảm gánh nặng cho dạ dày. Tránh các loại thực phẩm sinh hơi như đậu, bắp cải, đồ uống có ga. Probiotics có trong sữa chua có thể giúp cải thiện hệ vi sinh vật đường ruột. Đi bộ nhẹ nhàng sau bữa ăn khoảng 15-20 phút cũng kích thích tiêu hóa. Nếu tình trạng đầy hơi kéo dài kèm theo đau bụng hoặc thay đổi thói quen đi tiêu, bạn nên tham khảo ý kiến bác sĩ để loại trừ các vấn đề nghiêm trọng hơn như hội chứng ruột kích thích (IBS)." }
        }
    },
    "ho-keo-dai": {
        keywords: ["ho", "ho khan", "ho có đờm"],
        question: "Cơn ho của bạn thuộc loại nào?",
        options: { "ho-khan": "Ho khan, ngứa cổ", "ho-co-dom": "Ho có đờm", "ho-ve-dem": "Ho nhiều về đêm" },
        answers: {
            "ho-khan": { answer: "Ho khan, ngứa cổ kéo dài có thể do dị ứng, hen suyễn, trào ngược dạ dày hoặc tác dụng phụ của một số loại thuốc. Hãy thử uống nhiều nước ấm, trà gừng mật ong để làm dịu cổ họng. Sử dụng máy tạo độ ẩm trong phòng ngủ cũng có thể giúp ích. Tránh xa các yếu tố gây kích ứng như khói thuốc, bụi bẩn, lông động vật. Nếu bạn nghi ngờ do trào ngược dạ dày, hãy thử kê cao đầu khi ngủ và tránh ăn no trước khi đi ngủ. Nếu ho không dứt sau 2 tuần, bạn cần đi khám để tìm ra nguyên nhân chính xác và có hướng điều trị phù hợp." },
            "ho-co-dom": { answer: "Ho có đờm là phản xạ của cơ thể để tống các chất nhầy ra khỏi đường hô hấp. Màu sắc của đờm có thể gợi ý nguyên nhân: đờm trong hoặc trắng thường do cảm lạnh virus, đờm vàng hoặc xanh có thể là dấu hiệu nhiễm khuẩn. Hãy uống thật nhiều nước ấm để làm loãng đờm và dễ tống ra ngoài hơn. Bạn có thể sử dụng các loại thuốc long đờm không kê đơn. Xông hơi cũng là một biện pháp hiệu quả. Nếu ho có đờm kéo dài trên 3 tuần, kèm theo sốt, khó thở hoặc đau ngực, bạn phải đi khám bác sĩ ngay lập tức." },
            "ho-ve-dem": { answer: "Ho nhiều về đêm gây ảnh hưởng lớn đến giấc ngủ và chất lượng cuộc sống. Nguyên nhân thường gặp là hen suyễn, chảy dịch mũi sau (post-nasal drip) do viêm mũi dị ứng hoặc viêm xoang, và trào ngược dạ dày. Hãy thử kê cao gối khi ngủ. Giữ phòng ngủ sạch sẽ, thoáng mát và không có các tác nhân gây dị ứng. Nếu bạn có triệu chứng của trào ngược (ợ nóng), hãy tránh ăn gần giờ đi ngủ. Nếu cơn ho ban đêm kèm theo tiếng khò khè hoặc khó thở, bạn cần đi khám để kiểm tra chức năng hô hấp và loại trừ bệnh hen suyễn." }
        }
    },
    "van-de-da": {
        keywords: ["da", "mụn", "ngứa", "phát ban"],
        question: "Bạn gặp vấn đề da nào nhiều nhất gần đây?",
        nextTopic: "da-lieu-mo-rong"
    },
    "dau-lung": {
        keywords: ["đau lưng", "mỏi lưng"],
        question: "Cơn đau lưng của bạn như thế nào?",
        options: { "dau-co-hoc": "Đau khi vận động, cúi, nâng vật nặng", "dau-viem": "Đau và cứng khớp vào buổi sáng", "dau-lan-xuong-chan": "Đau lan xuống mông và chân" },
        answers: {
            "dau-co-hoc": { answer: "Đau lưng cơ học là loại phổ biến nhất, thường do căng cơ, bong gân hoặc thoái hóa cột sống. Cơn đau thường tăng lên khi vận động và giảm khi nghỉ ngơi. Để giảm đau, bạn nên nghỉ ngơi trong 1-2 ngày, tránh các hoạt động gây đau. Chườm lạnh trong 48 giờ đầu, sau đó chuyển sang chườm ấm có thể giúp giảm viêm và thư giãn cơ. Các bài tập kéo giãn nhẹ nhàng cho lưng dưới cũng rất hữu ích. Duy trì tư thế đúng khi ngồi và nâng vật nặng đúng cách là chìa khóa để phòng ngừa tái phát." },
            "dau-viem": { answer: "Đau lưng và cứng khớp vào buổi sáng, cải thiện sau khi vận động, có thể là dấu hiệu của bệnh viêm cột sống dính khớp hoặc các bệnh viêm khớp khác. Đây là một tình trạng viêm hệ thống. Bạn nên đi khám bác sĩ chuyên khoa Cơ-Xương-Khớp để được chẩn đoán chính xác. Việc điều trị thường bao gồm các loại thuốc kháng viêm và các bài tập vật lý trị liệu đặc hiệu để duy trì sự linh hoạt của cột sống và giảm đau. Việc chẩn đoán và điều trị sớm là rất quan trọng để ngăn ngừa biến dạng cột sống lâu dài." },
            "dau-lan-xuong-chan": { answer: "Đau lưng lan xuống mông và mặt sau của chân, thường chỉ ở một bên, là triệu chứng điển hình của đau thần kinh tọa. Nguyên nhân thường do thoát vị đĩa đệm chèn ép vào rễ dây thần kinh tọa. Cơn đau có thể từ âm ỉ đến dữ dội, kèm theo tê bì hoặc yếu chân. Bạn nên hạn chế ngồi lâu, tránh nâng vật nặng. Các bài tập kéo giãn thần kinh tọa có thể giúp giảm chèn ép. Tuy nhiên, bạn cần đi khám bác sĩ để xác định mức độ thoát vị và có phương pháp điều trị phù hợp, có thể bao gồm thuốc, vật lý trị liệu hoặc can thiệp phẫu thuật." }
        }
    },
    "tieu-hoa": {
        keywords: ["tiêu hóa", "tiêu chảy", "táo bón"],
        question: "Bạn gặp vấn đề tiêu hóa nào?",
        options: { "tieu-chay": "Tiêu chảy", "tao-bon": "Táo bón", "dau-bung": "Đau bụng" },
        answers: {
            "tieu-chay": { answer: "Tiêu chảy cấp thường do nhiễm virus hoặc vi khuẩn từ thực phẩm. Điều quan trọng nhất là bù nước và điện giải bằng cách uống dung dịch oresol, nước lọc hoặc nước trái cây pha loãng. Hãy ăn các thực phẩm dễ tiêu như cháo trắng, chuối, bánh mì nướng. Tránh sữa, đồ béo và thực phẩm nhiều chất xơ cho đến khi triệu chứng thuyên giảm. Hầu hết các trường hợp sẽ tự khỏi sau vài ngày. Nếu tiêu chảy kéo dài hơn 3 ngày, có sốt cao, đau bụng dữ dội hoặc có máu trong phân, bạn cần đi khám bác sĩ ngay lập tức." },
            "tao-bon": { answer: "Táo bón thường do chế độ ăn thiếu chất xơ, ít uống nước và lười vận động. Để cải thiện, hãy tăng cường ăn rau xanh, trái cây (mận, đu đủ), và ngũ cốc nguyên hạt. Uống ít nhất 2 lít nước mỗi ngày. Vận động thể chất thường xuyên, như đi bộ 30 phút mỗi ngày, cũng giúp kích thích nhu động ruột. Hãy tập thói quen đi vệ sinh vào một giờ cố định mỗi ngày. Tránh lạm dụng thuốc nhuận tràng. Nếu táo bón trở thành vấn đề mãn tính hoặc kèm theo đau bụng, bạn nên tham khảo ý kiến bác sĩ." },
            "dau-bung": { answer: "Đau bụng có rất nhiều nguyên nhân, từ khó tiêu đơn giản đến các bệnh lý nghiêm trọng. Hãy xác định vị trí đau (trên, dưới, trái, phải) và kiểu đau (âm ỉ, quặn thắt, nhói). Nếu đau nhẹ do khó tiêu, bạn có thể thử uống trà gừng ấm hoặc chườm ấm bụng. Tuy nhiên, nếu cơn đau bụng dữ dội, đột ngột, kéo dài liên tục, hoặc kèm theo sốt, nôn mửa, chướng bụng, bạn cần đến cơ sở y tế ngay lập tức để được chẩn đoán và xử lý kịp thời, vì đó có thể là dấu hiệu của viêm ruột thừa, tắc ruột hoặc các tình trạng cấp cứu khác." }
        }
    },
    "stress-lo-au": {
        keywords: ["stress", "căng thẳng", "lo âu", "buồn"],
        question: "Bạn đang cảm thấy như thế nào?",
        options: { "cang-thang-lien-tuc": "Căng thẳng, quá tải", "buon-chan": "Buồn chán, mất hứng thú", "hoang-so": "Có cơn hoảng sợ đột ngột" },
        answers: {
            "cang-thang-lien-tuc": { answer: "Cảm giác căng thẳng kéo dài có thể gây hại cho cả thể chất và tinh thần. Hãy dành thời gian mỗi ngày cho các hoạt động giúp bạn thư giãn, như đi dạo, nghe nhạc, hoặc theo đuổi một sở thích. Kỹ thuật hít thở sâu (hít vào 4 giây, giữ 7 giây, thở ra 8 giây) là một công cụ mạnh mẽ để giảm căng thẳng tức thì. Đảm bảo bạn ngủ đủ giấc và duy trì chế độ ăn uống cân bằng. Học cách nói 'không' với những yêu cầu không cần thiết để tránh bị quá tải. Nếu cảm giác căng thẳng vẫn không thuyên giảm, đừng ngần ngại tìm đến chuyên gia tư vấn tâm lý." },
            "buon-chan": { answer: "Cảm giác buồn chán, mất hứng thú với các hoạt động từng yêu thích trong một thời gian dài (trên 2 tuần) có thể là dấu hiệu của trầm cảm. Việc chia sẻ cảm xúc của bạn với một người bạn tin tưởng hoặc thành viên gia đình là bước đầu tiên quan trọng. Hãy cố gắng duy trì các thói quen cơ bản như tắm rửa, ăn uống đúng bữa và ra ngoài trời hít thở không khí trong lành mỗi ngày, dù chỉ trong vài phút. Tập thể dục nhẹ nhàng cũng đã được chứng minh là có tác dụng cải thiện tâm trạng. Tìm kiếm sự giúp đỡ từ bác sĩ hoặc nhà trị liệu tâm lý là một hành động mạnh mẽ và cần thiết." },
            "hoang-so": { answer: "Một cơn hoảng sợ là một đợt sợ hãi dữ dội đột ngột, có thể gây tim đập nhanh, khó thở, chóng mặt và cảm giác mất kiểm soát. Khi cảm thấy một cơn hoảng sợ sắp xảy ra, hãy thử kỹ thuật 'tiếp đất' 5-4-3-2-1: nhìn vào 5 vật, chạm vào 4 vật, nghe 3 âm thanh, ngửi 2 mùi, và nếm 1 vị. Tập trung vào hơi thở, hít vào thở ra thật chậm. Hãy nhớ rằng cảm giác này rất khó chịu nhưng không gây nguy hiểm và sẽ qua đi. Nếu bạn thường xuyên gặp phải các cơn hoảng sợ, bạn nên đi khám để được chẩn đoán và điều trị rối loạn hoảng sợ." }
        }
    },
    "met-moi": {
        keywords: ["mệt mỏi", "uể oải", "kiệt sức"],
        question: "Sự mệt mỏi của bạn có đặc điểm gì?",
        options: { "thieu-nang-luong": "Thiếu năng lượng cả ngày", "buon-ngu": "Buồn ngủ quá mức ban ngày", "sau-khi-om": "Mệt mỏi sau khi bị ốm" },
        answers: {
            "thieu-nang-luong": { answer: "Cảm giác uể oải, thiếu năng lượng liên tục có thể do nhiều yếu tố. Hãy xem lại chế độ ăn uống: bạn có ăn đủ chất sắt, vitamin B12 và protein không? Đảm bảo bạn uống đủ nước trong ngày. Ngay cả việc mất nước nhẹ cũng có thể gây mệt mỏi. Tập thể dục đều đặn, dù chỉ là đi bộ, cũng giúp tăng cường năng lượng về lâu dài. Hãy kiểm tra lại giấc ngủ của bạn, đảm bảo ngủ đủ 7-8 tiếng mỗi đêm. Nếu tình trạng mệt mỏi không cải thiện sau khi đã điều chỉnh lối sống, bạn nên đi khám để kiểm tra các vấn đề y tế như thiếu máu, suy giáp." },
            "buon-ngu": { answer: "Buồn ngủ quá mức vào ban ngày, đặc biệt là ngủ gật trong các tình huống không phù hợp, là một dấu hiệu cần chú ý. Nguyên nhân phổ biến nhất là thiếu ngủ hoặc chất lượng giấc ngủ kém vào ban đêm. Hãy ưu tiên cho giấc ngủ, tạo một môi trường ngủ tốt và lịch trình đều đặn. Nếu bạn đã ngủ đủ nhưng vẫn buồn ngủ, bạn cần đi khám để loại trừ các rối loạn giấc ngủ như chứng ngưng thở khi ngủ hoặc chứng ngủ rũ. Tránh lái xe hoặc vận hành máy móc khi cảm thấy quá buồn ngủ để đảm bảo an toàn." },
            "sau-khi-om": { answer: "Mệt mỏi kéo dài sau khi bị nhiễm virus (như cúm hoặc COVID-19) là một hiện tượng khá phổ biến. Cơ thể bạn đã tiêu tốn rất nhiều năng lượng để chống lại bệnh tật và cần thời gian để phục hồi. Hãy kiên nhẫn với bản thân. Quay trở lại các hoạt động hàng ngày một cách từ từ, đừng quá gắng sức. Tập trung vào dinh dưỡng tốt, uống đủ nước và ngủ đủ giấc. Các hoạt động nhẹ nhàng như đi bộ ngắn có thể giúp cải thiện dần dần. Nếu sự mệt mỏi nghiêm trọng và kéo dài hàng tháng trời, bạn nên thảo luận với bác sĩ về hội chứng mệt mỏi mạn tính sau nhiễm virus." }
        }
    },
    "chong-mat": {
        keywords: ["chóng mặt", "hoa mắt", "xây xẩm"],
        question: "Cảm giác chóng mặt của bạn là gì?",
        options: { "choang-vang": "Choáng váng, xây xẩm, muốn ngất", "quay-cuong": "Cảm giác mọi thứ xung quanh đang quay cuồng", "mat-thang-bang": "Mất thăng bằng, đi không vững" },
        answers: {
            "choang-vang": { answer: "Cảm giác choáng váng, xây xẩm mặt mày thường xảy ra khi não không nhận đủ máu, ví dụ như khi bạn đứng dậy quá nhanh. Đây gọi là hạ huyết áp tư thế. Để phòng tránh, hãy thay đổi tư thế một cách từ từ. Mất nước và hạ đường huyết cũng là nguyên nhân phổ biến, vì vậy hãy đảm bảo uống đủ nước và ăn uống đều đặn. Nếu bạn thường xuyên bị choáng váng, đặc biệt là khi kèm theo đau ngực hoặc tim đập nhanh, bạn cần đi khám bác sĩ tim mạch để kiểm tra." },
            "quay-cuong": { answer: "Cảm giác mọi thứ xung quanh đang quay cuồng là triệu chứng điển hình của chóng mặt thực sự (vertigo). Nguyên nhân thường do các vấn đề ở tai trong, nơi kiểm soát thăng bằng. Bệnh chóng mặt tư thế kịch phát lành tính (BPPV) là nguyên nhân phổ biến nhất, xảy ra khi các tinh thể nhỏ trong tai trong bị lạc chỗ. Các bài tập tái định vị (như nghiệm pháp Epley), do bác sĩ hoặc chuyên gia vật lý trị liệu hướng dẫn, có thể rất hiệu quả. Nếu chóng mặt kèm theo đau đầu dữ dội, nhìn đôi, hoặc yếu liệt, hãy đến cơ sở y tế cấp cứu ngay lập tức." },
            "mat-thang-bang": { answer: "Cảm giác mất thăng bằng, đi không vững có thể liên quan đến nhiều hệ thống trong cơ thể, bao gồm tai trong, mắt, các dây thần kinh cảm giác ở chân và não bộ. Nguyên nhân có thể từ các vấn đề thần kinh, tác dụng phụ của thuốc, hoặc đơn giản là sự suy yếu cơ bắp. Hãy dọn dẹp nhà cửa để tránh các vật cản có thể gây ngã. Các bài tập cải thiện thăng bằng và sức mạnh cơ chân, như đứng trên một chân hoặc thái cực quyền, rất hữu ích. Việc đi khám bác sĩ để được đánh giá toàn diện là rất quan trọng để tìm ra nguyên nhân và có kế hoạch can thiệp phù hợp." }
        }
    },
   // --- CÁC CHỦ ĐỀ PHỤ (ĐIỂM ĐẾN CỦA PHÂN NHÁNH) ---
    "da-lieu-mo-rong": {
        question: "Bạn gặp vấn đề da nào nhiều nhất gần đây?",
        options: { "da-dau": "Da dầu, bóng nhờn", "mun-noi-tiet": "Mụn nội tiết (quanh cằm)", "mun-viem": "Mụn viêm, sưng đỏ", "da-kho-ngua": "Da khô, ngứa" },
        answers: {
            "da-dau": { answer: "Da dầu do tuyến bã nhờn hoạt động mạnh. Hãy dùng sữa rửa mặt dịu nhẹ hai lần mỗi ngày, tránh chà xát mạnh. Sử dụng các sản phẩm chứa Salicylic Acid (BHA) hoặc Niacinamide có thể giúp kiểm soát dầu và làm thông thoáng lỗ chân lông. Đừng quên dưỡng ẩm bằng kem dưỡng dạng gel, nhẹ mặt." },
            "mun-noi-tiet": { requiresContext: "female", answer: "Mụn nội tiết ở nữ giới thường liên quan đến chu kỳ kinh nguyệt hoặc stress. Để hiểu rõ hơn, tôi có thể hỏi bạn một câu về chu kỳ của mình không?", nextTopic: "phu-nu-suc-khoe" },
            "mun-viem": { answer: "Mụn viêm, sưng đỏ là do vi khuẩn P. acnes và phản ứng viêm của cơ thể. Tuyệt đối không được nặn mụn để tránh để lại sẹo thâm và làm tình trạng nặng hơn. Bạn có thể sử dụng các sản phẩm chấm mụn tại chỗ chứa Benzoyl Peroxide hoặc Adapalene. Hãy luôn giữ vệ sinh các vật dụng tiếp xúc với mặt như vỏ gối, khẩu trang." },
            "da-kho-ngua": { answer: "Da khô ngứa khi thời tiết thay đổi là do hàng rào bảo vệ da bị suy yếu và mất độ ẩm. Hãy uống đủ nước, sử dụng kem dưỡng ẩm chứa Ceramide hoặc Hyaluronic Acid hai lần mỗi ngày, đặc biệt là sau khi tắm. Tránh tắm nước quá nóng và sử dụng các sản phẩm làm sạch quá mạnh. Nếu da rất ngứa hoặc có dấu hiệu chàm, bạn nên đi khám da liễu." }
        }
    },
    "phu-nu-suc-khoe": {
        requiresContext: "female",
        question: "Cảm ơn bạn đã chia sẻ. Chu kỳ kinh nguyệt của bạn có đều không?",
        options: { "deu": "Chu kỳ đều (28-32 ngày)", "khong-deu": "Chu kỳ thất thường (lúc sớm, lúc trễ)", "roi-loan": "Rối loạn kéo dài, kèm đau bụng/mụn nhiều" },
        answers: {
            "deu": { answer: "Chu kỳ đều là một dấu hiệu tốt cho thấy nội tiết tố tương đối ổn định. Vấn đề mụn của bạn có thể liên quan nhiều hơn đến yếu tố di truyền, stress hoặc cách chăm sóc da. Hãy ưu tiên các sản phẩm không gây bít tắc lỗ chân lông (non-comedogenic) và duy trì chế độ ăn ít đường, ít sữa." },
            "khong-deu": { answer: "Kinh nguyệt không đều có thể do nhiều nguyên nhân như thay đổi hormone, căng thẳng, thay đổi cân nặng đột ngột, hoặc các vấn đề về tuyến giáp. Bạn nên theo dõi chu kỳ của mình trong ít nhất 3 tháng. Nếu tình trạng này kéo dài và đi kèm các triệu chứng khác như mụn nhiều, tăng cân không rõ nguyên nhân hoặc rụng tóc, bạn nên đi khám phụ khoa để kiểm tra hội chứng buồng trứng đa nang (PCOS)." },
            "roi-loan": { answer: "Rối loạn kinh nguyệt kéo dài, đặc biệt khi kèm theo mụn trứng cá nặng, da dầu hoặc rậm lông, có thể là dấu hiệu của sự mất cân bằng hormone androgen. Bạn nên đi khám bác sĩ chuyên khoa Nội tiết hoặc Phụ khoa để được làm các xét nghiệm cần thiết. Trong thời gian này, hãy tập trung vào lối sống lành mạnh: ăn uống cân bằng, hạn chế thức khuya và quản lý căng thẳng." }
        }
    }
};
module.exports = chatbotKnowledgeBase;