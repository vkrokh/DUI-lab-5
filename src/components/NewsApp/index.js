import React, { useEffect, useState, useRef } from "react";
import { NewsFilter } from "../NewsFilter";
import { NewsArticle } from "../NewsArticle";
import './style.css';

const apiKey = '1b53ce10fb9640c4a0d21e720a3901ec';
const articlesLimit = 40;
const pageSize = 5;
const noResultsMessage = 'There are no articles matching your request';

const getArticles = async ({ query, source, page, itemsPerPage }) => {
    const url = `https://newsapi.org/v2/everything?q=${query || ''}&sources=${source || ''}&apiKey=${apiKey}&pageSize=${itemsPerPage}&page=${page}`;
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error ' + response.status)
    }
    let data = await response.json();

    if (data.status === 'error') {
        throw new Error(data.message)
    }

    return {
        items: data.articles,
        total: data.totalResults,
    }
}

export const NewsApp = () => {
    const [articles, setArticles] = useState([]);

    const [filterSettings, setFilterSettings] = useState({
        query: '',
        source: 'bbc-news',
    });

    const showLoadMoreButton = useRef(false);
    const currentPage = useRef(1);
    const itemsPerPage = useRef(pageSize);

    const handleLoadMoreBtn = () => {
        currentPage.current++;
        getArticles({
            ...filterSettings,
            page: currentPage.current,
            itemsPerPage: itemsPerPage.current,
        })
            .then(({items, total}) => {
                setArticles((prev) => {
                    const articles = [...prev, ...items];
                    showLoadMoreButton.current = articles.length < articlesLimit && articles.length < total;
                    return articles;
                });
            })
            .catch((e) => alert(e.message));
    }

    useEffect(() => {
        currentPage.current = 1;
        getArticles({
            ...filterSettings,
            page: currentPage.current,
            itemsPerPage: itemsPerPage.current,
        })
            .then(({items, total}) => {
                showLoadMoreButton.current = items.length < total && items.length < articlesLimit;
                setArticles(items);
            })
            .catch((e) => alert(e.message));
    }, [filterSettings]);

    return (
        
        <div className={'news-app'}> 
            <h1>News app</h1>
            <NewsFilter filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>
            {articles.length > 0 ? <div className={'news-list'}>
                {articles.map((article, i) => {
                    return (
                        <div key={i} className={'news-item'}>
                            <NewsArticle data={article}/>
                        </div>
                    )
                })}
            </div> : noResultsMessage}
            <NewsArticle/>
            {showLoadMoreButton.current && <button onClick={handleLoadMoreBtn}>Load more</button>}
        </div>
    );
}