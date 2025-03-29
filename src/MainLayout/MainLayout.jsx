import Header from './Header/Header'
import Navbar from './Navbar/Navbar'
import Content from './Content/Content'
import m from './MainLayout.module.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/slices/userSlice';
import apiRequest from '../api/apiRequest';
import { useEffect, useState } from 'react'

function MainLayout() {

    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        if (!token) {
            console.log('Токен отсутствует. Пользователь не авторизован.');
            navigate('/auth/login');
            return;
        }

        if (isFetched) return;
        if (isLoading || user?.id) return;

        const getUserData = async () => {
            try {
                setIsLoading(true);
                const response = await apiRequest('/main', 'GET'); // Запрос к серверу для получения данных пользователя

                if (response.status === 200) {
                    dispatch(setUser(response)); // Обновляем состояние Redux
                    setIsFetched(true);
                } else {
                    alert('Время сессии вышло');
                    navigate('/auth/login');
                    console.error('Ошибка при получении данных пользователя:', response.message);
                }
            } catch (error) {
                console.error('Ошибка при запросе данных пользователя:', error);
                navigate('/auth/login');
            } finally {
                setIsLoading(false);
            }
        };

        getUserData();
    }, [dispatch, navigate, user, isFetched, isLoading]);


    return (
        <div className={m.app}>
            <Header />
            <div className={m.container}>
                <Navbar />
                <Content content={store.content} />
                <Outlet />
            </div>
        </div>
    )
}

let store = {
    content: {
        videos: [
            { id: 1, title: 'Тархун часть 1', channelName: 'Амням Гатс', preview: '../images/preview.jpg', channelImage: '../images/channel.jpg' },
            { id: 2, title: 'Тархун часть 2', channelName: 'Амням Дедынсайд', preview: '../images/preview.jpg', channelImage: 'https://bogatyr.club/uploads/posts/2024-04/78376/thumbs/1713066966_bogatyr-club-ptxh-p-oboi-s-amnyamom-88.jpg' },
            { id: 3, title: 'Тархун часть 3', channelName: 'Амняши', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/fb/37/fe/fb37fe49cb27530de1772cc344f3fa2a.jpg' },
            { id: 4, title: 'Тархун часть 4', channelName: 'Амням гуль', preview: '../images/preview.jpg', channelImage: 'https://www.meme-arsenal.com/memes/274d52a723a2832eb3faaa6e69bd43d2.jpg' },
            { id: 5, title: 'Тархун часть 5', channelName: 'Мини амням', preview: '../images/preview.jpg', channelImage: 'https://i.ytimg.com/vi/15mC4qmkKMg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAZ3t6m3sh5CD4CX559cujFtzc3pg' },
            { id: 6, title: 'Тархун часть 6', channelName: 'ЧВК Амням', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/c6/a2/20/c6a220ff020570783f984e434592b31c.jpg' },
            { id: 7, title: 'Тархун часть 7', channelName: 'Нефор амням', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/5f/2f/1c/5f2f1cfaffc6b21214e0aa700a018395.jpg' },
            { id: 8, title: 'Тархун часть 8', channelName: 'Виктор Картман', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/bf/84/a8/bf84a85797cba4df53b7c3341ca377a5.jpg' },
            { id: 9, title: 'Тархун часть 9', channelName: 'Shiny omnom', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/b2/bc/46/b2bc46946405df6bfa0e12379c2a940f.jpg' }
        ]
    }
};

export default MainLayout;
