// src/pages/QuestionDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

const QuestionDetailPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    useEffect(() => {
        api.get(`/questions/${id}`).then(res => setQuestion(res.data));
    }, [id]);

    if (!question) return <div>Đang tải...</div>;

    return (
        <div className="card-bg p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-main">{question.title}</h1>
            <p className="text-sm text-subtle mt-2">bởi {question.name} - {new Date(question.created_at).toLocaleDateString()}</p>
            <div className="prose max-w-none mt-6 text-main whitespace-pre-wrap">{question.content}</div>
            <CommentSection questionId={id} />
        </div>
    );
};
export default QuestionDetailPage;
