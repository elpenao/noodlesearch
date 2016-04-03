import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class NoodleContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      term: "",
      newsite: ""
    };
    this.search = this.search.bind(this);
    this.crawl = this.crawl.bind(this);
    this.updateSite = this.updateSite.bind(this);
  }

  search(event) {
    this.setState({
      term: event.target.value
    })
    this.props.dispatch(Actions.search(event.target.value));
  }

  updateSite(event) {
    this.setState({
      newsite: event.target.value
    })
  }

  crawl(event) {
    console.log("crawling")
    this.props.dispatch(Actions.crawl(this.state.newsite));
  }

  render() {
    if (this.props.results) var results = this.props.results.map((el, i) => ( 
      <li className="list-group-item" key={i}>
        {el.title}
        <a href={el.url}>Visit</a>
      </li>
    ))

    return (
      <div>
        <Header />
        <div className="container">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Search Noodle</span>
            <input type="text" value={this.state.term} onChange={this.search} className="form-control" placeholder="What is mongoose?" />
          </div>
          <div className='col-lg-8'>
            <ul>{results}</ul>
          </div>
          <div className='col-lg-4'>
            <h3>Missing Results?</h3>
            <h4>Crawl a new site</h4>
              <div className="input-group">
                <input value={this.state.newsite} onChange={this.updateSite} type="text" className="form-control" placeholder="Crawl..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" onClick={this.crawl}>Go!</button>
                </span>
              </div>
              <h3>Am I crawling? {this.props.crawling ? 'yes' : 'no'}</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

NoodleContainer.need = [() => { return Actions.search(); }];
NoodleContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    results: store.results,
    crawling: store.crawling
  };
}

NoodleContainer.propTypes = {
  results: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(NoodleContainer);
