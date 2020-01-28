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
        const itemsRef = firebase.database().ref('investments');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            console.log(items);
            for(let item in items){
                newState.push({
                    fid: Object.keys(items)[0],
                    id: items[item].id,
                    name: items[item].name,
                    type: items[item].type, 
                    amount: items[item].amount, 
                    date: items[item].date
                })
            }
            this.setState({
                data: newState
            });
            localStorage.setItem("localData", JSON.stringify(newState));
        });
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", (snap) => {
        if (snap.val() !== true) {
            if(this.state.data == null || this.state.data == []){
                this.state.data = JSON.parse(localStorage.getItem("localData"));
            }
        }
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
                                    const itemsRef = firebase.database().ref('investments');
                                    itemsRef.push(newData);
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

                                    const itemRef = firebase.database().ref(`/investments/${oldData.fid}`);
                                    itemRef.remove();
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