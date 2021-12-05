import React, { Component } from 'react'


export class Newsitem extends Component {

    render() {

        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (

            <div className="container" >
                <div className="card " >
                    <div style={{display: 'flex',
                        justifyContent: 'flex-end',
                        right:' 0px',
                        position: 'absolute'}}>
                    <span className="badge rounded-pill bg-danger" >{source.name}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="/" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By-{!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn  btn-sm btn-primary">Read more</a>

                    </div>
                </div>


            </div>

        )
    }
}

export default Newsitem
