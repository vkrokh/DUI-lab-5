import React from "react";
import './style.css';

export const NewsArticle = ({data}) => {
    return data ? (
        <article className={'news-article'}>
            <h2 className={'news-article-title'}>{data.title}</h2>
            <img className={'news-image'} src={data.urlToImage} alt={data.title}/>
            <p className={'news-article-description'}>{data.description}</p>
            <a href={data.url} target="_blank">Read more</a>
        </article>
    ) : null;
}