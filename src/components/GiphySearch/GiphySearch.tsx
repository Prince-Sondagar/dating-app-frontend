import React, { useState, useEffect } from 'react';
import {
  IonSpinner, IonToolbar, IonButtons, IonButton, IonIcon, IonInput
} from '@ionic/react';
import {
  closeSharp
} from 'ionicons/icons';
import GiphyService from '../../services/giphy.service';
import './GiphySearch.scss';

type Props = {
  onSelect: (s: string) => void,
  onClose: () => void,
}

const GiphySearch: React.FC<Props> = ({ onSelect, onClose }) => {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = () => {
    setIsLoading(true);

    GiphyService.trending()
      .then(res => {
        setGifs(res.data.data);
        setIsLoading(false);
      })
  }

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text.length === 0) return getTrending();
    setIsLoading(true);

    GiphyService.search(text)
      .then(res => {
        setGifs(res.data.data);
        setIsLoading(false);
      }, () => {
        setGifs([]);
      })
  }

  const handleSelect = (gif: any) => {
    if (onSelect) onSelect(gif.images.downsized_medium.url);
  }

  const handleClose = () => {
    setQuery('');
    if (onClose) onClose();
  }

  return (
    <div className="giphy-search">
      <div className="giphy-container">
        {
          isLoading &&
          <div className="giphy-loading">
            <IonSpinner />
          </div>
        }
        {
          !isLoading && gifs.length === 0 &&
          <div className="no-result">No GIF found</div>
        }
        {
          !isLoading &&
          <div className="scroll-horizontal">
            {
              gifs.map((gif: any) => (
                <div className="scroll-item" key={ gif.id } onClick={ () => handleSelect(gif) }>
                  <img src={ gif.images.fixed_height_small.url } alt="" />
                </div>
              ))
            }
          </div>
        }
      </div>

      <IonToolbar className="toolbar-no-border">
        <IonButtons slot="start" onClick={ handleClose }>
          <IonButton color="primary" className="giphy-close">
            <IonIcon slot="icon-only" icon={closeSharp} />
          </IonButton>
        </IonButtons>
        <IonInput
          type="text"
          autofocus
          debounce={500}
          placeholder="Search for a GIF..."
          value={ query }
          onIonChange={ e => handleSearch(e.detail.value as string) }
        />
      </IonToolbar>
    </div>
  );
};

GiphySearch.defaultProps = {

}

export default GiphySearch;
