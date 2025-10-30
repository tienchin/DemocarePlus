// src/pages/KnowledgeHubPage.js
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { medicalKnowledgeBase } from '../knowledgeBase';
import Fuse from 'fuse.js';
import { FaSearch } from 'react-icons/fa';

const KnowledgeHubPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Cấu hình Fuse.js để tìm kiếm
  const allTopics = useMemo(() => medicalKnowledgeBase.flatMap(category => 
    category.subitems.map(item => ({ ...item, categoryTitle: category.title }))
  ), []);

  const fuse = new Fuse(allTopics, { keys: ['name', 'content'], threshold: 0.4 });
  const results = searchTerm ? fuse.search(searchTerm).map(result => result.item) : allTopics;
  
  // Nhóm kết quả lại theo danh mục
  const groupedResults = results.reduce((acc, topic) => {
    (acc[topic.categoryTitle] = acc[topic.categoryTitle] || []).push(topic);
    return acc;
  }, {});

  return (
    <div className="card-bg p-6 md:p-10 rounded-lg">
      <h1 className="text-4xl font-bold text-main">Kho Kiến thức Y khoa</h1>
      
      {/* THANH TÌM KIẾM MỚI */}
      <div className="relative my-8">
        <input 
          type="text" 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm trong kho kiến thức..." 
          className="w-full py-3 pl-4 pr-12 rounded-full border border-main bg-primary text-main"
          style={{backgroundColor: 'var(--bg-primary)'}}
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle" />
      </div>

      <div className="space-y-8">
        {Object.keys(groupedResults).length > 0 ? (
          Object.entries(groupedResults).map(([categoryTitle, items]) => (
            <section key={categoryTitle}>
              <h2 className="text-2xl font-semibold mb-4 text-main">{categoryTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Link to={`/knowledge/${item.id}`} key={item.id} className="block p-4 border border-main rounded-md text-subtle hover:bg-secondary hover:border-accent hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-subtle">Không tìm thấy kết quả phù hợp cho "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHubPage;