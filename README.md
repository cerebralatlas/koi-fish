# 🐟 Koi Fish - CLI版电子木鱼

一个简单有趣的CLI工具，让你在终端中体验电子木鱼的乐趣！

## ✨ 功能特色

- 🔔 **真实音效**: 按空格键播放木鱼音效
- 📿 **功德累计**: 每次敲击功德+1，数据持久化保存
- 🏮 **等级系统**: 根据功德值获得不同的修行等级
- 💫 **随机佛语**: 每次敲击显示随机佛语
- 🌸 **美观界面**: 彩色终端界面，赏心悦目
- 💾 **数据保存**: 功德记录自动保存到本地

## 📦 安装

### 全局安装
```bash
npm install -g koi-fish
```

### 本地开发
```bash
git clone <repository-url>
cd koi-fish
npm install
npm start
```

## 🎮 使用方法

### 启动电子木鱼
```bash
koi-fish
```

### 操作说明
- **空格键**: 敲击木鱼，播放音效并增加功德
- **q 键**: 退出程序
- **Ctrl+C**: 强制退出

## 🏮 功德等级系统

| 功德值 | 等级 | 图标 |
|--------|------|------|
| 0-99   | 新手 | 🌿 |
| 100-499| 初学 | 🌾 |
| 500-999| 信徒 | 🌱 |
| 1000-1999| 弟子 | 🌸 |
| 2000-4999| 居士 | 🍃 |
| 5000-9999| 罗汉 | 🎋 |
| 10000+ | 菩萨 | 🏮 |

## 🔊 音频支持

程序支持多种音频播放方式：
1. **WAV文件播放**: 将木鱼音效文件放置在 `assets/wooden-fish.wav`
2. **合成音效**: 自动生成beep音效
3. **终端提示音**: 系统beep声
4. **视觉提示**: 当音频不可用时使用emoji提示

## 📁 文件结构

```
koi-fish/
├── bin/
│   └── koi-fish.js     # CLI入口文件
├── src/
│   ├── koi-fish.js     # 主程序逻辑
│   ├── sound-player.js # 音频播放模块
│   └── merit-counter.js # 功德计数模块
├── assets/
│   └── wooden-fish.wav # 木鱼音效文件(可选)
├── package.json
├── index.js
└── README.md
```

## 🛠️ 技术栈

- **ES Modules**: 使用现代JavaScript模块系统
- `keypress`: 监听键盘输入
- `chalk`: 终端彩色输出
- `figlet`: ASCII艺术字
- **Node.js**: 要求 v14.0.0+（支持ES Modules）

## 💡 开发说明

### 本地测试
```bash
npm start
```

### 全局链接(开发时)
```bash
npm link
koi-fish
```

### 取消全局链接
```bash
npm unlink -g koi-fish
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感恩所有使用者，愿大家功德圆满！

---

**愿你每一次敲击都能带来内心的平静** 🧘‍♀️