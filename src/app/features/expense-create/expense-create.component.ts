import { Component, Optional } from '@angular/core';
import { ExpenseService } from '../../core/services/expense.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { get } from 'http';
@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.css'
})
export class ExpenseCreateComponent {
  expense: any = {}

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private expenseService: ExpenseService, private dialog: MatDialog) { }

  location: any = {}
  locationPlaceholder: string = ""
  title: string = ""

  ngOnInit() {
    if (this.data) {

      this.expense = { ...this.data }
      this.title = "Update"

    } else {
      this.title = "Add"
    }
    this.setData();
    this.getLocation()

  }

  setData() {
    this.expense.paymentMethod = "SBI Credit Card";
    this.expense.date = new Date().toISOString().split('T')[0]
    this.expense.location = this.locationPlaceholder
  }

  getLocation() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude
        const lon = position.coords.longitude

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then(res => res.json())
          .then(data => {

            this.location = data
            this.expense.location = data.display_name
            this.locationPlaceholder = data.display_name

          })

      })
      this.locationPlaceholder = "Detecting location..."

    } else {
      this.locationPlaceholder = "Geolocation not supported"
    }
  }

  createExpense() {
    if (this.data) {
      this.expenseService.updateExpense(this.data._id, this.expense)
        .subscribe(() => {
          alert("Expense Updated")
        })
      //close dialog
      this.dialog.closeAll()
      return
    }
    if (!this.expense.amount || !this.expense.category || !this.expense.date) {
      alert("Please fill all the fields")
      return
    }
    this.expenseService.createExpense(this.expense)
      .subscribe(() => {
        this.expense = {};
        this.setData()
        alert("Expense Added")
      })

  }
}
