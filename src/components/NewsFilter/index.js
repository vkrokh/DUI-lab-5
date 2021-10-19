import React from "react";
import './style.css';

export const NewsFilter = ({filterSettings, setFilterSettings}) => {

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setFilterSettings((prev) => ({
            ...prev,
            query: e.target.elements.search.value
        }))
    }

    const handleSourceChange = (e) => {
        setFilterSettings((prev) => ({
            ...prev,
            source: e.target.value
        }))
    }

    return (
        <div className={'news-filter'}>
            <form onSubmit={handleSearchSubmit} className="news-search">
                <input type="search" name="search"/>
                <button type={"submit"}>Search</button>
            </form>
            <form className="news-source">
                <select name="source" defaultValue={filterSettings.source} onChange={handleSourceChange} placeholder={'Select news source'}>
                    <option value="abc-news">ABC News</option>
                    <option value="axios">Axios</option>
                    <option value="bbc-news">BBC News</option>
                </select>
            </form>
        </div>
    );
}