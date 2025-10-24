// Sound effects system
export const playSound = (soundType) => {
    try {
      // Simple sound implementation using Web Audio API for basic tones
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
  
      let frequency, duration, type;
  
      switch (soundType) {
        case 'success':
          frequency = 600;
          duration = 200;
          type = 'sine';
          break;
        case 'error':
          frequency = 200;
          duration = 400;
          type = 'sawtooth';
          break;
        case 'aigor-attack':
          frequency = 100;
          duration = 600;
          type = 'triangle';
          break;
        case 'typing':
          frequency = 800;
          duration = 100;
          type = 'square';
          break;
        case 'complete':
          frequency = 700;
          duration = 300;
          type = 'sine';
          break;
        default:
          return;
      }
  
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
  
      oscillator.frequency.value = frequency;
      oscillator.type = type;
  
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );
  
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      console.log('Sound not supported:', e);
    }
  };