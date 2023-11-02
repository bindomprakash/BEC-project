import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { MessageService } from '@app/core/services/message.service';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-timeschedule',
    templateUrl: './timeschedule.component.html',
    styleUrls: ['./timeschedule.component.scss'],
    providers: [DatePipe]
})
export class TimescheduleComponent implements OnInit {
    timetable: any = {
        FirstHalfStartTime: '',
        FirstHalfEndTime: '',
        SecondHalfStartTime: '',
        SecondHalfEndTime: '',
    };
    data: any;
    start: any;
    end: any;
    datepickerdata: any = {
        bussinessHourId: 1,
        firstHalfStartTime: '',
        firstHalfEndTime: '',
        secondHalfStartTime: '',
        secondHalfEndTime: ''
    }

    constructor(private timetableservice: TimetableService,private datePipe: DatePipe,
        private atp: AmazingTimePickerService, private _messageService: MessageService, public datepipe: DatePipe
    ) { }
    ngOnInit() {
        this.bindGrid();
    }


    open() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            console.log(time);
        });
    }
    bindGrid() {
        let data = {};
        this.timetableservice.getAllrecords(data).subscribe(response => {
            this.timetable = response.data.BussinessHourResponse;
            this.datepickerdata.firstHalfStartTime = this.datePipe.transform(this.timetable.FirstHalfStartTime,'HH:mm');
            this.datepickerdata.firstHalfEndTime = this.datePipe.transform(this.timetable.FirstHalfEndTime,'HH:mm');
            this.datepickerdata.secondHalfStartTime = this.datePipe.transform(this.timetable.SecondHalfStartTime,'HH:mm');
            this.datepickerdata.secondHalfEndTime = this.datePipe.transform(this.timetable.SecondHalfEndTime,'HH:mm');
        }, error => {
            console.log(error);
        })
    }
    updateData() {
        this.timetableservice.getupdatedtimetable(this.datepickerdata).subscribe(response => {
            this._messageService.sendSuccessMessageObject(response.Message);
            this.bindGrid();
            console.log(response);
        }, error => {
            this._messageService.sendErrorMessageObject(error);
        })
    }
}

