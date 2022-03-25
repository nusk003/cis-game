import { useStore } from "@src/store";
import { useCallback, useEffect } from "react";
import { AudioService } from "@src/utils/service";

export const useSound = (url: string) => {
  const audioService = AudioService.getInstance();
  const { sound } = useStore(
    useCallback(
      ({ sound }) => ({
        sound,
      }),
      []
    )
  );

  useEffect(() => {
    audioService.registerAudio(url);
    return () => audioService.unregisterAudio(url);
  }, []);

  useEffect(() => {
    if (sound) audioService.play();
    else audioService.pause();
  }, [sound]);
};
