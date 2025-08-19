import keypress from 'keypress';
import chalk from 'chalk';
import figlet from 'figlet';
import SoundPlayer from './sound-player.js';
import MeritCounter from './merit-counter.js';

class KoiFish {
  constructor() {
    this.soundPlayer = new SoundPlayer();
    this.meritCounter = new MeritCounter();
    this.isRunning = false;
  }

  async start() {
    console.clear();
    await this.showWelcome();
    this.setupKeyListener();
    this.showInstructions();
    this.isRunning = true;
  }

  async showWelcome() {
    return new Promise((resolve) => {
      figlet('Koi Fish', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }, (err, data) => {
        if (err) {
          console.log(chalk.yellow('🐟 电子木鱼 CLI 🐟'));
        } else {
          console.log(chalk.cyan(data));
        }
        console.log(chalk.green('\n✨ 欢迎使用电子木鱼 ✨'));
        console.log(chalk.yellow('积攒功德，净化心灵\n'));
        resolve();
      });
    });
  }

  showInstructions() {
    console.log(chalk.blue('📖 使用说明:'));
    console.log(chalk.white('  • 按 空格键 敲击木鱼'));
    console.log(chalk.white('  • 按 q 或 Ctrl+C 退出'));
    console.log(chalk.white('  • 每次敲击功德 +1\n'));
    
    this.showCurrentMerit();
    console.log(chalk.gray('\n等待敲击...'));
  }

  showCurrentMerit() {
    const merit = this.meritCounter.getMerit();
    console.log(chalk.green(`🙏 当前功德: ${merit}`));
  }

  setupKeyListener() {
    // 使stdin可以监听按键
    keypress(process.stdin);
    
    // 启用原始模式
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();

    process.stdin.on('keypress', (ch, key) => {
      if (!this.isRunning) return;

      // 处理退出
      if (key && (key.name === 'q' || (key.ctrl && key.name === 'c'))) {
        this.exit();
        return;
      }

      // 处理空格键
      if (key && key.name === 'space') {
        this.hitWoodenFish();
      }
    });
  }

  hitWoodenFish() {
    // 播放木鱼声
    this.soundPlayer.playSound();
    
    // 增加功德
    this.meritCounter.addMerit();
    
    // 显示敲击效果
    this.showHitEffect();
  }

  showHitEffect() {
    // 清除当前行并显示敲击效果
    process.stdout.write('\r' + ' '.repeat(50) + '\r');
    
    const merit = this.meritCounter.getMerit();
    const hitEffect = chalk.yellow('🔔 ') + chalk.red('咚！') + chalk.yellow(' 🔔');
    const meritText = chalk.green(`功德 +1 (总计: ${merit})`);
    
    console.log(`${hitEffect} ${meritText}`);
    
    // 显示随机佛语
    this.showRandomBuddhistQuote();
    
    console.log(chalk.gray('等待敲击...'));
  }

  showRandomBuddhistQuote() {
    const quotes = [
      '南无阿弥陀佛',
      '功德无量',
      '善哉善哉',
      '阿弥陀佛',
      '心静自然凉',
      '放下执念',
      '慈悲为怀',
      '积善成德',
      '心如止水',
      '福慧双修'
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(chalk.cyan(`   ${randomQuote}`));
  }

  exit() {
    console.log(chalk.yellow('\n\n🙏 感恩使用电子木鱼'));
    console.log(chalk.green(`📿 本次共积累功德: ${this.meritCounter.getMerit()}`));
    console.log(chalk.cyan('🌸 愿您功德圆满，阿弥陀佛！\n'));
    
    process.exit(0);
  }
}

export default KoiFish;