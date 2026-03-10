import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
selector: 'app-analytics',
templateUrl: './analytics.component.html',
styleUrls: ['./analytics.component.css']
})

export class AnalyticsComponent implements AfterViewInit {

ngAfterViewInit(){

this.categoryChart()
this.monthlyChart()
this.pieChart()
this.dailyChart()

}

categoryChart(){

new Chart("categoryChart",{

type:'bar',

data:{
labels:['Food','Travel','Shopping','Medical','Entertainment'],

datasets:[{
label:'Expenses by Category',
data:[2000,1500,1000,700,1200],
backgroundColor:[
'#4CAF50',
'#2196F3',
'#FF9800',
'#F44336',
'#9C27B0'
]
}]

}

})

}

monthlyChart(){

new Chart("monthlyChart",{

type:'line',

data:{
labels:['Jan','Feb','Mar','Apr','May','Jun'],

datasets:[{
label:'Monthly Spending',
data:[5000,4500,6200,7000,6500,7200],
borderColor:'#3f51b5',
fill:false
}]

}

})

}

pieChart(){

new Chart("pieChart",{

type:'pie',

data:{
labels:['Food','Travel','Shopping','Medical','Others'],

datasets:[{
data:[2000,1500,1000,800,600],
backgroundColor:[
'#FF6384',
'#36A2EB',
'#FFCE56',
'#4CAF50',
'#9C27B0'
]
}]

}

})

}

dailyChart(){

new Chart("dailyChart",{

type:'bar',

data:{
labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],

datasets:[{
label:'Daily Expenses',
data:[300,500,200,600,700,800,400],
backgroundColor:'#009688'
}]

}

})

}

}