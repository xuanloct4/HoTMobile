import React from 'react';
import DateTimePickerModel from './DateTimePickerModel';

export default class DTComponent {
    DTSetting = new Object();

    InitializedDateTimeComponents = () => {
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i];
            // let item = {component: comp.component, range: comp.range};
            let item = {range: comp.range};
            let min = comp.range.MIN;
            let max = comp.range.MAX;
            let discreteValues = comp.range;

            if (min != undefined || max != undefined) {
                if (min != undefined && max == undefined) {
                    item.selectedFrom = min;
                } else if (min == undefined && max != undefined) {
                    item.selectedTo = max;
                } else {
                    let selectedItems = [];
                    for (let j = min; j <= max; j++) {
                        selectedItems.push({value: j, isSelected: true});
                    }
                    item.selectedItems = selectedItems;
                }
            } else {
                let selectedItems = [];
                for (let j = 0; j < discreteValues.length; j++) {
                    selectedItems.push({value: discreteValues[j], isSelected: true});
                }
                // console.log(selectedItems);
                item.selectedItems = selectedItems;
            }

            let m = comp.component;
            this.DTSetting[m] = item;
        }
    };


    selectAllComponent = () => {
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i];
            this.selectAll(comp.component);
        }
    };

    deselectAllComponent = () => {
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i];
            this.deselectAll(comp.component);
        }
    };

    selectAll = (component) => {
        let selectedItems = this.DTSetting[component].selectedItems;
        if (selectedItems != undefined && selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DTSetting[component].selectedItems.length; j++) {
                this.DTSetting[component].selectedItems[j].isSelected = true;
            }
        }

        let min = this.DTSetting[component].range.MIN;
        let max = this.DTSetting[component].range.MAX;
        let discreteValues = this.DTSetting[component].range;

        if (min != undefined || max != undefined) {
            if (min != undefined && max == undefined) {
                this.DTSetting[component].selectedFrom = min;
            } else if (min == undefined && max != undefined) {
                this.DTSetting[component].selectedTo = max;
            } else {
                let selectedItems = [];
                for (let j = min; j <= max; j++) {
                    selectedItems.push({value: j, isSelected: true});
                }
                this.DTSetting[component].selectedItems = selectedItems;
            }
        } else {
            let selectedItems = [];
            for (let j = 0; j < discreteValues.length; j++) {
                selectedItems.push({value: discreteValues[j], isSelected: true});
            }
            this.DTSetting[component].selectedItems = selectedItems;
        }
    };

    deselectAll = (component) => {
        let selectedItems = this.DTSetting[component].selectedItems;
        if (selectedItems != undefined && selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DTSetting[component].selectedItems.length; j++) {
                this.DTSetting[component].selectedItems[j].isSelected = false;
            }
        }

        let min = this.DTSetting[component].range.MIN;
        let max = this.DTSetting[component].range.MAX;
        let discreteValues = this.DTSetting[component].range;

        if (min != undefined || max != undefined) {
            if (min != undefined && max == undefined) {
                this.DTSetting[component].selectedFrom = null;
            } else if (min == undefined && max != undefined) {
                this.DTSetting[component].selectedTo = null;
            } else {
                let selectedItems = [];
                for (let j = min; j <= max; j++) {
                    selectedItems.push({value: j, isSelected: false});
                }
                this.DTSetting[component].selectedItems = selectedItems;
            }
        } else {
            let selectedItems = [];
            for (let j = 0; j < discreteValues.length; j++) {
                selectedItems.push({value: discreteValues[j], isSelected: false});
            }
            this.DTSetting[component].selectedItems = selectedItems;
        }
    };

    selectItem = (component, value) => {
        let selectedItems = this.DTSetting[component].selectedItems;
        if (selectedItems != undefined && selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DTSetting[component].selectedItems.length; j++) {
                if (this.DTSetting[component].selectedItems[j].value === value) {
                    this.DTSetting[component].selectedItems[j].isSelected = true;
                }
            }
        }
    };

    deselectItem = (component, value) => {
        let selectedItems = this.DTSetting[component].selectedItems;
        if (selectedItems != undefined && selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DTSetting[component].selectedItems.length; j++) {
                if (this.DTSetting[component].selectedItems[j].value === value) {
                    this.DTSetting[component].selectedItems[j].isSelected = false;
                }
            }
        }
    };

    summarize = (component, i18n) => {
        let min = this.DTSetting[component].range.MIN;
        let max = this.DTSetting[component].range.MAX;
        let discreteValues = this.DTSetting[component].selectedItems;
        let selectedFrom = this.DTSetting[component].selectedFrom;
        let selectedTo = this.DTSetting[component].selectedTo;
        if (discreteValues != undefined && discreteValues.length != undefined && discreteValues.length > 0) {
            let selectedDiscreteValues = discreteValues.filter(item => item.isSelected === true);
            if (min != undefined && max == undefined) {
                return '';
            } else if (min == undefined && max != undefined) {
                return '';
            } else {
                if (selectedDiscreteValues.length == 0) {
                    return i18n.t('none_text') + i18n.t(component) + i18n.t('selected_text');
                } else if (selectedDiscreteValues.length != discreteValues.length) {
                    return i18n.t('some_text') + i18n.t(component)  + i18n.t('selected_text');
                } else {
                    return i18n.t('all_text') + i18n.t(component)  + i18n.t('selected_text');
                }
            }
        }
    };

    description = (component, i18n) => {
        console.log(component);
        let min = this.DTSetting[component].range.MIN;
        let max = this.DTSetting[component].range.MAX;
        let discreteValues = this.DTSetting[component].selectedItems;
        let selectedFrom = this.DTSetting[component].selectedFrom;
        let selectedTo = this.DTSetting[component].selectedTo;
        if (discreteValues != undefined && discreteValues.length != undefined && discreteValues.length > 0) {
            let selectedDiscreteValues = discreteValues.filter(item => item.isSelected === true);
            if (min != undefined && max == undefined) {
                return '';
            } else if (min == undefined && max != undefined) {
                return '';
            } else {
                if (selectedDiscreteValues.length == 0) {
                    return i18n.t('none_text') + i18n.t(component) + i18n.t('selected_text');
                } else if (selectedDiscreteValues.length != discreteValues.length) {
                    selectedDiscreteValues = selectedDiscreteValues.sort(function (a, b) {
                        return a - b;
                    });
                    let str = component + ' ';
                    for (let i = 0; i < selectedDiscreteValues.length; i++) {
                        if (i > 0) {
                            str += ', ';
                        }
                        str += selectedDiscreteValues[i].value;
                    }
                    str += ' ' + i18n.t('selected_text');
                    return str;
                } else {
                    return i18n.t('all_text') + i18n.t(component) + ' ' + i18n.t('selected_text');
                }
            }
        }
    };
}
