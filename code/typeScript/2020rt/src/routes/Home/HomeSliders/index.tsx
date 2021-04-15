import React, { ReactNode } from 'react';
import { Carousel } from 'antd';
import {Slider} from '../../../store/reducers/home'
import './index.less'
interface Props{
    Children?: ReactNode,
    sliders?: Array<Slider>,
    getSliders: any
}

export default class HomeSliders extends React.Component<Props>{
    componentDidMount(){
        console.log('+++++++++++', this.props.sliders.length)
        if(this.props.sliders.length === 0){
        console.log('----------', this.props)
            this.props.getSliders()
        }
    }
    render(){
        return (
            <>
                {/* <div>嘻嘻嘻嘻</div> */}
            <Carousel>
                {/* <div> <img style={{height: '300px', width: '100%'}} src={arr} /></div> */}
              {
                  this.props.sliders.map((item: Slider, index: number)=>(
                      <div key={index} className='slick-slide'>
                          <img src={item.url} />
                      </div>
                  ))
              }
            </Carousel>
            </>
        )
    }
}