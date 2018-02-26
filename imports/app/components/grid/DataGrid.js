import React from 'react';

// Todo: fix grid column binding

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
        if (props.data.length > 0) {
            console.log(props);
            this.setState({
                data: props.data
            });
        }
    }
    
    render() {
        const { columns, className } = this.props;
        const { data } = this.state;
        const headers = columns.map((column, i) => {
            return <th key={i}>{ column.header }</th>;
        })

        const rows = data.map((row, i) => {
            const dataColumns = columns.map((column, i) => {
                console.log(row.profile.firstName);
                return <td key={i}>{row[column.bind]}</td>
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
