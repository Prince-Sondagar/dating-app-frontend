import React from 'react';
import {

} from '@ionic/react';
import {

} from 'ionicons/icons';
import './LabelMatched.scss';

type Props = {

}

const LabelMatched: React.FC<Props> = () => {
  return (
    <div className="label-matched">
      <div className="matched-title">
        <div className="text-its">IT'S A</div>
        <div className="text-match">
          <div>MATCH!</div>
          <div>MATCH!</div>
          <div>MATCH!</div>
        </div>
      </div>
    </div>
  );
};

LabelMatched.defaultProps = {

}

export default LabelMatched;
