import { Component } from '@angular/core';
import { ExpenseService } from '../../core/services/expense.service';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})

export class ExpenseListComponent {

  expenses: any[] = []

  displayedColumns = ['date','title', 'amount', 'category',  'actions']

  constructor(private expenseService: ExpenseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.filter('monthly')
  }

  filter(type: any) {

    this.expenseService.getExpenses(type)
      .subscribe(data => {
        this.expenses = data
      })

  }

  deleteExpense(id: string) {

    this.expenseService.deleteExpense(id)
      .subscribe(() => {
        this.filter('monthly')
      })

  }

  editExpense(expense: any) {

    this.dialog.open(ExpenseCreateComponent, {

      width: '100vw',

      data: expense

    })

  }

}