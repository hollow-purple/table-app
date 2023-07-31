import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { TableData } from '../app.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() tableData: TableData[] = [];

  @ViewChild(MatSort) sort: MatSort | null = null;
  public dataSource: MatTableDataSource<TableData>; // dataSource empty definition

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TableData>([]); // passing data to the dataSource variable
  }

  ngAfterViewInit() {
    // Assign the tableData to the dataSource and set the sort
    this.dataSource.data = this.tableData;
    this.dataSource.sort = this.sort;
  }

  /** Sorting */

  // Function to handle sorting changes
  public sortData(event: Sort) {
    const data = this.tableData.slice(); // Create a shallow copy of the original data
    if (!event.active || event.direction === '') {
      // No sorting needed
      this.dataSource.data = data;
      return;
    }

    // Perform sorting based on the title column
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      return this.compare(a.title, b.title, isAsc);
    });
  }

  // Helper function to compare two values
  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  /** */

  // Function to open the dialog for adding or editing an entry
  public addEntryDialog() {
    const newEntry: TableData = {
      userId: 0,
      id: 0,
      title: '',
      completed: false,
    };

    this.openDialog(newEntry);
  }

  public editEntryDialog(entry: TableData) {
    // Clone the entry to avoid modifying the original data until Save is clicked
    const entryToEdit = { ...entry };

    this.openDialog(entryToEdit);
  }

  // Function to open the entry dialog
  private openDialog(entryData: TableData) {
    const dialogConfig: MatDialogConfig = {
      data: entryData,
      minWidth: 500,
    };

    const dialogRef = this.dialog.open(EntryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If result is truthy (i.e., Save was clicked), either add or edit the entry
        if (entryData.id === 0) {
          // Add new entry
          this.addEntry(result);
        } else {
          // Edit existing entry
          this.editEntry(result);
        }
      }
    });
  }

  // Function to map userId to user roles
  getUserRole(userId: number) {
    switch (userId) {
      case 1:
        return 'admin';
      case 2:
        return 'tester';
      default:
        return 'unknown';
    }
  }

  // CRUD Operations
  addEntry(newEntry: TableData) {
    this.tableData.push(newEntry);
  }

  editEntry(updatedEntry: TableData) {
    const index = this.tableData.findIndex(
      (item) => item.id === updatedEntry.id
    );
    if (index !== -1) {
      this.tableData[index] = updatedEntry;
    }
  }

  deleteEntry(entryId: number) {
    this.tableData = this.tableData.filter((item) => item.id !== entryId);
  }
}
