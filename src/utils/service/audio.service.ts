export class AudioService {
  audioStorage: { audio: HTMLAudioElement; key: string }[] = [];
  static instance: AudioService | undefined;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AudioService();
    }

    return this.instance;
  }

  registerAudio(url: string) {
    const audio = new Audio(url);
    audio.loop = true;
    this.audioStorage.push({ audio, key: url });
  }

  unregisterAudio(url: string) {
    const index = this.audioStorage.findIndex(
      (audioMeta) => audioMeta.key === url
    );
    this.audioStorage[index]?.audio?.pause();
    this.audioStorage.splice(index, 1);
  }

  play() {
    this.audioStorage.forEach(({ audio }) => {
      audio.play();
    });
  }

  pause() {
    this.audioStorage.forEach(({ audio }) => {
      audio.pause();
    });
  }
}
