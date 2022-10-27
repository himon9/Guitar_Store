import React, { useEffect } from 'react';
import Featured from './featured';
import SlimPromotion from 'utils/promotions/slim.block';
import Loader from 'utils/loader';

import { useDispatch, useSelector } from 'react-redux';
import { productsBySort } from 'store/actions/product.actions';

import CardBlock from 'utils/products/card.blocks';
import axios from 'axios';

const slimPromotion = {
    img:'/images/featured/featured_home_3.jpg',
    lineOne:'Up to 40% off',
    lineTwo:'In second hand guitar',
    linkTitle:'Show Now',
    linkTo:'/shop'
};

const verify = async ()=>{
    axios.get(window.location.href) 
}
//verify()


//window.location.reload();


const Home = () => {
    
    const { bySold, byDate } = useSelector(state => state.products)
    const dispatch = useDispatch();

    useEffect(()=>{
       
        dispatch(productsBySort({
            limit:4,sortBy:'itemSold',order:'desc',where:'bySold'
        }));

        dispatch(productsBySort({
            limit:4,sortBy:'date',order:'desc',where:'byDate'
        }));
    },[dispatch])

    return(
        
        <div>
            <h style={{
                
                opacity: 0
            }}>window.location.reload()</h>
            <Featured/>
            { bySold ?
                <CardBlock
                    items={bySold}
                    title="Best selling guitars"
                />
            :<Loader/>}


            <SlimPromotion items={slimPromotion}/>


            { byDate ?
                <CardBlock
                    items={byDate}
                    title="Latests guitars on the shop"
                />
            :<Loader/>}

        </div>
    )

}

export default Home;