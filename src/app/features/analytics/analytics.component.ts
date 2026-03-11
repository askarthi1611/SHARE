import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { environment } from '../../../environment';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.css']
})

export class AnalyticsComponent implements AfterViewInit {

    expenses: any[] = [];

    constructor(private http: HttpClient) { }
    private api = environment.apiBaseUrl + "/expenses";

    ngAfterViewInit() {

        this.http.get<any>(this.api)
            .subscribe(res => {

                this.expenses = res;
                this.expenses.forEach((e, index) => {
                    e.sno = index + 1;
                    e.amount = +e.amount; // Ensure amount is a number
                });

                this.categoryChart();
                this.monthlyChart();
                this.pieChart();
                this.dailyChart();

            })

    }

    // CATEGORY CHART
    categoryChart() {

        const categoryMap: any = {};

        this.expenses.forEach(exp => {
            categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
        });

        const labels = Object.keys(categoryMap);
        const data = Object.values(categoryMap);

        new Chart("categoryChart", {

            type: 'bar',

            data: {
                labels: labels,
                datasets: [{
                    label: 'Expenses by Category',
                    data: data
                }]
            }

        })

    }

    // MONTHLY CHART
    monthlyChart() {

        const monthMap: any = {};

        this.expenses.forEach(exp => {

            const month = new Date(exp.date).toLocaleString('default', { month: 'short' });

            monthMap[month] = (monthMap[month] || 0) + exp.amount;

        })

        const labels = Object.keys(monthMap);
        const data = Object.values(monthMap);

        new Chart("monthlyChart", {

            type: 'line',

            data: {
                labels: labels,
                datasets: [{
                    label: 'Monthly Spending',
                    data: data,
                    fill: false
                }]
            }

        })

    }

    // PIE CHART
    pieChart() {

        const categoryMap: any = {};

        this.expenses.forEach(exp => {
            categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
        });

        const labels = Object.keys(categoryMap);
        const data = Object.values(categoryMap);

        new Chart("pieChart", {

            type: 'pie',

            data: {
                labels: labels,
                datasets: [{
                    data: data
                }]
            }

        })

    }

    // DAILY CHART
    dailyChart() {

        const dayMap: any = {};

        this.expenses.forEach(exp => {

            const day = new Date(exp.date).toLocaleString('default', { weekday: 'short' });

            dayMap[day] = (dayMap[day] || 0) + exp.amount;

        })

        const labels = Object.keys(dayMap);
        const data = Object.values(dayMap);

        new Chart("dailyChart", {

            type: 'bar',

            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Expenses',
                    data: data
                }]
            }

        })

    }

}