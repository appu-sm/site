import React, { Component } from 'react';
import MaterialTable from 'material-table';

class Investments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Type', field: 'type' },
                { title: 'Amount', field: 'amount', type: 'numeric', initialEditValue: '0' },
                { title: 'Date Invested', field: 'date' },
            ],
            data: [
                { id: 1, name: 'Stocks', type: 'Stocks', amount: '150000', date: '22-01-2020' },
                { id: 2, name: 'Mutual Fund', type: 'Mutual Fund', amount: '250000', date: '20-05-2019' },
                { id: 3, name: 'Elss', type: 'Mutual Fund', amount: '250000', date: '20-05-2019', parentId: 2 },
                { id: 4, name: 'Large Cap', type: 'Mutual Fund', amount: '250000', date: '20-05-2019', parentId: 2 },
                { id: 5, name: 'Gold Bond', type: 'Gold Bond', amount: '37380', date: '15-10-2019' },
                { id: 6, name: 'Sopra Steria', type: 'Stocks', amount: '131000', date: '20-05-2019', parentId: 1 },
            ],
            options:{
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },
                actionsColumnIndex: 4,
                //selection: true
                //grouping: true
            },
        }
    }
  
    render() {
        return (
            <MaterialTable
                title="Editable Preview"
                columns={this.state.columns}
                data={[...this.state.data]}
                parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                options={this.state.options}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    newData.id = (data.length) + 1;
                                    data.push(newData);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        );
    }
}

export default Investments