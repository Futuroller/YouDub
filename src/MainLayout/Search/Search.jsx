import m from './Search.module.css'

function Search() {
    return (
        <div className={m.container}>
            <input className={m.searchbar} type='text' placeholder='Введите запрос'></input>
            <button className={m.searchButton}></button>
        </div>
    );
}

export default Search;