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

  displayedColumns = ['sno', 'date', 'title', 'amount', 'category', 'actions']

  constructor(private expenseService: ExpenseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.filter('monthly')
  }

  filter(type: any) {

    this.expenseService.getExpenses(type)
      .subscribe(data => {
        this.expenses = data
        this.expenses.forEach((e, index) => {
          e.sno = index + 1
        })
      })

  }
toggleDescription(id: string, check: any) {

  const allDescElements = document.querySelectorAll('.desHover');
  allDescElements.forEach((el: any) => {
    el.style.display = 'none';
  });

  const allDesCheckboxElements = document.querySelectorAll('.desCheckbox');
  allDesCheckboxElements.forEach((el: any) => {
    if (el !== check) {
      el.checked = false;
    }
  });

  const descElement = document.querySelector(`.desHover[data-id="${id}"]`) as HTMLElement;

  if (descElement) {
    descElement.style.display = check.checked ? 'block' : 'none';
  }

}
  deleteExpense(id: string) {

    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }
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