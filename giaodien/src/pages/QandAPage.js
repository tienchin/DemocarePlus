// src/pages/QandAPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const QandAPage = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        api.get('/questions').then(res => setQuestions(res.data));
    }, []);

    return (
        <div className="card-bg p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-main">Hỏi & Đáp Sức khỏe</h1>
                <Link to="/ask-question" className="bg-accent bg-accent-hover text-white font-bold py-2 px-4 rounded-lg">Đặt câu hỏi</Link>
            </div>
            <div className="space-y-4">
                {questions.map(q => (
                    <Link to={`/question/${q.id}`} key={q.id} className="block p-4 border border-main rounded-md hover:bg-secondary">
                        <h2 className="text-xl font-semibold text-accent">{q.title}</h2>
                        <p className="text-sm text-subtle mt-1">bởi {q.name} - {new Date(q.created_at).toLocaleDateString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default QandAPage;