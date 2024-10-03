import React from 'react';
import {
  IonAvatar
} from '@ionic/react';
import {

} from 'ionicons/icons';
import ripple1 from '../../assets/img/ripple_1.svg'
import ripple2 from '../../assets/img/ripple_2.svg'
import discoverLoaderAvatar1 from '../../assets/img/discover_loader_avatar1.svg'
import discoverLoaderAvatar2 from '../../assets/img/discover_loader_avatar2.svg'
import discoverLoaderAvatar3 from '../../assets/img/discover_loader_avatar3.svg'
import discoverLoaderCircle1 from '../../assets/img/discover_loader_circle1.svg'
import discoverLoaderCircle2 from '../../assets/img/discover_loader_circle2.svg'
import discoverLoaderCircle3 from '../../assets/img/discover_loader_circle3.svg'
import discoverLoaderCircle4 from '../../assets/img/discover_loader_circle4.svg'
import './RippleLoader.scss';

type Props = {
  imageUrl: string,
}

const RippleLoader: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className="ripple-loader">
      <img src={discoverLoaderAvatar1} alt="discoverLoaderAvatar1" className="discover-loader-avatar1" />
      <img src={discoverLoaderAvatar2} alt="discoverLoaderAvatar2" className="discover-loader-avatar2" />
      <img src={discoverLoaderAvatar3} alt="discoverLoaderAvatar3" className="discover-loader-avatar3" />
      <img src={discoverLoaderCircle1} alt='discoverLoaderCircle1' className='discover-loader-circle1' />
      <img src={discoverLoaderCircle2} alt='discoverLoaderCircle2' className='discover-loader-circle2' />
      <img src={discoverLoaderCircle3} alt='discoverLoaderCircle3' className='discover-loader-circle3' />
      <img src={discoverLoaderCircle4} alt='discoverLoaderCircle4' className='discover-loader-circle4' />
      <IonAvatar className="thumbnail-xl ripple-trigger">
        <img src={imageUrl} alt="" />
      </IonAvatar>
      <img src={ripple1} alt='ripple1' className="ripple-1"></img>
      <img src={ripple2} alt='ripple2' className="ripple-2" />
    </div>

  );
};

RippleLoader.defaultProps = {

}

export default RippleLoader;
