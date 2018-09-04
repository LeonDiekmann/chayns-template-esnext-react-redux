import React from 'react';
import { Accordion, Button } from 'chayns-components/lib';
import SearchBar from 'C:/Dev/Projects/chayns-template-esnext-react/src/components/searchContainer/searchBar/searchBar.jsx';
import ListItem from './listItem';
import './listItem.css';
import { connect } from 'react-redux';
import { inputOnChange as inputOnchangeAction } from '../../actions/list';
import { loadList as newListAction } from '../../actions/list';

class SearchContainer extends React.Component {  
    constructor () {
        super();
        this.state = {
            fetchLink: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showMore = this.showMore.bind(this);
    
        // this.fetchData(fetchLink)
    }

    handleChange(value) {
        this.props.inputOnChange(value)
        this.setState({resultNr: 5});
        let fetchLinkTemp = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.props.input + '&Skip=0&Take=' + this.state.resultNr;
        if (this.props.input !== "") {
            this.fetchData(fetchLinkTemp);
        }

    }


    componentDidMount() {
        let fetchLinkLoad = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.props.input + '&Skip=0&Take=' + 5;
        this.fetchData(fetchLinkLoad);
        console.log('mounted');
    }


    fetchData(fetchLink) {
        chayns.showWaitCursor()
        this.fetchDataPromise(fetchLink).then((result) => {
            chayns.hideWaitCursor()
                this.props.loadNewList(result.Data)
                        
        }).catch(() => {
            console.log("failed");
        });
    }

    showMore() {       
    let fetchAmount = this.props.list.length + 5;
    console.log(this.props.list.length)
    let fetchLinkMore = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.props.input + '&Skip=0&Take=' + fetchAmount;
    this.fetchData(fetchLinkMore)         
    }
    
    fetchDataPromise(fetchLink) {
        return new Promise((resolve,reject) => {
            try{
            fetch(fetchLink)
            .then((response) => {
                return response.json()
            }).then((json) => {
                resolve(json);
                console.log('parsed json', json)
            }).catch( (ex) => {
                console.log('parsing failed', ex)
                reject(ex);
            })
            }
            catch (ex){
                reject(ex);
            }
        });
    }

    
    render() {
        return(
            <Accordion head="Sites" defaultOpened right={<SearchBar callback={this.handleChange}/>}>
                
                <div className="accordion__content">
                {this.props.list.map((element) => {return <ListItem key={element.siteId} {...element} />})}
                    <div className="right" style= {{textAlign: "right"}} onClick={(event) => {this.showMore()}}>
                        <a href="#">Mehr anzeigen</a>
                    </div>
                </div>
            </Accordion>
        );
    }
}
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    input: state.inputChange.input,
    list: state.loadList.list
});

const mapDispatchToProps = (dispatch, ownProps) => Object.assign({}, ownProps, {
    inputOnChange: (searchString) => dispatch(inputOnchangeAction(searchString)),
    loadNewList: items => dispatch(newListAction(items))
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchContainer)