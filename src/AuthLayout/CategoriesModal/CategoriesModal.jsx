import { useEffect, useState } from 'react';
import m from './CategoriesModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';

function CategoriesModal({ onClose, onSelect, usersCategories = [] }) {
    const [selected, setSelected] = useState(usersCategories.map(c => c.id));
    const { allCategories, isLoading, error } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const toggleCategory = (category) => {
        if (selected.includes(category.id)) {
            setSelected(selected.filter(id => id !== category.id));
        } else {
            setSelected([...selected, category.id]);
        }
    };

    const confirmSelection = () => {
        onSelect(selected.map(catId => {
            return allCategories.find(cat => cat.id === catId);
        }));
        onClose();
    };

    if (isLoading) return;
    if (error) return <p>Ошибка загрузки категорий</p>;

    return (
        <div className={m.container}>
            <div className={m.modal}>
                <h2>Выберите любимые категории</h2>
                <div className={m.categories}>
                    {allCategories.map((c) => (
                        <button
                            key={c.id}
                            className={`${m.category} ${selected.includes(c.id) ? m.selected : ''}`}
                            onClick={() => toggleCategory(c)}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
                <div className={m.buttons}>
                    <button onClick={onClose} className={m.cancel}>Отмена</button>
                    <button onClick={confirmSelection} className={m.confirm}>Выбрать</button>
                </div>
            </div>
        </div>
    );
}

export default CategoriesModal;