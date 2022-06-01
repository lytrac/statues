import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Score, ScoreService } from '../services/score.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingComponent implements AfterViewInit {
  dataSource: MatTableDataSource<{ name: string, currentScore: number, highScore: number }> = new MatTableDataSource();
  a: string = "";

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private scoreService: ScoreService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const rawData = Object.fromEntries(this.scoreService.getAllScores())
    const ranking: { name: string, currentScore: number, highScore: number }[] = [];
    Object.keys(rawData).forEach(name => {
      const score = rawData[name] as Score;
      ranking.push({ name, currentScore: score.currentScore, highScore: score.highestScore });
    });
    this.dataSource = new MatTableDataSource(ranking);

    if (this.sort)
      this.dataSource.sort = this.sort;

    this.cdr.detectChanges();
  }
}
