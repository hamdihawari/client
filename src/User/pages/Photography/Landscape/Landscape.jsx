import React, { memo, useContext, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../../Context/Context';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SearchBar from '../../../components/SearchBar/SearchBar';
import useMediaQuery from '../../../Hooks/useMediaQuery';
import {ScrollToTopButton} from '../../../components/ScrollToTopButton/ScrollToTopButton'
import rtlStyle from './rtl.module.css'


const Landscape = () => {
  const { landscapeGallery, isArabic } = useContext(GalleryContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const isLargeMobile = useMediaQuery('(min-width:992px)'); // Laptop 
  const [searchTerm, setSearchTerm] = useState('');

  const handleImageClick = (index) => {
    setSelectedImage(landscapeGallery[index]);
  };

  const handleImageHover = (index) => {
    setSelectedImage(landscapeGallery[index]);
  };

  const handleImageLeave = () => {
    setSelectedImage(null);
  };

  const filteredGallery = landscapeGallery.filter(
    (val) =>
      (searchTerm === '' || val.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCity === '' || val.city === selectedCity)
  );

  const handleSearchInputChange = (e) => {
    const searchTermValue = e.target.value;
    setSearchTerm(searchTermValue);
  };

  return (
    <div className={style.landscape}>
        <div className={`${style.landscapeHeader} ${isArabic && rtlStyle.landscapeHeader}`}>
        {landscapeGallery.map(val =>{
          return<h1 className={`${style.header} ${isArabic && rtlStyle.header}`}>{val.headerTitle} {val.smile}</h1>
        })}
        {isLargeMobile && <SearchBar onSearchBarChange={handleSearchInputChange} /* customStyle={customHeaderStyle} */ onCityChange={setSelectedCity} />}
      </div>
      <div className={style.landscapeContent}>
        {filteredGallery.map((item, index) => (
          <div key={item.id} className={style.gallery}>
            <div
              className={style.single}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
            >
              <Link to={`/landscape/landscapeImage/${index}`} onClick={() => handleImageClick(index)}>

                <img src={item.original} alt='gallery' className={style.img} />
                {selectedImage === item && (
                  <div className={style.imageOverlay}>
                    <div className={style.imageTitle}>{item.title}</div>
                    <div className={style.buttonGroup}>
                      <IconButton className={style.favButton}>
                        <FavoriteIcon className={style.favotiteicon} id={style.fav}/* style={{ color: '#FFFFFF', fontSize: '28px' }} */ />
                      </IconButton>
                      <IconButton className={style.likeButton}>
                        <ThumbDownIcon className={style.favotiteicon} /* style={{ color: '#FFFFFF', fontSize: '28px' }} */ />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default memo(Landscape);
