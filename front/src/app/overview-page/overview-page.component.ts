import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../entitiy/Transaction';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss',
})
export class OverviewPageComponent implements OnInit {
  constructor(private httpservice: TransactionService) {}
  transactions!: Transaction[];
  first = 0;

  rows = 10;
  expensesData: any;
  incomeData: any;
  options: any;

  dataLine: any;
  optionsLine: any;

  stateOptions: any[] = [
    { label: 'Expenses', value: 'off' },
    { label: 'Income', value: 'on' },
  ];
  value: string = 'off';
  ngOnInit() {
    this.httpservice.allTransactions().subscribe((data) => {
      this.transactions = data;
      this.expensesData = {
        labels: this.getLastMonthExpensesLabels(),
        datasets: [
          {
            data: this.getLastMonthTotalExpensesAmountsByLabel(),
            backgroundColor: this.getColorsOfLastMonthExpenses(),
            hoverBackgroundColor: ['#bec2be'],
          },
        ],
      };
      this.incomeData = {
        labels: this.getLastMonthIncomeLabels(),
        datasets: [
          {
            data: this.getLastMonthTotalIncomeAmountsByLabel(),
            backgroundColor: this.getColorsOfLastMonthIncome(),
            hoverBackgroundColor: ['#bec2be'],
          },
        ],
      };
      this.dataLine = {
        labels: this.getLast7DaysAsString(),
        datasets: [
          {
            label: 'Income',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: this.getTotalIncomeByDayLastWeek(),
          },
          {
            label: 'Expense',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--red-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: this.getTotalExpenseByDayLastWeek(),
          },
        ],
      };
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      cutout: '60%',
      aspectRatio: 1.3,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };

    this.optionsLine = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
  clear(table: Table) {
    table.clear();
  }

  isFirstPage(): boolean {
    return this.transactions ? this.first === 0 : true;
  }

  /////////////// Expenses
  getLastMonthExpensesTransactions(): Transaction[] {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= lastMonth && transaction.type === false,
    );
  }

  getLastMonthExpensesLabels(): string[] {
    const labels: string[] = [];
    this.getLastMonthExpensesTransactions().forEach((transaction) => {
      if (!labels.includes(transaction.category.name)) {
        labels.push(transaction.category.name);
      }
    });
    console.log(labels);
    return labels;
  }
  getLastMonthTotalExpensesAmountsByLabel(): number[] {
    const amounts: number[] = [];
    this.getLastMonthExpensesLabels().forEach((label) => {
      let totalAmount = 0;
      this.getLastMonthExpensesTransactions().forEach((transaction) => {
        if (transaction.category.name === label) {
          totalAmount += transaction.amount;
        }
      });
      amounts.push(Math.abs(totalAmount));
    });
    console.log(amounts);
    return amounts;
  }
  getColorsOfLastMonthExpenses(): string[] {
    const colors: string[] = [];
    this.getLastMonthExpensesLabels().forEach((label) => {
      this.getLastMonthExpensesTransactions().forEach((transaction) => {
        if (
          transaction.category.name === label &&
          colors.includes(transaction.category.color) === false
        ) {
          colors.push(transaction.category.color);
        }
      });
    });
    console.log(colors);
    return colors;
  }
  /////////////// Income
  getLastMonthIncomeTransactions(): Transaction[] {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= lastMonth && transaction.type === true,
    );
  }

  getLastMonthIncomeLabels(): string[] {
    const labels: string[] = [];
    this.getLastMonthIncomeTransactions().forEach((transaction) => {
      if (!labels.includes(transaction.category.name)) {
        labels.push(transaction.category.name);
      }
    });
    console.log(labels);
    return labels;
  }
  getLastMonthTotalIncomeAmountsByLabel(): number[] {
    const amounts: number[] = [];
    this.getLastMonthIncomeLabels().forEach((label) => {
      let totalAmount = 0;
      this.getLastMonthIncomeTransactions().forEach((transaction) => {
        if (transaction.category.name === label) {
          totalAmount += transaction.amount;
        }
      });
      amounts.push(Math.abs(totalAmount));
    });
    console.log(amounts);
    return amounts;
  }
  getColorsOfLastMonthIncome(): string[] {
    const colors: string[] = [];
    this.getLastMonthIncomeLabels().forEach((label) => {
      this.getLastMonthIncomeTransactions().forEach((transaction) => {
        if (
          transaction.category.name === label &&
          colors.includes(transaction.category.color) === false
        ) {
          console.log(transaction.category.color);
          colors.push(transaction.category.color);
        }
      });
    });
    console.log(colors);
    return colors;
  }

  ///////////// Line Chart
  getTotalExpenseByDayLastWeek(): number[] {
    const result: number[] = Array(7).fill(0);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    this.transactions
      .filter((transaction) => new Date(transaction.date) >= lastWeek)
      .forEach((transaction) => {
        const dayIndex =
          6 - this.getDayIndex(new Date(transaction.date), lastWeek);
        if (!transaction.type) {
          // Only consider expenses
          result[dayIndex] += transaction.amount;
        }
      });
    return result;
  }
  getTotalIncomeByDayLastWeek(): number[] {
    const result: number[] = Array(7).fill(0);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    this.transactions
      .filter((transaction) => new Date(transaction.date) >= lastWeek)
      .forEach((transaction) => {
        const dayIndex =
          6 - this.getDayIndex(new Date(transaction.date), lastWeek);
        if (transaction.type) {
          result[dayIndex] += transaction.amount;
        }
      });
    return result;
  }
  private getDayIndex(date: Date, lastWeek: Date): number {
    const dayDiff = Math.floor(
      (date.getTime() - lastWeek.getTime()) / (24 * 60 * 60 * 1000),
    );
    return 6 - dayDiff; // 6 corresponds to the first day, 0 to the last day
  }
  getLast7DaysAsString(): string[] {
    const last7Days: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      last7Days.push(formattedDate);
    }

    return last7Days;
  }
}
