// src/pages/HomePage.js
import React from 'react';
import data from '../data.json';
import ArticleCard from '../components/ArticleCard';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import Fuse from 'fuse.js';

const HomePage = ({ searchTerm }) => {
  const fuse = new Fuse(data.articles, { keys: ['title', 'excerpt', 'author'], threshold: 0.4 });
  const articles = searchTerm ? fuse.search(searchTerm).map(result => result.item) : data.articles.slice(0, 4);

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* SỬA LỖI MÀU CHỮ Ở ĐÂY */}
          <h2 className="text-3xl font-bold mb-10 text-center text-main homepage-title pb-3">
            {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : 'Tin tức & Bài viết Mới nhất'}
          </h2>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center text-subtle">
              <p>Không tìm thấy bài viết nào phù hợp. Hãy thử một từ khóa khác.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;