import React from 'react';

class DateTimePickerModel {
    static dateComponent = {
        SECOND: 'second',
        MINUTE: 'minute',
        HOUR: 'hour',
        DAY: 'day',
        DAYSOFWEEK: 'daysOfWeek',
        MONTH: 'month',
        YEAR: 'year'
    };

    static daysOfWeek = {
        MONSDAY: 'Monsday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THURSDAY: 'Thursday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday',
        SUNDAY: 'Sunday',
    }

    static secondRange = {
        MIN: 0,
        MAX: 59,
    }

    static minuteRange = {
        MIN: 0,
        MAX: 59,
    }

    static hourRange = {
        MIN: 0,
        MAX: 23,
    }

    static dayRange = {
        MIN: 1,
        MAX: 31,
    }

    static monthRange = {
        MIN: 1,
        MAX: 12,
    }

    static yearRange = {
        MIN: 2019
    }

    static DaysOfWeek = () => {
        return [
            DateTimePickerModel.daysOfWeek.MONSDAY,
            DateTimePickerModel.daysOfWeek.TUESDAY,
            DateTimePickerModel.daysOfWeek.WEDNESDAY,
            DateTimePickerModel.daysOfWeek.THURSDAY,
            DateTimePickerModel.daysOfWeek.FRIDAY,
            DateTimePickerModel.daysOfWeek.SATURDAY,
            DateTimePickerModel.daysOfWeek.SUNDAY
        ]
    };

    static TimeComponents = () => {
        return [{component: DateTimePickerModel.dateComponent.SECOND, range: DateTimePickerModel.secondRange},
            {component: DateTimePickerModel.dateComponent.MINUTE, range: DateTimePickerModel.minuteRange},
            {component: DateTimePickerModel.dateComponent.HOUR, range: DateTimePickerModel.hourRange},
            {component: DateTimePickerModel.dateComponent.DAY, range: DateTimePickerModel.dayRange},
            {component: DateTimePickerModel.dateComponent.DAYSOFWEEK, range: DateTimePickerModel.DaysOfWeek()},
            {component: DateTimePickerModel.dateComponent.MONTH, range: DateTimePickerModel.monthRange},
            {component: DateTimePickerModel.dateComponent.YEAR, range: DateTimePickerModel.yearRange}
        ]
    };

    static DTComponents = () => {
        return [
            {component: DateTimePickerModel.dateComponent.YEAR, range: DateTimePickerModel.yearRange, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.MONTH, range: DateTimePickerModel.monthRange, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.DAYSOFWEEK, range: DateTimePickerModel.daysOfWeek, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.DAY, range: DateTimePickerModel.dayRange, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.HOUR, range: DateTimePickerModel.hourRange, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.MINUTE, range: DateTimePickerModel.minuteRange, selectedItems: []},
            {component: DateTimePickerModel.dateComponent.SECOND, range: DateTimePickerModel.secondRange, selectedItems: []}
        ];
    };
}



export default DateTimePickerModel;
