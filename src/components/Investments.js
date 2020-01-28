import React, { Component } from 'react';
import MaterialTable from 'material-table';
import firebase from '../firebase';

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
            data: [],
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
    
    componentDidMount(){
        const itemsRef = firebase.collection('investments').get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("data");
            console.log(data);
            this.setState({
                data: data
            });
        });
    }

    render() {
        return (
            <MaterialTable
                title="Investments"
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
                                    firebase.collection('investments').doc("doc-" + newData.id).set(newData)
                                        .then(() => console.log("Document written"))
                                        .catch((error) => console.error("Error writing document", error));
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

                                    firebase.collection('investments').doc("doc-" + (index + 1)).delete();
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        );
    }
}

export default Investments;