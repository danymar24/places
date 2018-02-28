import React from 'react';

// Todo: fix grid column binding

/**
 * Data grid
 * 
 * Props:
 * @columns {array<object>} - Array of columns
 * @delete  {function} - Function used for the delete button
 * 
 * @deleteColumn {object}:
 * header: {string}     - 'Delete'
 * bind: {string}       - value returned to the delete function
 * buttonText: {string} - Text used in the delete button
 * className: {string}  - classnames for the delete button
 * icon: {html}         - Html for the button icon Ex. <i className='icon'></i>
 */

export class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(props) {
        if (props.data.length >= 0) {
            this.setState({
                data: props.data
            });
        }
    }

    getBindingValue = (obj, path) => (
        path.split('.').reduce((acc, part) => acc && acc[part], obj)
    );
    
    render() {
        const { columns, className } = this.props;
        const { data } = this.state;
        const headers = columns.map((column, i) => {
            return <th key={i}>{ column.header }</th>;
        })

        const rows = data.map((row, i) => {
            const dataColumns = columns.map((column, i) => {
                if (column.header.toLowerCase() === 'delete' ) {
                    return (
                        <td key={i}>
                            <button className={column.className}
                                    onClick={this.props.delete.bind(this, this.getBindingValue(row, column.bind))}>
                                { column.icon }
                                { column.buttonText }
                            </button>
                        </td>
                    )
                }
                return <td key={i}>{this.getBindingValue(row, column.bind)}</td>
            })
            return (
                <tr key={i}>
                    { dataColumns }
                </tr>
            )
        });

        return (
            <table className={className}>
                <thead>
                    <tr>
                        { headers }
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }
}
