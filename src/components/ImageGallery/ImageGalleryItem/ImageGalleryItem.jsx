import { ImgGalleryLi, ImgGalleryImg } from '../ImageGallery.styles';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, largeImg, handlerOpenModal }) => {
  return (
    <ImgGalleryLi>
      <ImgGalleryImg
        src={smallImg}
        alt=""
        onClick={() => handlerOpenModal(largeImg)}
      />
    </ImgGalleryLi>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
export { ImageGalleryItem };
