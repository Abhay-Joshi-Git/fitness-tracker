import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobile = false;
  private doneExercisesSubscription: Subscription = Subscription.EMPTY;
  columnsToDisplay = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private readonly _trainingExercise: TrainingService,
              private readonly breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.doneExercisesSubscription = this._trainingExercise.doneExercises.subscribe(exercises => {
      this.dataSource.data = exercises;
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.isMobile = result.matches;
      this.dataSource.paginator = result.matches ? null : this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.doneExercisesSubscription.unsubscribe();
  }
}
