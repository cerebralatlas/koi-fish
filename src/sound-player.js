import { spawn } from 'child_process';

class SoundPlayer {
  constructor() {
    this.soundEnabled = true;
    this.checkAudioSupport();
  }

  checkAudioSupport() {
    // 检查系统是否支持音频播放
    const platform = process.platform;
    
    if (platform === 'linux') {
      this.playCommand = 'aplay';
      this.beepCommand = 'beep';
    } else if (platform === 'darwin') {
      this.playCommand = 'afplay';
      this.beepCommand = 'say';
    } else if (platform === 'win32') {
      this.playCommand = 'start';
      this.beepCommand = 'echo';
    } else {
      this.soundEnabled = false;
    }
  }

  playSound() {
    // 使用多种方式尝试播放声音，有优雅的错误处理
    this.playSystemBeep() || this.playTerminalBeep() || this.playVisualFeedback();
  }

  playSystemBeep() {
    try {
      const platform = process.platform;
      
      if (platform === 'linux') {
        // Linux: 尝试使用beep命令
        const beepProcess = spawn('beep', ['-f', '800', '-l', '100'], { 
          stdio: 'ignore',
          detached: false 
        });
        
        // 添加错误处理，防止程序崩溃
        beepProcess.on('error', (error) => {
          // 静默处理错误，不让其传播到主进程
        });
        
        // 即使spawn失败，也不阻塞主进程
        return true;
        
      } else if (platform === 'darwin') {
        // macOS: 使用say命令播放音效
        const sayProcess = spawn('say', ['-v', 'Bells', '咚'], { 
          stdio: 'ignore',
          detached: false 
        });
        
        sayProcess.on('error', (error) => {
          // 静默处理错误
        });
        
        return true;
        
      } else if (platform === 'win32') {
        // Windows: 使用echo命令发出beep
        const cmdProcess = spawn('cmd', ['/c', 'echo \x07'], { 
          stdio: 'ignore',
          detached: false 
        });
        
        cmdProcess.on('error', (error) => {
          // 静默处理错误
        });
        
        return true;
      }
    } catch (error) {
      // 如果spawn本身失败，返回false让其他方法接管
      return false;
    }
    return false;
  }

  playTerminalBeep() {
    try {
      // 发送ASCII bell字符
      process.stdout.write('\x07');
      return true;
    } catch (error) {
      return false;
    }
  }

  playVisualFeedback() {
    // 视觉反馈作为最后的备选方案
    const bellEmojis = ['🔔', '🎵', '🔊', '⚡'];
    const randomBell = bellEmojis[Math.floor(Math.random() * bellEmojis.length)];
    process.stdout.write(randomBell);
    return true;
  }

  // 创建一个简单的木鱼音效提示
  static showSoundTip() {
    console.log('💡 音频提示:');
    console.log('   • Linux用户可安装 beep 命令获得更好的音效');
    console.log('   • macOS用户将听到系统音效');
    console.log('   • 所有用户都可以听到终端提示音');
  }
}

export default SoundPlayer;