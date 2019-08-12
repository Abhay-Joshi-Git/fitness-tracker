import { Component, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxFlex="12rem">
            <h1 mat-dialog-title>Confirmation</h1>
            <mat-dialog-content class="text-center">{{data.confirmationMessage}}</mat-dialog-content>
            <mat-dialog-actions class="mt-4">
                <button
                    mat-raised-button
                    [mat-dialog-close]="true"
                    color="warn"
                >
                    Yes
                </button>
                <button
                    #noButton
                    mat-raised-button
                    color="primary"
                    [mat-dialog-close]="false"
                >
                    No
                </button>
            </mat-dialog-actions>
        </div>
    `
})
export class ConfirmationDialogComponent implements AfterViewInit {
    @ViewChild('noButton', { read: ElementRef, static: false }) noButton!: ElementRef;

    ngAfterViewInit(): void {
        this.noButton.nativeElement.focus();
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}



}
