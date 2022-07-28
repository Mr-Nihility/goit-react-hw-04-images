import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { ImgGallery } from './ImageGallery.styles';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { createRequest } from '../../api/apirequest';
import PropTypes from 'prop-types';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};

const ImageGallery = ({ handlerOpenModal, query }) => {
  const [imageList, setImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(STATUS.loading);
    setPage(1);
    setImageList([]);

    createRequest(query)
      .then(res => {
        const { data } = res;
        setImageList(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success);
        setPage(prev => prev + 1);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(STATUS.error);
      });
  }, [query]);

  const loadMore = () => {
    createRequest(query, page)
      .then(res => {
        const { data } = res;
        setImageList(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success);
        setPage(prev => prev + 1);
      })
      .catch(error => {
        setError(error.message);
        setStatus(STATUS.error);
      });
  };

  if (status === STATUS.loading) {
    return <Loader />;
  }
  if (status === STATUS.error) {
    return (
      <p
        style={{
          margin: '100px auto',
          fontSize: '40px',
          color: 'red',
        }}
      >
        {`Something went wronge :(`}
        <br />
        {error}
      </p>
    );
  }
  if (!imageList.length) {
    return (
      <p
        style={{
          margin: '100px auto',
          fontSize: '40px',
        }}
      >{`Please, enter the search request`}</p>
    );
  }
  if (status === STATUS.success) {
    return (
      <>
        <ImgGallery>
          {imageList.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                handlerOpenModal={handlerOpenModal}
              />
            );
          })}
        </ImgGallery>
        {totalHits >= 12 * page && <Button onClick={loadMore} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  handlerOpenModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

// class ImageGallery extends Component {
//   static propTypes = {
//     handlerOpenModal: PropTypes.func.isRequired,
//     query: PropTypes.string.isRequired,
//   };

//   state = {
//     imageList: [],
//     page: 1,
//     status: STATUS.idle,
//     totalHits: null,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.query !== this.props.query) {
//       this.setState({ status: STATUS.loading });
//       createRequest(this.props.query)
//         .then(res => {
//           const { data } = res;

//           this.setState(prevState => ({
//             imageList: [...data.hits],
//             page: 2,
//             totalHits: data.totalHits,
//             status: STATUS.success,
//           }));
//         })
//         .catch(error => {
//           this.setState({ status: STATUS.error, error });
//         });
//     }
//   }
//   //обробник кнопки "завантажити ще"
// loadMore = () => {
//   createRequest(this.props.query, this.state.page)
//     .then(res => {
//       const { hits } = res.data;
//       this.setState(prevState => ({
//         imageList: [...prevState.imageList, ...hits],
//         page: prevState.page + 1,
//       }));
//     })
//     .catch(error => {
//       this.setState({ status: STATUS.error, error });
//     });
// };

//   //рендер
//   render() {
//     const { imageList, page, totalHits, status, error } = this.state;

//     if (status === STATUS.loading) {
//       return <Loader />;
//     }
//     if (status === STATUS.error) {
//       return <p>{error}</p>;
//     }
//     if (!imageList.length) {
//       return (
//         <p
//           style={{
//             margin: '100px auto',
//             fontSize: '40px',
//           }}
//         >{`Please, enter the search request`}</p>
//       );
//     }
//     if (status === STATUS.success) {
//       return (
//         <>
//           <ImgGallery>
//             {imageList.map(({ id, webformatURL, largeImageURL }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   smallImg={webformatURL}
//                   largeImg={largeImageURL}
//                   handlerOpenModal={this.props.handlerOpenModal}
//                 />
//               );
//             })}
//           </ImgGallery>
//           {totalHits >= 12 * page && <Button onClick={this.loadMore} />}
//         </>
//       );
//     }
//   }
// }

export { ImageGallery };
