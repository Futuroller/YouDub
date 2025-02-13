import Header from './Header/Header'
import Navbar from './Navbar/Navbar'
import Content from './Content/Content'
import m from './App.module.css'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className={m.app}>
        <Header />
        <div className={m.container}>
          <Navbar navbar={store.navbar} />
          <Content content={store.content} />
        </div>
      </div>
    </BrowserRouter>
  )
}

let store = {
  navbar: {
    topMenu: [
      { id: 1, title: 'Главная', picture: '../images/mainIcon.png', navigation: '/mainpage' },
      { id: 2, title: 'Подписки', picture: '../images/followChannelsIcon.png' }
    ],
    middleMenu: [
      { id: 1, title: 'История', picture: '../images/historyIcon.png' },
      { id: 2, title: 'Ваш канал', picture: '../images/yourVideosIcon.png', navigation: '/mychannel' },
      { id: 3, title: 'Смотреть позже', picture: '../images/watchLaterIcon.png ' },
      { id: 4, title: 'Понравившиеся', picture: '../images/likedVideoIcon.png' },
      { id: 4, title: 'Плейлисты', picture: '../images/playlistsIcon.png' }
    ],
    followChannels: [
      { id: 1, title: 'Канал №1', picture: '../images/nehochu.jpg' },
      { id: 2, title: 'Канал №2', picture: '../images/nehochu.jpg' },
      { id: 3, title: 'Канал №3', picture: '../images/nehochu.jpg' }
    ]
  },
  content: {
    videos: [
      { id: 1, title: 'Тархун часть 1', channelName: 'Амням Гатс', preview: '../images/preview.jpg', channelImage: '../images/channel.jpg' },
      { id: 1, title: 'Тархун часть 2', channelName: 'Канал 2', preview: '../images/preview.jpg', channelImage: 'https://bogatyr.club/uploads/posts/2024-04/78376/thumbs/1713066966_bogatyr-club-ptxh-p-oboi-s-amnyamom-88.jpg' },
      { id: 1, title: 'Тархун часть 3', channelName: 'Канал 3', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/fb/37/fe/fb37fe49cb27530de1772cc344f3fa2a.jpg' },
      { id: 1, title: 'Тархун часть 4', channelName: 'Канал 4', preview: '../images/preview.jpg', channelImage: 'https://www.meme-arsenal.com/memes/274d52a723a2832eb3faaa6e69bd43d2.jpg' },
      { id: 1, title: 'Тархун часть 5', channelName: 'Канал 5', preview: '../images/preview.jpg', channelImage: 'https://i.ytimg.com/vi/15mC4qmkKMg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAZ3t6m3sh5CD4CX559cujFtzc3pg' },
      { id: 1, title: 'Тархун часть 6', channelName: 'Канал 6', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/c6/a2/20/c6a220ff020570783f984e434592b31c.jpg' },
      { id: 1, title: 'Тархун часть 7', channelName: 'Канал 7', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/5f/2f/1c/5f2f1cfaffc6b21214e0aa700a018395.jpg' },
      { id: 1, title: 'Тархун часть 8', channelName: 'Канал 8', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/bf/84/a8/bf84a85797cba4df53b7c3341ca377a5.jpg' },
      { id: 1, title: 'Тархун часть 9', channelName: 'Канал 9', preview: '../images/preview.jpg', channelImage: 'https://i.pinimg.com/736x/b2/bc/46/b2bc46946405df6bfa0e12379c2a940f.jpg' }
    ]
  }
};

export default App;
