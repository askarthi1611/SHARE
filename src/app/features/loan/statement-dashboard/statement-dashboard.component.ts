import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import { PLATFORM_ID } from '@angular/core';

import statementData
from './../../../../assets/data/loan-statement.json';

@Component({
  selector: 'app-statement-dashboard',
  templateUrl: './statement-dashboard.component.html',
  styleUrls: ['./statement-dashboard.component.css']
})
export class StatementDashboardComponent
implements AfterViewInit {

  @ViewChild('timeline') timeline!: ElementRef;

  isBrowser=false;
  today=new Date();

  displayedColumns=[
    'Sr.No.',
    'Instrument Date',
    'Instalment',
    'Interest',
    'Principal'
  ];

  //--------------------------------
  // MAIN DATA
  //--------------------------------
  data:any={
    loan:{},
    installments:[]
  };

  //--------------------------------
  // DASHBOARD VALUES
  //--------------------------------
  completedMonths=0;
  remainingMonths=0;
  completionPercent=0;
  remainingBalance=0;

  //--------------------------------
  // CHARTS
  //--------------------------------
  pieChartData:any;
  balanceChartData:any;
  emiBreakdownChart:any;
  interestTrendChart:any;
  progressChart:any;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId:Object
  ){
    this.isBrowser=
      isPlatformBrowser(this.platformId);

    this.loadStatement();

    setTimeout(()=>{
      this.calculateSummary();
    });
  }

  ngAfterViewInit(){
    if(!this.isBrowser) return;

    setTimeout(()=>{
      this.autoScrollTimeline();
    },400);
  }

  //==================================================
  // LOAD JSON
  //==================================================
  loadStatement(){

    this.data.loan=statementData.loan;

    this.data.installments=
      statementData.installments.map(
      (emi:any,index:number)=>{

        const d=emi['Instrument Date']
          ?.split('-');

        const isoDate=
          `${d[2]}-${d[1]}-${d[0]}`;

        return{
          ...emi,
          'Sr.No.':index+1,
          'Instrument Date':
            new Date(isoDate),

          Instalment:Number(
            String(emi['Instalment'])
            .replace(/[^\d]/g,'')
          ),

          Interest:Number(
            String(emi['Interest'])
            .replace(/[^\d]/g,'')
          ),

          Principal:Number(
            String(emi['Principal'])
            .replace(/[^\d]/g,'')
          )
        };
      });
  }

  //==================================================
  // EMI STATUS
  //==================================================
  getStatus(index:number){

    const item=
      this.data.installments[index];

    if(!item) return '';

    const emiDate=
      new Date(item['Instrument Date']);

    const today=new Date();
    today.setHours(0,0,0,0);
    emiDate.setHours(0,0,0,0);

    if(emiDate<today)
      return 'completed';

    if(emiDate.getTime()===today.getTime())
      return 'current';

    return 'remaining';
  }

  //==================================================
  // SUMMARY + ALL CHARTS
  //==================================================
  calculateSummary(){

    let completed=0;
    let principalPaid=0;
    let interestPaid=0;

    const balanceArr:number[]=[];
    const labels:string[]=[];
    const principalArr:number[]=[];
    const interestArr:number[]=[];

    let balance=
      this.data.loan.amount;

    this.data.installments
    .forEach((emi:any,i:number)=>{

      labels.push(`EMI ${i+1}`);

      principalArr.push(emi.Principal);
      interestArr.push(emi.Interest);

      balance-=emi.Principal;
      balanceArr.push(
        Math.max(balance,0)
      );

      const status=
        this.getStatus(i);

      if(
        status==='completed'||
        status==='current'
      ){
        completed++;
        principalPaid+=emi.Principal;
        interestPaid+=emi.Interest;
      }
    });

    this.completedMonths=completed;
    this.remainingMonths=
      this.data.installments.length
      -completed;

    this.completionPercent=
      completed/
      this.data.installments.length*100;

    this.remainingBalance=
      this.data.loan.amount
      -principalPaid;

    if(!this.isBrowser) return;

    //---------------- PIE
    this.pieChartData={
      labels:['Principal','Interest'],
      datasets:[{
        data:[
          principalPaid,
          interestPaid
        ]
      }]
    };

    //---------------- BALANCE LINE
    this.balanceChartData={
      labels,
      datasets:[{
        label:'Remaining Balance',
        data:balanceArr
      }]
    };

    //---------------- BAR
    this.emiBreakdownChart={
      labels,
      datasets:[
        {label:'Principal',data:principalArr},
        {label:'Interest',data:interestArr}
      ]
    };

    //---------------- INTEREST TREND
    this.interestTrendChart={
      labels,
      datasets:[
        {label:'Interest Trend',
        data:interestArr}
      ]
    };

    //---------------- PROGRESS
    this.progressChart={
      labels:['Completed','Remaining'],
      datasets:[{
        data:[
          this.completedMonths,
          this.remainingMonths
        ]
      }]
    };
  }

  //==================================================
  // AUTO SCROLL CURRENT EMI
  //==================================================
  autoScrollTimeline(){

    if(!this.timeline) return;

    const container=
      this.timeline.nativeElement;

    const current=
      container.querySelector('.current');

    if(!current) return;

    container.scrollTo({
      left:
        current.offsetLeft
        -container.offsetWidth/2,
      behavior:'smooth'
    });
  }
}