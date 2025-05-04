import { useState } from 'react';
import m from './Search.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSearchVideos, fetchSearchVideos } from '../../store/slices/videosSlice';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSearchClick = async () => {
        if (searchQuery.trim()) {
            navigate(`/main/search?query=${encodeURIComponent(searchQuery)}`);
            dispatch(clearSearchVideos());
        } else {
            navigate(`/main/mainpage`);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearchClick();
        }
    };

    return (
        <div className={m.container}>
            <input className={m.searchbar} type='text' placeholder='Введите запрос'
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
            <button className={m.searchButton} onClick={onSearchClick}></button>
        </div>
    );
}

export default Search;