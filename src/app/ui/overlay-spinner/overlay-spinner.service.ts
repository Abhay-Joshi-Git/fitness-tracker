import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlaySpinnerComponent } from './overlay-spinner.component';

@Injectable({
    providedIn: 'root'
})
export class OverlaySpinnerService {
    dialogRef: MatDialogRef<any>;
    constructor(private readonly dialogService: MatDialog) {}

    open() {
        this.closeDialog();
        this.dialogRef = this.dialogService.open(OverlaySpinnerComponent, {
            disableClose: false,
            hasBackdrop: false,
            panelClass: 'backdrop-panel-no-dialog-container'
        })
    }

    close() {
        this.closeDialog();
    }

    private closeDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }
}
