import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


export default class MeasurementChart extends Component {
  formatDate = (d) => {
    return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '';
  };

  // componentDidCatch(error, info) {
  //       console.log(error, info);
  //   }

  render() {
    const { measurement, records } = this.props;
    const sortedRecords = [...records.filter((r) => r[measurement])];
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
    finalRecords.push(sortedRecords[sortedRecords.length - 1]);
    let data;
    try {
         data = finalRecords.map((record) => {
            return {
                xValue: this.formatDate(record.date),
                yValue: record[measurement],
            };
        });
    } catch (e) {
      return (
          <div>
            <h3>no data</h3>
          </div>
      )
    }

    return (
        <div>
          {/*<ResponsiveContainer width={700} height="80%">*/}
            {/*<AreaChart data={data}*/}
                       {/*margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>*/}
              {/*<XAxis dataKey="xValue" />*/}
              {/*<YAxis domain={[0, 'dataMax + 50']} />*/}
              {/*<CartesianGrid strokeDasharray="3 3" />*/}
              {/*<Tooltip />*/}
              {/*<Area type='linear' dataKey='yValue' stroke='#8884d8' fill='#8884d8' />*/}
            {/*</AreaChart>*/}
          {/*</ResponsiveContainer>*/}
          <AreaChart
              width={800} height={400} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
              <XAxis dataKey="xValue" />
              <YAxis domain={[0, 'dataMax + 50']} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type='linear' dataKey='yValue' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
      </div>
    );
  }
}