import { Component, OnInit } from '@angular/core';

interface Target {
  x: number;
  y: number;
  size: number;
  id: number;
}
import { environment } from '../../../environment';
@Component({
  selector: 'app-fps-trainer',
  templateUrl: './fps-trainer.component.html',
  styleUrls: ['./fps-trainer.component.css']
})
export class FpsTrainerComponent implements OnInit {

  score = 0;
  shots = 0;
  hits = 0;
  accuracy = 0;

  timeLeft = 60;
  gameRunning = false;

  targets: Target[] = [];
  difficulty = 'easy';

  speed = 1500;
  targetCount = 2;

  interval: any;
  moveInterval: any;

  leaderboard: any[] = [];

  countdown = 3;

  // audio = new Audio('../../../gunshot.mp3');


audio!: HTMLAudioElement;

ngOnInit() {
  this.audio = new Audio();
  this.audio.src = '../../../gunshot.mp3';
  this.audio.load();

  this.loadLeaderboard();
  this.autoStart();
}

  // ⏱️ AUTO START AFTER 3 SEC
  autoStart() {
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(timer);
        this.startGame();
      }
    }, 1000);
  }

  setDifficulty(level: any) {
    this.difficulty = 'easy';

    if (level.value === 'easy') {
      this.speed = 1500;
      this.targetCount = 1;
    } else if (level.value === 'medium') {
      this.speed = 1000;
      this.targetCount = 2;
    } else {
      this.speed = 600;
      this.targetCount = 3;
    }
  }

  startGame() {
    this.score = 0;
    this.shots = 0;
    this.hits = 0;
    this.accuracy = 0;
    this.timeLeft = 30;

    this.gameRunning = true;

    this.spawnTargets();

    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.endGame();
    }, 1000);

    // 🎯 MOVING TARGETS
    this.moveInterval = setInterval(() => {
      this.moveTargets();
    }, this.speed);
  }

  endGame() {
    this.gameRunning = false;
    clearInterval(this.interval);
    clearInterval(this.moveInterval);

    this.saveScore();

    alert(`Score: ${this.score} | Accuracy: ${this.accuracy}%`);
  }

  spawnTargets() {
    this.targets = [];

    for (let i = 0; i < this.targetCount; i++) {
      this.targets.push({
        x: Math.random() * 90,
        y: Math.random() * 80,
        size: 60,
        id: i
      });
    }
  }

  moveTargets() {
    this.targets.forEach(t => {
      t.x = Math.random() * 90;
      t.y = Math.random() * 80;
    });
  }

  shootMiss() {
    this.shots++;
    this.updateAccuracy();
  }

  hitTarget(event: MouseEvent, target: Target) {
    event.stopPropagation();

    this.audio.currentTime = 0;
    this.audio.play();

    this.shots++;
    this.hits++;
    this.score++;

    this.updateAccuracy();
    this.moveTargets();
  }

  // 🎯 HEADSHOT ZONE
  headshot(event: MouseEvent, target: Target) {
    event.stopPropagation();

    this.audio.currentTime = 0;
    this.audio.play();

    this.shots++;
    this.hits++;
    this.score += 2; // bonus

    this.updateAccuracy();
    this.moveTargets();
  }

  updateAccuracy() {
    this.accuracy = this.shots ? Math.round((this.hits / this.shots) * 100) : 0;
  }

  // 🏆 LEADERBOARD
  saveScore() {
    const data = JSON.parse(localStorage.getItem('fpsScores') || '[]');

    data.push({
      score: this.score,
      accuracy: this.accuracy,
      date: new Date()
    });

    data.sort((a: any, b: any) => b.score - a.score);

    localStorage.setItem('fpsScores', JSON.stringify(data.slice(0, 5)));
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.leaderboard = JSON.parse(localStorage.getItem('fpsScores') || '[]');
  }

  // 🖥️ FULLSCREEN
  goFullscreen() {
    document.documentElement.requestFullscreen();
  }
}