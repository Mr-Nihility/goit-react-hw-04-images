import { ImgGallery } from './ImageGallery.styles';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

const ImageGallery = ({ handlerOpenModal, imageList }) => {
  return (
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
  );
};

ImageGallery.propTypes = {
  handlerOpenModal: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export { ImageGallery };
