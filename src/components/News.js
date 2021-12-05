import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {


    static defaultProps =
        {
            country: 'in',
            pageSize: '8',
            category: 'general'

        }
    static PropsTypes =
        {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string

        }






    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }
    fetchMoreData =async () => {
        this.setState({page:this.state.page +1 })
        this.props.setProgress(15)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c58cca803a647da82ca48c54645aae8&page=${this.state.page}
        &pageSize=${this.props.pageSize}`;

        this.props.setProgress(30)
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(45)
        let parsedData = await data.json();
        this.props.setProgress(75);

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)

        
        
      
      }
    capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    async updateNews() {
        this.props.setProgress(25)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c58cca803a647da82ca48c54645aae8&page=${this.state.page}
        &pageSize=${this.props.pageSize}`;


        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parsedData = await data.json();
        this.props.setProgress(75);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c58cca803a647da82ca48c54645aae8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ 
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading:false });
        this.updateNews()

    }


    handleNextClick = async () => {
        console.log("handlenext is clicked");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            this.setState({ page: this.state.page + 1 })
            this.updateNews();
        }



    }


    handlePrevClick = async () => {

        //console.log("handlePrev is clicked");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c58cca803a647da82ca48c54645aae8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.state({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })

        this.setState({ page: this.state.page - 1 })
        this.updateNews();

    }


    render() {
        return (

            <>
                <h3 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News Monkey-Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h3>
                {this.state.loading && <Spinner />}
                <div className="row my-3">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                        
                    >

                        <div className="container">
                        <div className="row">
                   
                    {this.state.articles.map((element) => {
                        

                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 77) : ""}
                                description={element.description ? element.description.slice(0, 118) : ""}
                                imageUrl={!element.urlToImage ? element.urlToImage = "https://keralakaumudi.com/web-news/en/2021/10/NMAN0285392/image/dogs.1.608421.jpg" : element.urlToImage}
                                url={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                        </div>

                    })}</div></div>
                    </InfiniteScroll>
                     
                    {/* <div className="container">
                        <div className="d-flex justify-content-between">

                            <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick} > &larr;previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>next&rarr;</button>
                        </div>
                    </div> */}


                </div>








            </>
        )
    }
}

export default News
