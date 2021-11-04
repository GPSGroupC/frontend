import React, {Component} from 'react';

class SelectCurso extends Component {
    title = this.props.title
    handler = this.props.handler
    value = this.props.value
    render() {
        return (
                <div className="form-group" style={{"width": "35%"}}>
                    <label htmlFor="exampleSelect1" className="form-label mt-4">{this.title}</label>
                    <select value={this.value} onChange={this.handler} className="form-select"
                            id="exampleSelect1">
                        <option value="2021-2022">2021-2022</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2026-2027">2026-2027</option>
                    </select>
                </div>
        );
    }
}

export default SelectCurso;