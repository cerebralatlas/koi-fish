import fs from 'fs';
import path from 'path';
import os from 'os';

class MeritCounter {
  constructor() {
    this.merit = 0;
    this.savePath = path.join(os.homedir(), '.koi-fish-merit.json');
    this.loadMerit();
  }

  loadMerit() {
    try {
      if (fs.existsSync(this.savePath)) {
        const data = fs.readFileSync(this.savePath, 'utf8');
        const savedData = JSON.parse(data);
        this.merit = savedData.totalMerit || 0;
        console.log(`📿 读取历史功德: ${this.merit}`);
      }
    } catch (error) {
      console.log('📿 开始新的功德之旅');
      this.merit = 0;
    }
  }

  saveMerit() {
    try {
      const data = {
        totalMerit: this.merit,
        lastUpdated: new Date().toISOString(),
        sessions: this.getSessionCount() + 1
      };
      fs.writeFileSync(this.savePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log('⚠️  功德保存失败');
    }
  }

  addMerit(amount = 1) {
    this.merit += amount;
    this.saveMerit();
    return this.merit;
  }

  getMerit() {
    return this.merit;
  }

  getSessionCount() {
    try {
      if (fs.existsSync(this.savePath)) {
        const data = fs.readFileSync(this.savePath, 'utf8');
        const savedData = JSON.parse(data);
        return savedData.sessions || 0;
      }
    } catch (error) {
      return 0;
    }
    return 0;
  }

  getMeritLevel() {
    const merit = this.merit;
    
    if (merit >= 10000) {
      return { level: '菩萨', icon: '🏮', color: 'magenta' };
    } else if (merit >= 5000) {
      return { level: '罗汉', icon: '🎋', color: 'cyan' };
    } else if (merit >= 2000) {
      return { level: '居士', icon: '🍃', color: 'green' };
    } else if (merit >= 1000) {
      return { level: '弟子', icon: '🌸', color: 'blue' };
    } else if (merit >= 500) {
      return { level: '信徒', icon: '🌱', color: 'yellow' };
    } else if (merit >= 100) {
      return { level: '初学', icon: '🌾', color: 'white' };
    } else {
      return { level: '新手', icon: '🌿', color: 'gray' };
    }
  }

  getMeritStats() {
    const level = this.getMeritLevel();
    const sessions = this.getSessionCount();
    
    return {
      totalMerit: this.merit,
      level: level.level,
      icon: level.icon,
      color: level.color,
      sessions: sessions,
      averagePerSession: sessions > 0 ? Math.round(this.merit / sessions) : 0
    };
  }

  resetMerit() {
    this.merit = 0;
    try {
      if (fs.existsSync(this.savePath)) {
        fs.unlinkSync(this.savePath);
      }
    } catch (error) {
      console.log('重置功德时出错');
    }
  }
}

export default MeritCounter;