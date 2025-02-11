import Header from './Header/Header'
import Navbar from './Navbar/Navbar'
import Content from './Content/Content'
import m from './App.module.css'

function App() {
  return (
    <div className={m.app}>
      <Header />
      <div className={m.container}>
        <Navbar navbar={store.navbar} />
        <Content />
      </div>
    </div>
  )
}

let store = {
  navbar: {
    topMenu: [
      { id: 1, title: 'Главная', picture: '../../../images/nehochu.jpg' },
      { id: 2, title: 'Подписки', picture: '../../../images/nehochu.jpg' }
    ],
    middleMenu: [
      { id: 1, title: 'История', picture: '../../../images/nehochu.jpg' },
      { id: 2, title: 'Ваши видео', picture: '../../../images/nehochu.jpg' },
      { id: 3, title: 'Смотреть позже', picture: '../../../images/nehochu.jpg' },
      { id: 4, title: 'Понравившиеся', picture: '../../../images/nehochu.jpg' },
      { id: 4, title: 'Плейлисты', picture: '../../../images/nehochu.jpg' }
    ],
    followChannels: [
      { id: 1, title: 'Канал №1', picture: '../../../images/nehochu.jpg' },
      { id: 2, title: 'Канал №2', picture: '../../../images/nehochu.jpg' },
      { id: 3, title: 'Канал №3', picture: '../../../images/nehochu.jpg' }
    ]
  },
  content: {
    videos: [
      {},
      {}
    ]
  }
};

export default App;
