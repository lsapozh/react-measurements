import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {ResponsiveContainerWrapper} from "./components/index";

export default class MeasurementChart extends Component {
    formatDate = (d) => {
        return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '';
    };

    render() {
        const {measurement, records, time} = this.props;
        let filteredDateRecords;
        if (time === "last_week") {
            filteredDateRecords = [...records.filter((r) => (new Date() - r.date)/1000/60/60/24 < 7)];
        } else if (time === "last_month") {
            filteredDateRecords = [...records.filter((r) => (new Date() - r.date)/1000/60/60/24 < 30)];
        } else {
            filteredDateRecords = records;
        }


        const sortedRecords = [...filteredDateRecords.filter((r) => r[measurement])];
        sortedRecords.sort((r1, r2) => r1.date.getTime() - r2.date.getTime());
        const finalRecords = [];
        for (let i = 0; i < sortedRecords.length - 1; i += 1) {
            let thisRecord = sortedRecords[i];
            const nextRecord = sortedRecords[i + 1];
            finalRecords.push(thisRecord);
            while (this.formatDate(thisRecord.date) !== this.formatDate(nextRecord.date)) {
                const nextDate = new Date(thisRecord.date.getTime());
                nextDate.setDate(nextDate.getDate() + 1);
                thisRecord = {
                    ...thisRecord,
                    date: nextDate,
                };
                if (this.formatDate(thisRecord.date) !== this.formatDate(nextRecord.date)) {
                    finalRecords.push(thisRecord);
                }
            }
        }
        if (sortedRecords.length > 0) {
            finalRecords.push(sortedRecords[sortedRecords.length - 1]);
        }

        let data = finalRecords.map((record) => {
            return {
                xValue: this.formatDate(record.date),
                yValue: record[measurement],
            };
        });

        return (
            <ResponsiveContainerWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{top: 10, right: 20, left: 0, bottom: 0}}
                    >
                        <XAxis dataKey="xValue"/>
                        <YAxis domain={[0, 'dataMax + 10']}/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type='linear' dataKey='yValue' stroke='rgba(0, 139, 139, 0.9)'
                              fill='rgba(0, 139, 139, 0.9)'/>
                    </AreaChart>
                </ResponsiveContainer>
            </ResponsiveContainerWrapper>
        );
    }
}