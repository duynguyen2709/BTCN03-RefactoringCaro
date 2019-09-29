import React from 'react';
import '../index.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class MoveHistory extends React.Component {

    constructor(props) {
        super(props);
    }

    NoDataComponent = (props) => {
        const {
            children
        } = props;

        return children === '' ?
            null :
            (
                <div className="rt-noData">
                    {children}
                </div>
            );
    };

    render() {

        const columns = [{
            Header: () => (
                <span>
                Lượt
                <i className="fa fa-sort" style={{float: 'right'}}/>
            </span>
            ),
            accessor: 'id',
        }, {
            Header: 'Người chơi',
            accessor: 'symbol',
            Cell: props => <span className='number' style={{color: props.value === "X" ? "blue" : "red"}}>
                            {props.value}
                        </span>,
            sortable: false,
            filterable: false,
        }, {
            Header: () => (
                <span>
                Hàng
                <i className="fa fa-sort" style={{float: 'right'}}/>
            </span>
            ),
            accessor: 'row'
        }, {
            Header: () => (
                <span>
                Cột
                <i className="fa fa-sort" style={{float: 'right'}}/>
             </span>
            ),
            accessor: 'column'
        }, {
            Header: 'Reset',
            Cell: (cellInfo) =>
                <button style={{width:'60%', height: '105%'}}
                                        onClick={() => this.props.resetTable(cellInfo.index)}>
                    {'\u21BB'}
                </button>,
            sortable: false,
            filterable: false,
        }];

        return (
            <div className="move-history">

                <p style={{margin: '20px auto', fontSize: '32px'}}>
                    Danh sách nước đi
                </p>

                <ReactTable style={{height: '410px', border: '1px solid #c79e71'}}
                            data={this.props.data}
                            columns={columns}
                            noDataText={''}
                            defaultPageSize={400}
                            NoDataComponent={this.NoDataComponent}
                            showPagination={false}
                            resizable={false}
                            getTrProps={(state, rowInfo) => {

                                if (typeof rowInfo !== "undefined") {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            this.props.setCurrentSelected(rowInfo.index);
                                            if (handleOriginal) {
                                                handleOriginal()
                                            }
                                        },
                                        style: {
                                            background: rowInfo.index === this.props.currentSelected ? '#eca75b' : '',
                                            color: rowInfo.index === this.props.currentSelected ? 'white' : ''
                                        },
                                    }
                                } else {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            if (handleOriginal) {
                                                handleOriginal()
                                            }
                                        },
                                        style: {
                                            background: '',
                                            color: 'black'
                                        },
                                    }
                                }
                            }}
                />
            </div>
        );
    }
}