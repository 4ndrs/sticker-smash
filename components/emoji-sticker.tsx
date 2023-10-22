import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  TapGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { Image, ImageSourcePropType, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const EmojiSticker = ({ imageSize, stickerSource }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const handleDoubleTap =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onActive: () => {
        if (scaleImage.value !== imageSize * 2) {
          scaleImage.value = scaleImage.value * 2;
        }
      },
    });

  const handleDrag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { translateX: number; translateY: number }
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={handleDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={handleDoubleTap}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

export default EmojiSticker;
