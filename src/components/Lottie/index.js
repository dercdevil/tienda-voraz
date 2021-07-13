import React  from "react";
import Lottie from "react-lottie";

const Lottieimage = ({image, height, width}) => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: image,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
        <Lottie options={defaultOptions} height={height} width={width} />
    );
  }
export default Lottieimage;
