import React from 'react';
import DateTimePickerModel from './DateTimePickerModel';

export default class DTComponent {

    // var [{component: dateComponent,[{value: 0 , isSelected: true}]}];
    // Components = [];
    DateTimeObject = new Object;

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
            this.DateTimeObject[m] = item;
        }
    };


    selectAllComponent = () => {
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i];
            this.selectAll(comp.component);
        }
    }

    deselectAllComponent = () => {
        for (let i = 0; i < DateTimePickerModel.TimeComponents().length; i++) {
            let comp = DateTimePickerModel.TimeComponents()[i];
            this.deselectAll(comp.component);
        }
    }

    selectAll = (component) => {
        let selectedItems = this.DateTimeObject[component].selectedItems;
        if (selectedItems != undefined &&  selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DateTimeObject[component].selectedItems.length; j++) {
                this.DateTimeObject[component].selectedItems[j].isSelected = true;
            }
        }

                let min = this.DateTimeObject[component].range.MIN;
                let max = this.DateTimeObject[component].range.MAX;

                if (min != undefined || max != undefined) {
                    if (min != undefined && max == undefined) {
                        this.DateTimeObject[component].selectedFrom = min;
                    } else if (min == undefined && max != undefined) {
                        this.DateTimeObject[component].selectedTo = max;
                    } else {
                        let selectedItems = [];
                        for (let j = min; j <= max; j++) {
                            selectedItems.push({value: j, isSelected: true});
                        }
                        this.DateTimeObject[component].selectedItems = selectedItems;
                    }
                }
    };

    deselectAll = (component) => {
        let selectedItems = this.DateTimeObject[component].selectedItems;
        if (selectedItems != undefined &&  selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DateTimeObject[component].selectedItems.length; j++) {
                this.DateTimeObject[component].selectedItems[j].isSelected = false;
            }
        }

        let min = this.DateTimeObject[component].range.MIN;
        let max = this.DateTimeObject[component].range.MAX;

        if (min != undefined && max != undefined) {
                let selectedItems = [];
                for (let j = min; j <= max; j++) {
                    selectedItems.push({value: j, isSelected: false});
                }
                this.DateTimeObject[component].selectedItems = selectedItems;
        }

        this.DateTimeObject[component].selectedFrom = null;
        this.DateTimeObject[component].selectedTo = null;
    };

    selectItem = (component, value) => {
        let selectedItems = this.DateTimeObject[component].selectedItems;
        if (selectedItems != undefined &&  selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DateTimeObject[component].selectedItems.length; j++) {
                if (this.DateTimeObject[component].selectedItems[j].value === value) {
                    this.DateTimeObject[component].selectedItems[j].isSelected = true;
                }
            }
        }
    };

    deselectItem = (component, value) => {
        let selectedItems = this.DateTimeObject[component].selectedItems;
        if (selectedItems != undefined &&  selectedItems.length != undefined && selectedItems.length > 0) {
            for (let j = 0; j < this.DateTimeObject[component].selectedItems.length; j++) {
                if (this.DateTimeObject[component].selectedItems[j].value === value) {
                    this.DateTimeObject[component].selectedItems[j].isSelected = false;
                }
            }
        }
    };
}
