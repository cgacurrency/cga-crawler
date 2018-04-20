import React from "react";
import { withRouter } from "react-router-dom";

class Explorer extends React.PureComponent {
  state = {
    search: ""
  };

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { search } = this.state;

    if (/^(xrb_|nano_)/) {
      history.push(`/explorer/account/${search}`);
    } else {
      history.push(`/explorer/block/${search}`);
    }
  }

  render() {
    const { search } = this.state;

    return (
      <div className="row justify-content-center my-5">
        <div className="col-8">
          <h1>Network Explorer</h1>

          <hr />

          <form className="my-5" onSubmit={this.handleSubmit.bind(this)}>
            <label>Enter a Nano address or block hash to get started.</label>

            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={search}
                  onChange={e => this.setState({ search: e.target.value })}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary btn-lg">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Explorer);
