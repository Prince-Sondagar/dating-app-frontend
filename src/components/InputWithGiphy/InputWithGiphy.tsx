import React, { useState, useRef } from 'react';
import {
  IonToolbar, IonButtons, IonButton, IonTextarea, IonIcon
} from '@ionic/react';
import { send } from 'ionicons/icons';
import GiphySearch from '../GiphySearch/GiphySearch';
import chatPaperClipIcon from '../../assets/img/chat-paper-clip-icon.svg'
import './InputWithGiphy.scss';

type Props = {
  onChange: (d: any) => void,
}

const InputWithGiphy: React.FC<Props> = ({ onChange }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [showGiphy, setShowGiphy] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonTextareaElement>(null);

  const handleToggleGiphy = () => {
    setShowGiphy(!showGiphy);
  }

  const handleSendText = () => {
    if (onChange) {
      onChange({
        type: 'text',
        message: textInput,
      });
    }
    setTextInput('');
    if (inputRef && inputRef.current) {
      // @ts-ignore
      inputRef.current.setFocus();
    }
  }

  const handleSendGif = (imageUrl: string) => {
    if (onChange) {
      onChange({
        type: 'image',
        imageUrl: imageUrl
      });
    }
    setTextInput('');
  }

  return (
    <div className="input-with-giphy">
      {
        showGiphy &&
        <GiphySearch
          onSelect={handleSendGif}
          onClose={handleToggleGiphy}
        />
      }

      {
        !showGiphy &&
        <IonToolbar className="toolbar-no-border">
          <IonButtons slot="start" align-self-bottom className="stick-bottom">
            <IonButton fill="clear" color="light" shape="round" className="button-gif" onClick={handleToggleGiphy}>
              <img src={chatPaperClipIcon} alt='chatPaperClipIcon' />
            </IonButton>
          </IonButtons>
          <div className="input-block">
            <IonTextarea className="has-auto-grow" ref={inputRef} autoGrow value={textInput} onIonChange={e => setTextInput(e.detail.value as string)} rows={1} placeholder="Type a message" />
          </div>
          <IonButtons className="stick-bottom button-submit " slot="end">
            <IonButton
              type="submit"
              fill="clear"
              size="small"
              onClick={handleSendText}
            >
              <IonIcon icon={send} className='send-icon' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      }
    </div>
  );
};

InputWithGiphy.defaultProps = {

}

export default InputWithGiphy;
