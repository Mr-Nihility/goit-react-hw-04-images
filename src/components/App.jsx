import { useState } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//---------------------------------------------------------------------//
const App = () => {
  const [image, setImage] = useState('');
  const [query, setQuery] = useState('');

  const handlerOpenModal = img => {
    setImage(img);
  };
  const handlerCloseModal = () => {
    setImage('');
  };

  const handlerForm = search => {
    setQuery(search);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr0',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handlerForm} />

      <ImageGallery query={query} handlerOpenModal={handlerOpenModal} />

      {image && <Modal image={image} onClose={handlerCloseModal} />}
      <ToastContainer />
    </div>
  );
};

export { App };

// export class App extends Component {
//   state = {
//     image: '',
//     query: '',
//   };
//   // обробник кліка на картинку
//   handlerOpenModal = img => {
//     this.setState({ image: img });
//   };
//   //закриття модалки
//   handlerCloseModal = () => {
//     this.setState({ image: '' });
//   };
//   //дізнатись квери строку
//   handlerForm = query => {
//     this.setState({ query });
//   };

//   render() {
//     const { query, image } = this.state;
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr0',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSubmit={this.handlerForm} />

//         <ImageGallery query={query} handlerOpenModal={this.handlerOpenModal} />

//         {image && <Modal image={image} onClose={this.handlerCloseModal} />}
//         <ToastContainer />
//       </div>
//     );
//   }
// }
