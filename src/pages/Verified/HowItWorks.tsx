import { IonButton, IonText } from "@ionic/react";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { VerifyUserStepsType } from "./Verified";
import { Pagination } from "swiper";

type Props = {
  onContinue: Dispatch<SetStateAction<VerifyUserStepsType>>;
};

const HowItWorks: FC<Props> = ({ onContinue }) => {
  return (
    <div className="verified-page">
      <img src="assets/img/profile/retry.png" alt="retry" />
      <IonText className="ion-margin-vertical">
        <h2>How it works</h2>
      </IonText>
      <div>
        <Swiper slidesPerView={1} pagination={true} modules={[Pagination]}>
          <SwiperSlide>
            <p className="ion-padding-bottom">
              Our facial recognition technology compares the face in your video selfie to the pics in your profile. We will keep two screenshots from your video selfie during the life of your account to audit and manage our Photo Verification feature. We'll also keep the results of the process (i.e., Photo Verified or not).
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ion-padding-bottom">
              <p>
                We do not keep the underlying facial recognition information or "template" beyond the Photo Verification process (which is usually complete within 24 hours). We do not keep your video selfie.
              </p>
              <Link to="">Find out more about how this works.</Link>
            </div>
          </SwiperSlide>
        </Swiper>
        <IonButton shape="round" fill="solid" expand="block" onClick={() => onContinue("before-continue")}>
          Verify Me
        </IonButton>
      </div>
    </div>
  );
};

export default HowItWorks;
